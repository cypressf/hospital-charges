var mongoose = require('mongoose');

var ChargeSchema = mongoose.Schema({
        "DRG Definition": String,
        "Provider Id": Number,
        "Provider Name": String,
        "Provider Street Address": String,
        "Provider City": String,
        "Provider State": String,
        "Provider Zip Code": Number,
        "Hospital Referral Region Description": String,
        "Total Discharges": Number,
        "Average Covered Charges": Number,
        "Average Total Payments": Number
});

module.exports = mongoose.model('Charge', ChargeSchema);