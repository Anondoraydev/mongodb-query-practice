db.test.aggregate([
    // ধাপ-১: বয়স অনুসারে ডেটা গ্রুপ করা হচ্ছে বিভিন্ন রেঞ্জে
    {
        $bucket: {
            groupBy: "$age", // কোন ফিল্ড দিয়ে গ্রুপ করা হবে (এখানে age)
            boundaries: [20, 40, 60, 80], // বয়সের রেঞ্জগুলো
            default: "80 er upor bura gula", // ৮০ বছরের ঊর্ধ্বে যারা, তারা এখানে যাবে
            output: {
                count: { $sum: 1 }, // প্রতিটি গ্রুপে কয়টি ডেটা আছে, তা গণনা
                kkace: { $push: "$name" } // প্রতিটি গ্রুপে নামগুলোর তালিকা রাখা
            }
        }
    },

    // ধাপ-২: গ্রুপের সংখ্যা অনুযায়ী সাজানো হচ্ছে (descending)
    {
        $sort: { count: -1 }
    },

    // ধাপ-৩: শুধুমাত্র শীর্ষ ২টি রেজাল্ট রাখা হবে
    {
        $limit: 2
    },

    // ধাপ-৪: শুধু count ফিল্ডটি রাখা হবে, বাকিগুলো বাদ
    {
        $project: {
            count: 1
        }
    },
])

db.test.aggregate([
    {
        $facet: {
            // পাইপলাইন-১: friendsCount বের করা
            "friendsCount": [
                // প্রতিটি friends অ্যারে আলাদা ডকুমেন্টে ভেঙে ফেলা
                { $unwind: "$friends" },

                // একই friends অনুযায়ী গ্রুপ করে মোট কতবার এসেছে গুনে ফেলা
                { $group: { _id: "$friends", count: { $sum: 1 } } }
            ],

            // পাইপলাইন-২: educationCount বের করা
            "educationCount": [
                // প্রতিটি education অ্যারে আলাদা ডকুমেন্টে ভেঙে ফেলা
                { $unwind: "$education" },

                // একই education অনুযায়ী গ্রুপ করে মোট সংখ্যা গুনে ফেলা
                { $group: { _id: "$education", count: { $sum: 1 } } }
            ]
        }
    }
])

