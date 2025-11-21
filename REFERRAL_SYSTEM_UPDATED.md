# Updated Referral System

## 🎯 New Referral Logic

### **Referral Bonus Rules:**

1. **Registration Only:** No bonus awarded ❌
2. **Monthly Subscription Purchase:** ₹51 bonus to referrer ✅
3. **Lifetime Subscription Purchase:** ₹101 bonus to referrer ✅
4. **One-time Bonus:** Bonus awarded only once per referred user ✅

---

## 📊 How It Works

### **Step 1: User Registration with Referral Code**

```javascript
// User A (Referrer) has referral code: MM11115616
// User B (New User) registers using this code

POST /register
{
  name: "User B",
  phone: "1234567890",
  password: "password123",
  referralCode: "MM11115616"  // User A's code
}

Result:
✅ User B registered
✅ User B's referredBy = "MM11115616"
❌ NO bonus awarded yet (User A's wallet unchanged)
```

### **Step 2: Referred User Purchases Subscription**

```javascript
// User B purchases Monthly subscription

POST /api/subscription/activate
{
  phone: "1234567890",
  subscriptionType: "monthly",
  paymentId: "pay_123"
}

Result:
✅ User B gets monthly subscription (30 days)
✅ User A (referrer) gets ₹51 bonus
✅ User A's referralCount increases by 1
✅ User B marked as referralBonusAwarded = true
```

### **Step 3: Prevent Duplicate Bonus**

```javascript
// If User B renews or upgrades subscription later

POST /api/subscription/activate
{
  phone: "1234567890",
  subscriptionType: "lifetime",
  paymentId: "pay_456"
}

Result:
✅ User B gets lifetime subscription
❌ NO additional bonus to User A (already awarded)
```

---

## 💰 Bonus Amounts

| Subscription Type | Referrer Bonus | Notes |
|-------------------|----------------|-------|
| Free (No purchase) | ₹0 | No bonus on registration |
| Monthly (₹199) | ₹51 | ~25% commission |
| Lifetime (₹499) | ₹101 | ~20% commission |

---

## 🔍 Database Changes

### **User Model Updated:**

```javascript
{
  // Existing fields
  referralCode: "MM11115616",
  referredBy: "MM88881929",
  wallet: 51,
  referralCount: 1,
  
  // NEW FIELD
  referralBonusAwarded: false  // Prevents duplicate bonus
}
```

---

## 🧪 Testing Scenarios

### **Scenario 1: Registration Only (No Bonus)**

1. **User A exists** with referral code `MM11115616`
2. **User B registers** using code `MM11115616`
3. **Check User A's wallet:** Should be unchanged ✅
4. **Check User B's referredBy:** Should be `MM11115616` ✅

### **Scenario 2: Monthly Subscription (₹51 Bonus)**

1. **User B purchases monthly subscription**
2. **Check User A's wallet:** Should increase by ₹51 ✅
3. **Check User A's referralCount:** Should increase by 1 ✅
4. **Check User B's referralBonusAwarded:** Should be `true` ✅

### **Scenario 3: Lifetime Subscription (₹101 Bonus)**

1. **User C registers** using User A's code
2. **User C purchases lifetime subscription**
3. **Check User A's wallet:** Should increase by ₹101 ✅
4. **Check User A's referralCount:** Should increase by 1 ✅

### **Scenario 4: Renewal (No Additional Bonus)**

1. **User B's monthly subscription expires**
2. **User B renews** (purchases again)
3. **Check User A's wallet:** Should NOT increase ✅
4. **Reason:** `referralBonusAwarded = true` prevents duplicate

---

## 📝 Code Changes Summary

### **1. User Model** (`server/models/User.js`)
```javascript
// Added new field
referralBonusAwarded: { type: Boolean, default: false }
```

### **2. Registration Endpoint** (`server/index.js`)
```javascript
// REMOVED old bonus logic
// No longer awards ₹100 on registration
```

### **3. Subscription Activation** (`server/routes/subscriptionRoutes.js`)
```javascript
// ADDED new bonus logic
if (user.referredBy && !user.referralBonusAwarded) {
  const referrer = await User.findOne({ referralCode: user.referredBy });
  
  let bonusAmount = 0;
  if (subscriptionType === "monthly") bonusAmount = 51;
  if (subscriptionType === "lifetime") bonusAmount = 101;
  
  referrer.wallet += bonusAmount;
  referrer.referralCount += 1;
  user.referralBonusAwarded = true;
  
  await referrer.save();
  await user.save();
}
```

