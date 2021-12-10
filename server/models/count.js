const mongoose = require('mongoose');

const countSchema = mongoose.Schema({
    count: { type: Number, required: true , default: 0},
},
    { timestamps: true }
);

const countModel = mongoose.model("counts", countSchema);
module.exports = countModel;