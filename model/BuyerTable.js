let mongoose = require('mongoose');
let mongooseConnection = require("../utils/database").getConnection();

let BuyerTableSchema = new mongoose.Schema(
    {
        price : {type :Number , required :[true , "Price is Required (Buyer)"] , unique:true},
        qyt:{type :Number , required :[true , "Qty is Required (Buyer)"]},
    },{
        collection : 'BuyerTable',timestamps: true
    }
);

module.exports = mongooseConnection.model('BuyerTable',BuyerTableSchema);