---

## 🎬 Demo Flow

### **Show Referral System:**

1. **User A (Referrer):**
   - Login as User A
   - Go to Profile → Show referral code
   - Go to Wallet → Show current balance (e.g., ₹0)

2. **User B (New User):**
   - Register with User A's referral code
   - Check User A's wallet → Still ₹0 (no bonus yet)

3. **User B Purchases Subscription:**
   - User B goes to /plan
   - Selects Monthly (₹199)
   - Completes payment
   - Subscription activated

4. **Check User A's Wallet:**
   - Refresh User A's profile
   - Wallet now shows ₹51 ✅
   - Referral count increased to 1 ✅

5. **Show Admin Dashboard:**
   - Login as admin
   - View User A → Shows wallet: ₹51, referrals: 1
   - View User B → Shows referredBy: MM11115616

---

## 🔧 Manual Testing (MongoDB)

### **Create Test Scenario:**

```javascript
// 1. Create Referrer (User A)
db.users.insertOne({
  name: "Referrer User",
  phone: "1111111111",
  password: "test123",
  referralCode: "MMTEST1234",
  wallet: 0,
  referralCount: 0
})

// 2. Create Referred User (User B)
db.users.insertOne({
  name: "Referred User",
  phone: "2222222222",
  password: "test123",
  referralCode: "MMTEST5678",
  referredBy: "MMTEST1234",  // User A's code
  wallet: 0,
  referralCount: 0,
  referralBonusAwarded: false
})

// 3. Activate subscription for User B
// Use API: POST /api/subscription/activate
// { phone: "2222222222", subscriptionType: "monthly" }

// 4. Verify User A got bonus
db.users.findOne({ phone: "1111111111" })
// Expected: wallet = 51, referralCount = 1

// 5. Verify User B marked as awarded
db.users.findOne({ phone: "2222222222" })
// Expected: referralBonusAwarded = true
```

---

## ✅ Verification Checklist

### Before Subscription Purchase:
- [ ] User B registered with referral code
- [ ] User B's `referredBy` field set correctly
- [ ] User A's wallet unchanged (₹0)
- [ ] User B's `referralBonusAwarded` = false

### After Monthly Subscription:
- [ ] User B has active monthly subscription
- [ ] User A's wallet increased by ₹51
- [ ] User A's referralCount increased by 1
- [ ] User B's `referralBonusAwarded` = true

### After Lifetime Subscription:
- [ ] User C has active lifetime subscription
- [ ] User A's wallet increased by ₹101
- [ ] User A's referralCount increased by 1
- [ ] User C's `referralBonusAwarded` = true

### Duplicate Prevention:
- [ ] User B renews subscription
- [ ] User A's wallet does NOT increase again
- [ ] System checks `referralBonusAwarded` flag

---

## 🚨 Important Notes

### **Migration for Existing Users:**

If you have existing users who registered with referral codes:
- They have `referralBonusAwarded = false` (default)
- When they purchase subscription, bonus will be awarded ✅
- This is correct behavior (bonus on first subscription purchase)

### **Old Users Who Got Registration Bonus:**

If some users already received ₹100 bonus on registration:
- They keep that bonus (no need to remove)
- When their referred users purchase subscription, they get additional bonus
- This is a one-time migration issue

### **Recommended Action:**

```javascript
// Optional: Mark old referred users as already awarded
// (if you don't want to give bonus for old referrals)
db.users.updateMany(
  { 
    referredBy: { $ne: null },
    createdAt: { $lt: new Date("2025-11-21") }  // Before today
  },
  { 
    $set: { referralBonusAwarded: true } 
  }
)
```

---

## 📊 Expected Behavior Summary

| Event | Referrer Wallet | Referrer Count | Notes |
|-------|----------------|----------------|-------|
| User registers with code | No change | No change | No bonus yet |
| Referred user buys Monthly | +₹51 | +1 | First subscription |
| Referred user buys Lifetime | +₹101 | +1 | First subscription |
| Referred user renews | No change | No change | Already awarded |
| Referred user upgrades | No change | No change | Already awarded |

---

## ✅ System Ready

The updated referral system is now:
- ✅ Only rewards on subscription purchase
- ✅ Prevents duplicate bonuses
- ✅ Tracks bonus status per user
- ✅ Awards correct amounts (₹51/₹101)
- ✅ Production-ready

**Restart your server to apply the changes!**
