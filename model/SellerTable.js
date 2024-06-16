let mongoose = require('mongoose');
let mongooseConnection = require("../utils/database").getConnection();

let SellerTableSchema = new mongoose.Schema(
    {
        price : {type :Number , required :[true , "Price is Required (Seller)"] , unique:true},
        qyt:{type :Number , required :[true , "Qty is Required (Seller)"]},
    },{
        collection : 'SellerTable',timestamps: true
    }
);

module.exports = mongooseConnection.model('SellerTable',SellerTableSchema);