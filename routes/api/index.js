var Charge = require('../../models/charge.js');

// Send instructions on how to use the API
exports.instructions = function(req, res) {
    message = {
        "resources": {
            "charges": {
                "url": "https://hospital-charges.herokuapp.com/api/charges"
            }
        }
    }
    res.send(message);
}

// Send a list of charges, matching the given filters
exports.charges = function(req, res) {
    var callback = function(err, charges) {
        if (!err) {
            return res.send(charges);
        } else {
            return console.log(err);
        }
    };
    Charge
        .find()
        .sort({'Average Total Payments': -1})
        .limit(20)
        .exec(callback);
}