// ১. শুধু gender গুলো আলাদা করে দেখাবে
db.test.aggregate([
    {
        $group: {
            _id: "$gender"  // gender অনুযায়ী গ্রুপিং
        }
    }
])

// ২. age অনুযায়ী গ্রুপ করে প্রতিটি age এর count দেখাবে
db.test.aggregate([
    {
        $group: {
            _id: "$age",        // age অনুযায়ী গ্রুপিং
            count: { $sum: 1 }  // প্রতিটি গ্রুপের মোট সংখ্যা গণনা
        }
    }
])

// ৩. address.country অনুযায়ী গ্রুপ করে count দেখাবে
db.test.aggregate([
    {
        $group: {
            _id: "$address.country",  // দেশের নাম অনুযায়ী গ্রুপিং
            count: { $sum: 1 }        // দেশের মোট ডকুমেন্ট সংখ্যা
        }
    }
])

// ৪. address.country অনুযায়ী গ্রুপ করে ঐ দেশের name গুলো push করবে (array বানাবে)
db.test.aggregate([
    {
        $group: {
            _id: "$address.country",
            nameDekhaw: { $push: "$name" }  // ঐ দেশের সব নামগুলো অ্যারেতে যোগ করবে
        }
    }
])

// ৫. address.country অনুযায়ী গ্রুপ করে ঐ দেশের পুরো ডকুমেন্টগুলো push করবে
db.test.aggregate([
    {
        $group: {
            _id: "$address.country",
            nameDekhaw: { $push: "$$ROOT" }  // পুরো ডকুমেন্ট অ্যারেতে যোগ করবে
        }
    }
])

// ৬. address.country অনুযায়ী গ্রুপ করে count এবং পুরো ডকুমেন্ট push করবে,
// পরে projection দিয়ে name, email, phone আলাদা করে দেখাবে
db.test.aggregate([
    {
        $group: {
            _id: "$address.country",
            count: { $sum: 1 },
            FullDoc: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            count: 1,
            FullDoc: {
                $map: {
                    input: "$FullDoc",
                    as: "doc",
                    in: {
                        name: "$$doc.name",
                        email: "$$doc.email",
                        phone: "$$doc.phone"
                    }
                }
            }
        }
    }
])
