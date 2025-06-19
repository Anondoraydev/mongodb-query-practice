// 🔍 ধাপে ১: ইমেইল ফিল্ডের উপর ইনডেক্স তৈরি করার কোড (এই লাইন কমেন্ট করা হয়েছে)
db.getCollection("massive-data").createIndex({email:1})

// ❌ ধাপে ২: ইমেইল ফিল্ডের উপর থাকা ইনডেক্সটি ডিলিট/মুছে ফেলার কমান্ড
db.getCollection("massive-data").dropIndex({ email: 1 })
