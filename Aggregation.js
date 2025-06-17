
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
    // স্টেজ-১: শুধুমাত্র পুরুষদের ডেটা নির্বাচন করা হচ্ছে
    { $match: { gender: "Male" } },

    // স্টেজ-২: প্রতিটি ডকুমেন্টে নতুন দুটি ফিল্ড course ও eduTech যোগ করা হচ্ছে
    { $addFields: { course: "level-2", eduTech: "Programing Hero" } },

    // স্টেজ-৩: (ঐচ্ছিকভাবে) শুধু নির্দিষ্ট ফিল্ড দেখাতে পারো — এখানে এটা কমেন্ট আকারে রাখা আছে
    // { $project: { course: 1, eduTech: 1 } },

    // স্টেজ-৪: প্রক্রিয়াজাত ফলাফলগুলো একটি নতুন বা বিদ্যমান কালেকশনে সংরক্ষণ করা হচ্ছে
    { $out: "course-student" }
])

db.test.aggregate([
    // স্টেজ-১: (ঐচ্ছিকভাবে) শুধুমাত্র পুরুষদের ডেটা বাছাই করতে পারো
    // { $match: { gender: "Male" } },

    // স্টেজ-২: প্রতিটি ডকুমেন্টে দুটি নতুন ফিল্ড course ও eduTech যুক্ত করা হচ্ছে
    { $addFields: { course: "level-2", eduTech: "Programing Hero" } },

    // স্টেজ-৩: (ঐচ্ছিকভাবে) নির্দিষ্ট ফিল্ড রিটার্ন করতে চাইলে ব্যবহার করতে পারো
    // { $project: { course: 1, eduTech: 1 } },

    // স্টেজ-৪: প্রক্রিয়াজাত ডেটাগুলো আবার একই collection "test" এ merge করা হচ্ছে
    { $merge: "test" }
])

db.test.aggregate([
    // stage-1: মোট, সর্বোচ্চ, সর্বনিম্ন ও গড় salary বের করা
    {
        $group: {
            _id: null,
            totalSalary: { $sum: "$salary" },
            maxSalary: { $max: "$salary" },
            minSalary: { $min: "$salary" },
            avgSalary: { $avg: "$salary" },
        }
    },
    // stage-2: প্রয়োজনীয় ফিল্ড retain ও নতুন ফিল্ড হিসেব করা
    {
        $project: {
            totalSalary: 1,
            maxSalary: 1,
            minSalary: 1,
            averageSalary: "$avgSalary",
            rangeBetweenMaxandMin: {
                $subtract: ["$maxSalary", "$minSalary"]
            }
        }
    }
])

db.test.aggregate([
    // stage-1: friends অ্যারে ভেঙে প্রতিটি friend আলাদা করা
    { $unwind: "$friends" },

    // stage-2: friend অনুযায়ী গ্রুপ করে count বের করা
    {
        $group: {
            _id: "$friends",
            count: { $sum: 1 }
        }
    }
])


db.test.aggregate([
    // stage-1: interests অ্যারে ভেঙে প্রতিটি interest আলাদা করা
    {
        $unwind: "$interests"
    },
    // stage-2: age অনুযায়ী গ্রুপ করে interests গুলো অ্যারেতে রাখা
    {
        $group: {
            _id: "$age",
            interestsPerAge: { $push: "$interests" }
        }
    }
])

