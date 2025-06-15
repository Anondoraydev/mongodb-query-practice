// নির্দিষ্ট ডকুমেন্ট থেকে 'age' ফিল্ডটি ডিলিট করা হচ্ছে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000066") },
    { $unset: { age: "" } }
)

// 'friends' অ্যারে থেকে সর্বশেষ (ডান পাশে থাকা) একটি উপাদান মুছে ফেলা হচ্ছে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000066") },
    { $pop: { friends: 1 } }
)

// 'friends' অ্যারে থেকে প্রথম (বাম পাশে থাকা) একটি উপাদান মুছে ফেলা হচ্ছে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000066") },
    { $pop: { friends: -1 } }
)

// 'friends' অ্যারে থেকে "Mir Hussain" নামের উপাদানটি সরানো হচ্ছে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000066") },
    { $pull: { friends: "Mir Hussain" } }
)

// 'interests' অ্যারে থেকে একাধিক নির্দিষ্ট মান ("Gaming", "Football" ইত্যাদি) সরানো হচ্ছে
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $pullAll: {
            interests: [
                "Gaming",
                "Football",
                "Football,crecket",
                "cooking",
                "driving",
                "cooking",
                "driving"
            ],
        }
    },
)
