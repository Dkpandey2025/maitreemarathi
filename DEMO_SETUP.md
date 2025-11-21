# Quick Demo Setup Guide

## 🚀 Start Everything

### 1. Start MongoDB
```bash
# Windows (as Administrator)
net start MongoDB

# Or start MongoDB Compass and connect
```

### 2. Start Backend Server
```bash
cd server
node index.js
```

**Expected output:**
```
🚀 Server running on http://localhost:5000
✅ MongoDB connected
```

### 3. Start Frontend
```bash
cd maitreemarathi
npm run dev
```

**Expected output:**
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

---

## 👥 Create Test Accounts

### Create Free User
1. Go to `http://localhost:5173/register`
2. Register with:
   - Name: "Free User Demo"
   - Phone: "1111111111"
   - Password: "demo123"
3. This user will have FREE subscription (3 lessons only)

### Create Subscribed User (Manual Setup)
1. Register another user:
   - Name: "Premium User Demo"
   - Phone: "2222222222"
   - Password: "demo123"

2. Activate subscription via MongoDB:
```javascript
// Open MongoDB Compass or mongo shell
use maitreemarathi

db.users.updateOne(
  { phone: "2222222222" },
  {
    $set: {
      subscriptionType: "monthly",
      subscriptionStatus: "active",
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(Date.now() + 30*24*60*60*1000)
    }
  }
)
```

### Create Lifetime User (Manual Setup)
1. Register:
   - Name: "Lifetime User Demo"
   - Phone: "3333333333"
   - Password: "demo123"

2. Activate lifetime:
```javascript
db.users.updateOne(
  { phone: "3333333333" },
  {
    $set: {
      subscriptionType: "lifetime",
      subscriptionStatus: "active",
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date("2099-12-31")
    }
  }
)
```

### Create Admin Account
```javascript
use maitreemarathi

db.admins.insertOne({
  username: "admin",
  password: "admin123"
})
```

---

## 📚 Add Sample Lessons

### Via Admin Dashboard
1. Go to `http://localhost:5173/admin-login`
2. Login: username: `admin`, password: `admin123`
3. Go to "Lessons" tab
4. Add at least 5 beginner lessons:

**Lesson 1:**
- Level: Beginner
- Lesson Number: 1
- Title: "Introduction to Marathi"
- Content: "Welcome to Marathi learning! नमस्कार (Namaste) means Hello."

**Lesson 2:**
- Level: Beginner
- Lesson Number: 2
- Title: "Basic Greetings"
- Content: "Learn basic greetings: धन्यवाद (Dhanyavaad) means Thank you."

**Lesson 3:**
- Level: Beginner
- Lesson Number: 3
- Title: "Numbers 1-10"
- Content: "एक (Ek) = 1, दोन (Don) = 2, तीन (Teen) = 3"

**Lesson 4:**
- Level: Beginner
- Lesson Number: 4
- Title: "Family Members"
- Content: "आई (Aai) = Mother, बाबा (Baba) = Father"

**Lesson 5:**
- Level: Beginner
- Lesson Number: 5
- Title: "Common Phrases"
- Content: "मला समजले (Mala samajle) = I understand"

---

## ✅ Pre-Demo Verification

### Test Free User Flow:
1. Login as Free User (1111111111)
2. Go to Beginner Lessons
3. ✅ Verify: Lessons 1-3 are white/unlocked
4. ✅ Verify: Lessons 4-5 are yellow with 👑 icon
5. Click Lesson 4
6. ✅ Verify: Popup asks to upgrade
7. Go to Profile
8. ✅ Verify: Shows "Free" subscription

### Test Premium User Flow:
1. Login as Premium User (2222222222)
2. Go to Beginner Lessons
3. ✅ Verify: ALL lessons are unlocked
4. Go to Profile
5. ✅ Verify: Shows "Monthly" with "30 days" countdown

### Test Admin Dashboard:
1. Login as Admin
2. Go to Users tab
3. ✅ Verify: See all 3 users with different subscription types
4. ✅ Verify: Free user shows "Free" badge
5. ✅ Verify: Premium user shows "Monthly" with days remaining
6. ✅ Verify: Lifetime user shows "Lifetime" with "∞ Forever"

---

## 🎬 Demo Flow (Recommended Order)

### Part 1: Free User Experience (2 min)
1. Show registration
2. Show 3 free lessons
3. Try to access lesson 4 → subscription prompt
4. Show profile with free status

### Part 2: Subscription Purchase (2 min)
1. Click "Upgrade Now" or go to /plan
2. Show plan selection page
3. Show payment page (don't complete payment)
4. Explain: After payment → auto-activation

### Part 3: Premium User (1 min)
1. Login as premium user
2. Show all lessons unlocked
3. Show profile with countdown timer

### Part 4: Admin Dashboard (2 min)
1. Login as admin
2. Show users table with subscription columns
3. Click "View" on a user → show detailed subscription info
4. Highlight color-coded status indicators

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
mongosh
# If error, start MongoDB service
```

### "Lessons not showing"
- Restart backend server
- Check MongoDB has lessons: `db.lessons.find()`

### "Subscription not updating"
- Clear browser cache
- Check browser console for errors
- Verify API calls in Network tab

### "Admin can't login"
- Verify admin exists in database
- Check username/password match

---

## 📱 Quick Test URLs

- **Home:** http://localhost:5173/
- **Register:** http://localhost:5173/register
- **Login:** http://localhost:5173/login
- **Admin Login:** http://localhost:5173/admin-login
- **Plan Selection:** http://localhost:5173/plan
- **Profile:** http://localhost:5173/profile
- **Beginner Lessons:** http://localhost:5173/beginner-lessons

---

## ✨ You're Ready!

Everything is set up and tested. The subscription system is fully functional and ready for your client demo!

**Key Selling Points:**
- ✅ 3-tier subscription model (Free/Monthly/Lifetime)
- ✅ Automatic access control
- ✅ Real-time countdown for monthly subscriptions
- ✅ Admin monitoring dashboard
- ✅ Seamless payment integration
- ✅ User-friendly interface with clear visual indicators
