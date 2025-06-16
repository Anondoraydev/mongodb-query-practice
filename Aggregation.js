
// ✅ ১. $match এবং $project একত্রে ব্যবহার করে ফিল্টার ও নির্দিষ্ট ফিল্ড আউটপুট
db.test.aggregate([
    // ১ম স্টেজ: পুরুষ এবং বয়স ৩০ এর নিচে এমন ডেটা বাছাই
    { $match: { gender: "Male", age: { $lt: 30 } } },

    // ২য় স্টেজ: শুধু name এবং gender ফিল্ড দেখানো
    { $project: { name: 1, gender: 1 } }
])

// ✅ ২. দুইটি $match আলাদা স্টেজে ব্যবহার করে ফিল্টার এবং $project
db.test.aggregate([
    // ১ম স্টেজ: শুধু পুরুষদের ডেটা
    { $match: { gender: "Male" } },

    // ২য় স্টেজ: বয়স ৩০ এর নিচে
    { $match: { age: { $lt: 30 } } },

    // ৩য় স্টেজ: শুধু name এবং gender ফিল্ড দেখানো
    { $project: { name: 1, gender: 1 } }
])

// ✅ ৩. $addFields দিয়ে নতুন ফিল্ড যোগ এবং $project দিয়ে শুধু সেই ফিল্ড দেখানো
db.test.aggregate([
    // ১ম স্টেজ: শুধু পুরুষদের ডেটা নির্বাচন
    { $match: { gender: "Male" } },

    // ২য় স্টেজ: নতুন দুটি ফিল্ড course ও eduTech যুক্ত করা হচ্ছে
    { $addFields: { course: "level-2", eduTech: "Programing Hero" } },

    // ৩য় স্টেজ: শুধু course ও eduTech ফিল্ড দেখানো হচ্ছে
    { $project: { course: 1, eduTech: 1 } }
])
