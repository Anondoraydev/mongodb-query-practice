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

// _id অনুযায়ী নির্দিষ্ট ডকুমেন্টে "comet" ভ্যালুটি interests অ্যারেতে যোগ করব,
// তবে আগেই থাকলে আর যোগ হবে না
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $addToSet: {
            interests: "comet"
        }
    }
)


// _id অনুযায়ী নির্দিষ্ট ডকুমেন্টে "comet" ভ্যালুটি interests অ্যারেতে যোগ করব,
// আগেই থাকলেও আবারও যোগ হবে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $push: {
            interests: "comet"
        }
    }
)

// নির্দিষ্ট ডকুমেন্টে "address.city" ফিল্ডে "Dhaka" সেট করা হচ্ছে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $set: { "address.city": "Dhaka" }
    }
)

// নির্দিষ্ট ডকুমেন্টে "address.city" এবং "address.country" ফিল্ডে মান সেট করা হচ্ছে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $set: {
            "address.city": "Dhaka",
            "address.country": "Bangladesh"
        }
    }
)

// education অ্যারেতে যার major "Communications", সেটার মান পরিবর্তন করে "CSE" করা হচ্ছে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065"), "education.major": "Communications" },
    {
        $set: {
            "education.$.major": "CSE"
        }
    }
)

// নির্দিষ্ট ডকুমেন্টে "age" ফিল্ডের মান ১ বাড়ানো হচ্ছে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $inc: {
            age: 1
        }
    }
)

