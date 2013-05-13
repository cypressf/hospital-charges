var Charge = require("../models/charge"),
    csv = require("csv"),
    fs = require('fs'),
    path = require('path'),
    filename = path.join(__dirname, 'Medicare_Provider_Charge_Inpatient_DRG100_FY2011.csv');

// Import everything from csv to database
exports.csv_to_database = function() {
    var create_charge = function(record) {
        var charge = new Charge({
            "DRG Definition": record["DRG Definition"],
            "Provider Id": record["Provider Id"],
            "Provider Name": record["Provider Name"],
            "Provider Street Address": record["Provider Street Address"],
            "Provider City": record["Provider City"],
            "Provider State": record["Provider State"],
            "Provider Zip Code": record["Provider Zip Code"],
            "Hospital Referral Region Description": record["Hospital Referral Region Description"],
            "Total Discharges": Number(record["Total Discharges"]),
            "Average Covered Charges": Number(record["Average Covered Charges"]),
            "Average Total Payments": Number(record["Average Total Payments"])
        });
        charge.save(function(err, charge) {
            if (err) {
                console.log(err);
            }
            console.log("Charge from", charge["Provider Name"], "saved");
        });
    };

    csv()
        .from(filename, {columns: true})
        .on('record', function(record){create_charge(record);} );
}

// Takes an array of field names, and re-imports those columns from the csv
// to the database.
// e.g. fields = ["Provider State", "Average Total Payments"]
exports.reload_fields = function(fields) {
    var i;
    var length;
    var change_charge = function(err, charges) {
        if (charges.length > 1) {
            console.log("There was more than one charge found.");
            console.log(charges)
            return;
        }
        var charge = charges[0];
        for (i = 0, length = fields.lengh; i < length; i++) {
            charge[fields[i]] = record[fields[i]];
        }
        charge.save(function(err, charge) {
            if (err) {
                console.log(err);
            }
            console.log("Charge from", charge["Provider Name"], "saved");
            for (i = 0, length = fields.lengh; i < length; i++) {
                console.log(fields[i], charge[fields[i]]);
            }
        });
    };

    csv()
        .from(filename, {columns: true})
        .on('record', function(record) {
            Charge
                .find({
                    "Provider Id": Number(record["Provider Id"]),
                    "DRG Definition": record["DRG Definition"]
                })
                .exec(function(err, charges) {
                    change_charge(err, charges);
                });
        });
}

// Delete all the charges from the database
exports.remove_all = function() {
    Charge.find().remove(function(err, charge) {console.log("removed", charge);});
}