let mongoose = require('mongoose');
let mongooseConnection = require("../utils/database").getConnection();

let CompletedTableSchema = new mongoose.Schema(
    {
        price : {type : Number , required :true},
        qyt:{type : Number , required :true},
    },{
        collection : 'CompletedTable',timestamps: true
    }
);

module.exports = mongooseConnection.model('CompletedTable',CompletedTableSchema);
