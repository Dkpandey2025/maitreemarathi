# Subscription System - Complete Testing Guide

## 🎯 Demo Flow for Client

### **Scenario 1: Free User Experience**

1. **Register New User**
   - Go to `/register`
   - Create account with name, phone, password
   - User is automatically set to "Free" plan
   - ✅ Expected: Redirected to home page

2. **Access Beginner Lessons**
   - Go to "Learn Marathi" → Beginner Lessons
   - ✅ Expected: Lessons 1-3 are unlocked (white background, 📖 icon)
   - ✅ Expected: Lessons 4+ show "👑 Subscription Required" (yellow background)

3. **Try to Access Locked Lesson**
   - Click on Lesson 4 or higher
   - ✅ Expected: Popup asks "Would you like to upgrade now?"
   - Click "OK"
   - ✅ Expected: Redirected to `/plan` page

4. **Check Profile**
   - Go to Profile page
   - ✅ Expected: Shows "🆓 Free" subscription
   - ✅ Expected: Shows "Access limited to first 3 beginner lessons"
   - ✅ Expected: "Upgrade Now" button visible

---

### **Scenario 2: Monthly Subscription Purchase**

1. **Select Plan**
   - Go to `/plan` page
   - Select "Monthly Subscription" (₹199)
   - Click "Proceed to Payment"
   - ✅ Expected: Redirected to payment page with amount pre-filled

2. **Complete Payment**
   - Fill in payment details
   - Click "Pay Securely"
   - ✅ Expected: Redirected to Instamojo payment gateway
   - Complete payment (use test mode if available)
   - ✅ Expected: Redirected to `/payment-success`

3. **Subscription Activation**
   - ✅ Expected: Shows "Processing..." then "Payment Successful! 🎉"
   - ✅ Expected: Auto-redirects to profile after 3 seconds
   - ✅ Expected: Profile shows "📅 Monthly" subscription
   - ✅ Expected: Shows countdown "30 days remaining"

4. **Access All Lessons**
   - Go to Beginner Lessons
   - ✅ Expected: ALL lessons are now unlocked
   - Try Medium and Expert lessons
   - ✅ Expected: All accessible (if level unlocked)

---

### **Scenario 3: Lifetime Subscription**

1. **Select Lifetime Plan**
   - Go to `/plan`
   - Select "Lifetime Subscription" (₹499)
   - Complete payment process
   - ✅ Expected: Subscription activated

2. **Check Profile**
   - ✅ Expected: Shows "🌟 Lifetime" subscription
   - ✅ Expected: Shows "✨ Enjoy unlimited access forever!"
   - ✅ Expected: No countdown timer

---

### **Scenario 4: Admin Dashboard View**

1. **Login as Admin**
   - Go to `/admin-login`
   - Login with admin credentials
   - ✅ Expected: Redirected to admin dashboard

2. **View Users Tab**
   - Click "Users" tab
   - ✅ Expected: Table shows columns:
     - Name, Phone
     - **Subscription** (Free/Monthly/Lifetime with color badges)
     - **Status** (Active/Expired/None with color badges)
     - **Days Left** (countdown for monthly, "∞ Forever" for lifetime)
     - Wallet, Referrals, Actions

3. **Check User Details**
   - Click "View" on any user
   - ✅ Expected: Modal shows:
     - Basic info (name, phone, wallet, referrals)
     - **Subscription Details section**:
       - Type, Status
       - Start Date, End Date
       - Days Remaining (for monthly)

4. **Identify Expired Subscriptions**
   - ✅ Expected: Users with expired monthly subscriptions show:
     - Status: "✗ Expired" (red badge)
     - Days Left: "Expired" (red text)
     - Subscription Type: "🆓 Free" (reverted)

---

### **Scenario 5: Subscription Expiry**

1. **Simulate Expiry** (For Testing)
   - Manually update a user's `subscriptionEndDate` in MongoDB to yesterday
   - Refresh admin dashboard
   - ✅ Expected: User shows as "Expired"

2. **User Experience After Expiry**
   - Login as that user
   - Go to Beginner Lessons
   - ✅ Expected: Only lessons 1-3 accessible again
   - ✅ Expected: Lessons 4+ locked with subscription prompt

3. **Profile Shows Expiry**
   - Check profile
   - ✅ Expected: Shows "🆓 Free" (reverted from monthly)
   - ✅ Expected: "Upgrade Now" button appears

---

## 🔍 Key Features to Highlight

### **For Free Users:**
- ✅ Access to first 3 beginner lessons only
- ✅ Clear visual indicators (yellow background, 👑 icon)
- ✅ Upgrade prompts when trying to access locked content
- ✅ Easy path to subscription page

### **For Subscribed Users:**
- ✅ Full access to all lessons
- ✅ Countdown timer for monthly (with warnings at 5 days)
- ✅ Lifetime users see "Forever" access
- ✅ Seamless learning experience

### **For Admins:**
- ✅ Complete visibility of all subscriptions
- ✅ Color-coded status indicators
- ✅ Days remaining countdown
- ✅ Auto-detection of expired subscriptions
- ✅ Detailed subscription info in user modal

---

## 🐛 Common Issues & Solutions

### Issue: "Subscription not showing in admin"
**Solution:** Restart the server to load updated User model

### Issue: "Lessons still locked after payment"
**Solution:** Check if payment success page activated subscription. Verify `/api/subscription/activate` was called.

### Issue: "Days remaining not showing"
**Solution:** Ensure `subscriptionEndDate` is set in database. Check MongoDB user document.

### Issue: "Free user can access all lessons"
**Solution:** Verify backend route `/api/user/lessons/:level/:phone` is checking subscription. Restart server.

---

## 📊 Database Verification

### Check User Subscription in MongoDB:
```javascript
db.users.findOne({ phone: "YOUR_PHONE" })
```

**Expected fields:**
- `subscriptionType`: "free" | "monthly" | "lifetime"
- `subscriptionStatus`: "none" | "active" | "expired"
- `subscriptionStartDate`: Date or null
- `subscriptionEndDate`: Date or null

### Manually Activate Subscription (for testing):
```javascript
db.users.updateOne(
  { phone: "YOUR_PHONE" },
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

---

## ✅ Pre-Demo Checklist

- [ ] Server is running (`node index.js`)
- [ ] MongoDB is connected
- [ ] Frontend dev server is running
- [ ] At least 5 beginner lessons exist in database
- [ ] Test user with free account exists
- [ ] Test user with monthly subscription exists
- [ ] Test user with lifetime subscription exists
- [ ] Admin account exists and can login
- [ ] Payment gateway is configured (test mode)
- [ ] All pages load without errors
- [ ] Browser console shows no errors

---

## 🎬 Demo Script (5 minutes)

1. **Show Free User** (1 min)
   - Login → Show 3 free lessons
   - Try lesson 4 → Subscription prompt

2. **Purchase Flow** (2 min)
   - Go to plan page
   - Select monthly → Payment page
   - Show payment form (don't complete if live)

3. **Show Subscribed User** (1 min)
   - Login as subscribed user
   - Show all lessons unlocked
   - Show profile with countdown

4. **Admin View** (1 min)
   - Login as admin
   - Show users table with subscriptions
   - Show user details modal
   - Highlight expired user (if any)

---

## 🚀 Ready for Demo!

All features are implemented and tested. The subscription system is production-ready with:
- ✅ 3-tier access control (Free/Monthly/Lifetime)
- ✅ Automatic expiry handling
- ✅ Admin monitoring dashboard
- ✅ Seamless payment integration
- ✅ User-friendly UI with clear indicators
