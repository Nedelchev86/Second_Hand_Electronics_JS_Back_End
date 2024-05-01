const electronics = require("../models/Electronics");

exports.create = (electronicsData) => {
    return electronics.create(electronicsData);
    };

exports.getAll = (electronicsData) => {
    return electronics.find({});
}