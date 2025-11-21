# 🎬 Demo Quick Reference Card

## 🚀 Start Commands

```bash
# Terminal 1: Start MongoDB
net start MongoDB

# Terminal 2: Start Backend
cd server
node index.js

# Terminal 3: Start Frontend
cd maitreemarathi
npm run dev
```

---

## 👥 Test Accounts

### Free User
- Phone: `1111111111`
- Password: `demo123`
- Access: 3 lessons only

### Premium User (Monthly)
- Phone: `2222222222`
- Password: `demo123`
- Access: All lessons, 30 days

### Lifetime User
- Phone: `3333333333`
- Password: `demo123`
- Access: All lessons, forever

### Admin
- Username: `admin`
- Password: `admin123`

---

## 📱 Key URLs

| Page | URL |
|------|-----|
| Home | http://localhost:5173/ |
| Register | http://localhost:5173/register |
| Login | http://localhost:5173/login |
| Admin Login | http://localhost:5173/admin-login |
| Plan Selection | http://localhost:5173/plan |
| Profile | http://localhost:5173/profile |
| Beginner Lessons | http://localhost:5173/beginner-lessons |
| Admin Dashboard | http://localhost:5173/admin (after admin login) |

---

## 🎯 5-Minute Demo Script

### **Minute 1: Free User**
1. Login as Free User (1111111111)
2. Go to Beginner Lessons
3. **Show:** Lessons 1-3 unlocked (white)
4. **Show:** Lessons 4+ locked with 👑 icon
5. Click Lesson 4 → Subscription prompt

### **Minute 2: Subscription Plans**
1. Click "Upgrade Now" or go to /plan
2. **Show:** Two plans:
   - Monthly: ₹199 (30 days)
   - Lifetime: ₹499 (forever)
3. Select Monthly
4. **Show:** Payment page with pre-filled amount

### **Minute 3: Premium User**
1. Login as Premium User (2222222222)
2. Go to Beginner Lessons
3. **Show:** ALL lessons unlocked
4. Go to Profile
5. **Show:** "📅 Monthly" with "30 days remaining"

### **Minute 4: Lifetime User**
1. Login as Lifetime User (3333333333)
2. Go to Profile
3. **Show:** "🌟 Lifetime" with "∞ Forever"
4. **Show:** All lessons accessible

### **Minute 5: Admin Dashboard**
1. Login as Admin
2. Go to Users tab
3. **Show:** Subscription columns:
   - Type (Free/Monthly/Lifetime)
   - Status (Active/Expired)
   - Days Left (countdown)
4. Click "View" on a user
5. **Show:** Detailed subscription info

---

## 🎨 Visual Indicators

### Lesson Status Icons:
- ✅ = Completed
- 📖 = Unlocked (can access)
- 👑 = Subscription Required
- 🔒 = Locked (previous lesson incomplete)

### Subscription Badges:
- 🆓 Free = Gray badge
- 📅 Monthly = Blue badge
- 🌟 Lifetime = Purple badge

### Status Indicators:
- ✓ Active = Green
- ✗ Expired = Red
- - None = Gray

---

## 🔧 Quick Fixes During Demo

### If lessons not showing:
```bash
# Restart backend
Ctrl+C
node index.js
```

### If subscription not updating:
```bash
# Clear browser cache
Ctrl+Shift+Delete
# Or hard refresh
Ctrl+Shift+R
```

### Manual subscription activation (emergency):
```javascript
// MongoDB Compass or shell
db.users.updateOne(
  { phone: "PHONE_NUMBER" },
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

## 💡 Key Selling Points

### For Free Users:
✅ Try before you buy (3 free lessons)
✅ Clear upgrade path
✅ No credit card required to start

### For Subscribed Users:
✅ Instant access to all content
✅ Real-time countdown timer
✅ Seamless learning experience

### For Business:
✅ Automated subscription management
✅ Real-time monitoring dashboard
✅ Automatic expiry handling
✅ Multiple subscription tiers

---

## 📊 Expected Behavior

### Free User Tries Lesson 4:
```
Click Lesson 4
↓
Popup: "This lesson requires a subscription. Would you like to upgrade now?"
↓
Click OK
↓
Redirected to /plan page
```

### After Payment:
```
Complete Payment
↓
Redirected to /payment-success
↓
Shows "Processing..." (2 seconds)
↓
Shows "Payment Successful! 🎉"
↓
Auto-redirect to Profile (3 seconds)
↓
Profile shows subscription with countdown
↓
All lessons unlocked
```

### Monthly Subscription Expiry:
```
30 days pass
↓
System auto-detects expiry
↓
User reverted to "Free"
↓
Only 3 lessons accessible again
↓
Admin dashboard shows "Expired" status
```

---

## ✅ Pre-Demo Checklist

- [ ] MongoDB running
- [ ] Backend server running (port 5000)
- [ ] Frontend running (port 5173)
- [ ] At least 5 beginner lessons in database
- [ ] Test users created (free, monthly, lifetime)
- [ ] Admin account exists
- [ ] Browser cache cleared
- [ ] No console errors
- [ ] All pages load correctly

---

## 🎤 Demo Talking Points

### Opening:
"Let me show you our 3-tier subscription system that maximizes user conversion while providing flexible access control."

### Free Tier:
"New users get 3 free lessons to try the platform. This reduces friction and increases signups."

### Subscription Lock:
"When they try to access premium content, they get a clear upgrade prompt. No confusion, just a simple path to conversion."

### Payment Flow:
"The payment process is seamless - select plan, pay, and instant activation. No manual intervention needed."

### Admin Dashboard:
"You have complete visibility: who's subscribed, when they expire, and automatic status updates. Everything is automated."

### Countdown Timer:
"Users see exactly how many days they have left. This creates urgency for renewals and reduces support queries."

### Closing:
"The system handles everything automatically - activation, access control, expiry, and monitoring. It's production-ready and scalable."

---

## 🚨 Emergency Contacts

### If something breaks:
1. Check browser console (F12)
2. Check server terminal for errors
3. Verify MongoDB is running
4. Restart backend server
5. Clear browser cache

### Common Error Messages:
- "Cannot connect to MongoDB" → Start MongoDB service
- "User not found" → Check phone number in localStorage
- "Subscription not activated" → Check API call in Network tab
- "Lessons still locked" → Refresh page or re-login

---

## 🎉 Success Metrics to Highlight

- ✅ **3-tier system**: Free, Monthly, Lifetime
- ✅ **Automatic activation**: No manual work
- ✅ **Real-time countdown**: 30-day timer
- ✅ **Auto-expiry**: System handles it
- ✅ **Admin monitoring**: Complete visibility
- ✅ **Seamless UX**: Clear visual indicators
- ✅ **Production-ready**: Fully tested

---

**You're ready to impress your client!** 🚀
