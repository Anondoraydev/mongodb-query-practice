// নির্দিষ্ট ডকুমেন্টে age ফিল্ডের মান ৮৫ করা হচ্ছে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $set: {
            age: 85
        }
    }
)

// নির্দিষ্ট ডকুমেন্টের interests ফিল্ডকে নতুন একটি array দিয়ে আপডেট করা হচ্ছে
// আগের value থাকলে সেটাকে পুরোপুরি পরিবর্তন করে ["Gaming"] দিয়ে রিপ্লেস করবে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $set: {
            interests: ["Gaming"]
        }
    }
)

// interests array-তে "Football" আইটেমটি যোগ করা হবে যদি আগেই না থাকে
// $addToSet ব্যবহার করার জন্য interests অবশ্যই array টাইপ হতে হবে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $addToSet: {
            interests: "Football"
        }
    }
)
