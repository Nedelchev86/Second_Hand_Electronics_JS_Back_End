// const mongoose = require("mongoose");

// const electronicsSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     type: {
//         type: String,
//         required: true,
//     },
//     damages: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     production: {
//         type: Number,
//         required: true,
//     },

//     exploitation: {
//         type: Number,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     buyingList: [
//         {
//             type: mongoose.Types.ObjectId,
//             ref: "User",
//         },
//     ],
//     owner: {
//         type: mongoose.Types.ObjectId,
//         ref: "User",
//     },
// });

// const Electronics = mongoose.model("Electronics", electronicsSchema);

// module.exports = Electronics;

const mongoose = require("mongoose");

let electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        minLength: 2,
    },
    damages: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i,
    },
    description: {
        type: String,
        required: true,
    },
    production: {
        type: Number,
        required: true,
    },
    exploitation: {
        type: Number,
        required: true,
        minLength: 0,
    },
    price: {
        type: Number,
        required: true,
        minValue: 0,
    },
    buyingList: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

electronicsSchema.method("getBuying", function () {
    return this.buyingList.map((x) => x._id);
});

let Electronics = mongoose.model("Electronics", electronicsSchema);

module.exports = Electronics;
