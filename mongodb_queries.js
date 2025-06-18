// শুধুমাত্র একজন পুরুষ ইউজারের নাম, ইমেইল ও জেন্ডার দেখাবে
db.test.findOne({ gender: "Male" }, { name: 1, email: 1, gender: 1 })

// সব পুরুষ ইউজারের নাম, ইমেইল ও জেন্ডার দেখাবে
db.test.find({ gender: "Male" }).project({ name: 1, email: 1, gender: 1 })

// যেসব ইউজারের gender "Male" সেই ডেটা খুঁজবে
db.test.find({ gender: { $eq: "Male" } })

// যেসব ইউজারের বয়স ৩০ বা তার বেশি, তাদের ডেটা বয়স অনুযায়ী ছোট থেকে বড় সাজাবে
db.test.find({ age: { $gte: 30 } }).sort({ age: 1 })

// যেসব ইউজারের বয়স ৩০ বা তার কম, তাদের ডেটা বয়স অনুযায়ী ছোট থেকে বড় সাজাবে
db.test.find({ age: { $lte: 30 } }).sort({ age: 1 })

// যাদের বয়স ৩০ এর কম, তাদের ডেটা বয়স অনুযায়ী ছোট থেকে বড় সাজাবে
db.test.find({ age: { $lt: 30 } }).sort({ age: 1 })

// মেয়ে ইউজারদের মধ্যে যাদের বয়স ১৮ থেকে ৩০ এর মধ্যে, তাদের বয়স ও জেন্ডার দেখাবে এবং বয়স অনুযায়ী ছোট থেকে বড় সাজাবে
db.test.find({ gender: "Female", age: { $gte: 18, $lte: 30 } }, { age: 1, gender: 1 }).sort({ age: 1 })

// মেয়ে ইউজারদের মধ্যে যাদের বয়স ৩০ বা ৩২, তাদের বয়স ও জেন্ডার দেখাবে এবং বয়স অনুযায়ী ছোট থেকে বড় সাজাবে
db.test.find({ gender: "Female", age: { $in: [30, 32] } }, { age: 1, gender: 1 }).sort({ age: 1 })

// মেয়ে ইউজারদের মধ্যে যাদের বয়স ৩০ বা ৩২ নয় এবং যাদের ইন্টারেস্ট "Cooking", তাদের দেখাবে
db.test.find({ gender: "Female", age: { $nin: [30, 32] }, interests: "Cooking" }, { age: 1, gender: 1, interests: 1 }).sort({ age: 1 })

// মেয়ে ইউজারদের মধ্যে যাদের বয়স ৩০ বা ৩২ নয় এবং ইন্টারেস্ট "Cooking" অথবা "Gaming", তাদের দেখাবে
db.test.find({ gender: "Female", age: { $nin: [30, 32] }, interests: { $in: ["Cooking", "Gaming"] } }, { age: 1, gender: 1, interests: 1 }).sort({ age: 1 })

// যাদের বয়স ১৫ নয় এবং বয়স ৩০ এর কম বা সমান, তাদের দেখাবে
db.test.find({ age: { $ne: 15, $lte: 30 } })

// মেয়ে ইউজারদের মধ্যে যাদের বয়স ১৫ নয় এবং ৩০ এর কম বা সমান, তাদের বয়স ও জেন্ডার দেখাবে এবং বয়স অনুযায়ী বড় থেকে ছোট সাজাবে
db.test.find({
    $and: [
        { gender: "Female" },
        { age: { $ne: 15 } },
        { age: { $lte: 30 } }
    ]
}).project({ age: 1, gender: 1 }).sort({ age: -1 })

// যেসব ইউজারের ইন্টারেস্ট "Writing" বা "Cooking", তাদের ইন্টারেস্ট দেখাবে এবং বয়স অনুযায়ী বড় থেকে ছোট সাজাবে
db.test.find({
    $or: [
        { interests: "Writing" },
        { interests: "Cooking" }
    ]
}).project({ interests: 1 }).sort({ age: -1 })

// যেসব ইউজারের skills এর মধ্যে "JAVASCRIPT" অথবা "C" আছে, তাদের skills দেখাবে
db.test.find({
    $or: [
        { "skills.name": "JAVASCRIPT" },
        { "skills.name": "C" }
    ]
}).project({ skills: 1 }).sort({ age: -1 })

// skills এর মধ্যে যাদের "JAVASCRIPT" অথবা "C" আছে, তাদের skills দেখাবে (আরও সংক্ষিপ্তভাবে)
db.test.find({ "skills.name": { $in: ["JAVASCRIPT", "C"] } }).project({ skills: 1 }).sort({ age: -1 })

// যেসব ডকুমেন্টে company ফিল্ড নেই, সেই ডেটা দেখাবে
db.test.find({ company: { $exists: false } })

// যেসব ইউজারের friends ফিল্ড একটি array টাইপের, সেই ডেটা দেখাবে
db.test.find({ friends: { $type: "array" } })

// যেসব ইউজারের company ফিল্ড null টাইপের, তাদের company দেখাবে
db.test.find({ company: { $type: "null" } }).project({ company: 1 })

// যেসব ইউজারের ইন্টারেস্ট "Cooking", তাদের ইন্টারেস্ট দেখাবে
db.test.find({ interests: "Cooking" }).project({ interests: 1 })

// যেসব ডকুমেন্টের interests array-র ৩য় (index 2) আইটেমটি "Cooking", শুধু সেই ডেটাগুলো দেখাবে
db.test.find({ "interests.2": "Cooking" }).project({ interests: 1 })

// যেসব ইউজারের interests array-তে "Cooking", "Writing" এবং "Reading" — এই তিনটি আইটেমই আছে, তাদের দেখাবে
db.test.find({
    interests: { $all: ["Cooking", "Writing", "Reading"] }
}).project({ interests: 1 })

// যেসব ইউজারের skills array-এর মধ্যে কোনো একটি object-এর name ফিল্ড "JAVASCRIPT", শুধু সেই ডেটাগুলো দেখাবে
db.test.find({
    "skills.name": "JAVASCRIPT"
}).project({ skills: 1 })

// যেসব ইউজারের skills array-র মধ্যে কোনো একটি object আছে যেটার name "JAVASCRIPT" এবং level "Intermidiate", তাদের দেখাবে
db.test.find({
    skills: {
        $elemMatch: {
            name: "JAVASCRIPT",
            level: "Intermidiate"
        }
    }
}).project({ skills: 1 })




