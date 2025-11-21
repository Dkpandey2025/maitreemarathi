const express = require("express");
const User = require("../models/User");
const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");
const Redemption = require("../models/Redemption");

const router = express.Router();

// =========================
// GET USER PROGRESS
// =========================
router.get("/progress/:phone", async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.params.phone })
      .populate("completedLessons")
      .select("-password");
    
    if (!user) return res.json({ status: "error", message: "User not found" });
    
    res.json({ status: "success", user });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// =========================
// GET LEVEL STATUS (UNLOCK STATUS)
// =========================
router.get("/level-status/:phone", async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.params.phone });
    if (!user) return res.json({ status: "error", message: "User not found" });

    const Lesson = require("../models/Lesson");
    
    // Get lesson counts for each level
    const beginnerLessons = await Lesson.find({ level: "beginner" });
    const mediumLessons = await Lesson.find({ level: "medium" });
    const expertLessons = await Lesson.find({ level: "expert" });

    // Count completed lessons for each level
    const completedBeginnerCount = user.completedLessons.filter(lessonId => 
      beginnerLessons.some(lesson => lesson._id.toString() === lessonId.toString())
    ).length;

    const completedMediumCount = user.completedLessons.filter(lessonId => 
      mediumLessons.some(lesson => lesson._id.toString() === lessonId.toString())
    ).length;

    const completedExpertCount = user.completedLessons.filter(lessonId => 
      expertLessons.some(lesson => lesson._id.toString() === lessonId.toString())
    ).length;

    // Check if levels are unlocked
    const beginnerCompleted = beginnerLessons.length > 0 && completedBeginnerCount === beginnerLessons.length;
    const mediumCompleted = mediumLessons.length > 0 && completedMediumCount === mediumLessons.length;

    const levelStatus = {
      beginner: {
        unlocked: true,
        completed: completedBeginnerCount,
        total: beginnerLessons.length
      },
      medium: {
        unlocked: beginnerCompleted,
        completed: completedMediumCount,
        total: mediumLessons.length
      },
      expert: {
        unlocked: mediumCompleted,
        completed: completedExpertCount,
        total: expertLessons.length
      }
    };

    res.json({ status: "success", levelStatus });
  } catch (err) {
    console.error("Level status error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// =========================
// GET LESSONS BY LEVEL WITH PROGRESS
// =========================
router.get("/lessons/:level/:phone", async (req, res) => {
  try {
    const { level, phone } = req.params;
    const user = await User.findOne({ phone });
    
    if (!user) return res.json({ status: "error", message: "User not found" });
    
    // Check if subscription expired
    if (user.subscriptionType === "monthly" && user.subscriptionEndDate) {
      const now = new Date();
      if (now > user.subscriptionEndDate) {
        user.subscriptionStatus = "expired";
        user.subscriptionType = "free";
        await user.save();
      }
    }
    
    const lessons = await Lesson.find({ level }).sort({ lessonNumber: 1 });
    const Quiz = require("../models/Quiz");
    const quizzes = await Quiz.find({ level });
    
    // Mark lessons as locked/unlocked
    const lessonsWithStatus = lessons.map((lesson, index) => {
      const isCompleted = user.completedLessons.some(
        (id) => id.toString() === lesson._id.toString()
      );
      
      // First lesson is always unlocked
      const isUnlocked = index === 0 || 
        user.completedLessons.some(
          (id) => id.toString() === lessons[index - 1]._id.toString()
        );
      
      // Check if there's a quiz after the previous lesson
      const previousLessonNumber = lesson.lessonNumber - 1;
      const quiz = quizzes.find(q => {
        const afterLesson = q.afterLesson || (q.quizNumber * 5);
        return afterLesson === previousLessonNumber;
      });
      const requiresQuiz = quiz && !user.quizzesPassed.includes(quiz.quizNumber);
      
      // Check subscription access
      let requiresSubscription = false;
      if (user.subscriptionType === "free") {
        // Free users: only first 3 beginner lessons
        if (level === "beginner" && lesson.lessonNumber > 3) {
          requiresSubscription = true;
        } else if (level !== "beginner") {
          requiresSubscription = true;
        }
      }
      
      return {
        ...lesson.toObject(),
        isCompleted,
        isUnlocked: requiresSubscription ? false : (requiresQuiz ? false : isUnlocked),
        requiresQuiz: requiresQuiz,
        requiresSubscription: requiresSubscription,
        quizNumber: quiz ? quiz.quizNumber : null
      };
    });
    
    res.json({ status: "success", lessons: lessonsWithStatus });
  } catch (err) {
    console.error("Get lessons error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// =========================
// MARK LESSON AS COMPLETED
// =========================
router.post("/complete-lesson", async (req, res) => {
  try {
    const { phone, lessonId } = req.body;
    
    const user = await User.findOne({ phone });
    if (!user) return res.json({ status: "error", message: "User not found" });
    
    // Check if already completed
    if (user.completedLessons.includes(lessonId)) {
      return res.json({ status: "success", message: "Lesson already completed" });
    }
    
    user.completedLessons.push(lessonId);
    
    // Check if user completed all lessons of current level and update currentLevel
    const Lesson = require("../models/Lesson");
    const currentLesson = await Lesson.findById(lessonId);
    
    if (currentLesson) {
      const allLessonsOfLevel = await Lesson.find({ level: currentLesson.level });
      const completedInLevel = user.completedLessons.filter(id => 
        allLessonsOfLevel.some(lesson => lesson._id.toString() === id.toString())
      ).length + 1; // +1 for the lesson we just completed
      
      // If all lessons of this level are completed, update currentLevel
      if (completedInLevel === allLessonsOfLevel.length) {
        if (currentLesson.level === "beginner") {
          user.currentLevel = "medium";
        } else if (currentLesson.level === "medium") {
          user.currentLevel = "expert";
        }
      }
    }
    
    await user.save();
    
    res.json({ status: "success", message: "Lesson marked as completed" });
  } catch (err) {
    console.error("Complete lesson error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// =========================
// GET QUIZ BY LEVEL AND NUMBER
// =========================
router.get("/quiz/:level/:quizNumber", async (req, res) => {
  try {
    const { level, quizNumber } = req.params;
    const Quiz = require("../models/Quiz");
    const quiz = await Quiz.findOne({ level, quizNumber: parseInt(quizNumber) });
    
    if (!quiz) return res.json({ status: "error", message: "Quiz not found" });
    
    // Don't send correct answers to frontend
    const quizData = {
      ...quiz.toObject(),
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options,
        _id: q._id
      }))
    };
    
    res.json({ status: "success", quiz: quizData });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// =========================
// SUBMIT QUIZ
// =========================
router.post("/submit-quiz", async (req, res) => {
  try {
    const { phone, level, quizNumber, answers } = req.body;
    
    const user = await User.findOne({ phone });
    if (!user) return res.json({ status: "error", message: "User not found" });
    
    const quiz = await Quiz.findOne({ level, quizNumber });
    if (!quiz) return res.json({ status: "error", message: "Quiz not found" });
    
    // Check answers
    let correctCount = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    
    const totalQuestions = quiz.questions.length;
    const percentage = (correctCount / totalQuestions) * 100;
    const passed = percentage >= 60; // 60% passing criteria
    
    if (passed && !user.quizzesPassed.includes(quizNumber)) {
      user.quizzesPassed.push(quizNumber);
      await user.save();
    }
    
    res.json({
      status: "success",
      passed,
      correctCount,
      totalQuestions,
      percentage: percentage.toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// =========================
// REQUEST WALLET REDEMPTION
// =========================
router.post("/request-redemption", async (req, res) => {
  try {
    const { phone, amount } = req.body;
    
    const user = await User.findOne({ phone });
    if (!user) return res.json({ status: "error", message: "User not found" });
    
    if (user.wallet < amount) {
      return res.json({ status: "error", message: "Insufficient wallet balance" });
    }
    
    if (amount < 100) {
      return res.json({ status: "error", message: "Minimum redemption amount is ₹100" });
    }
    
    // Create redemption request
    const redemption = await Redemption.create({
      userId: user._id,
      userName: user.name,
      userPhone: user.phone,
      amount,
      status: "pending"
    });
    
    res.json({ 
      status: "success", 
      message: "Redemption request submitted successfully",
      redemption 
    });
  } catch (err) {
    console.error("Redemption error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// =========================
// GET USER REDEMPTION HISTORY
// =========================
router.get("/redemptions/:phone", async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.params.phone });
    if (!user) return res.json({ status: "error", message: "User not found" });
    
    const redemptions = await Redemption.find({ userId: user._id })
      .sort({ requestedAt: -1 });
    
    res.json({ status: "success", redemptions });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

module.exports = router;
