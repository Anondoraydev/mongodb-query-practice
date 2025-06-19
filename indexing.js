// 🔍 ধাপে ১: ইমেইল ফিল্ডের উপর ইনডেক্স তৈরি করার কোড (এই লাইন কমেন্ট করা হয়েছে)
db.getCollection("massive-data").createIndex({email:1})

// ❌ ধাপে ২: ইমেইল ফিল্ডের উপর থাকা ইনডেক্সটি ডিলিট/মুছে ফেলার কমান্ড
db.getCollection("massive-data").dropIndex({ email: 1 })

// 🔍 'dolor' শব্দটি আছে এমন ডকুমেন্টগুলো সার্চ করা হচ্ছে, যা text index-এর মাধ্যমে খোঁজা হয়
// 📄 শুধু 'about' ফিল্ডটি রিটার্ন করা হচ্ছে (project করা হচ্ছে)

db.getCollection("massive-data").find(
    { $text: { $search: "dolor" } }  // টেক্সট ইনডেক্স ব্যবহার করে 'dolor' শব্দ খোঁজা
).project(
    { about: 1 }  // শুধু 'about' ফিল্ড দেখানো হবে
)

// 📌 'about' ফিল্ডে text index তৈরি করা
db.getCollection("massive-data").createIndex({ about: "text" })
