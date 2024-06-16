let mongoose = require("mongoose");
let BuyerTable = require('../model/BuyerTable');
class Buyer{
    constructor(){

    }

    async getBuyerTable(req,res){
        return new Promise(async (resolve,reject)=>{
            try {
                 const tableData = await BuyerTable.find({});
                console.log("all the buyer table data:-",tableData);
                resolve(tableData);
            } catch (error) {
                console.log("error in finding all the buyer table data:-",error);
                reject(error);
            }
           

        }).catch((err)=>{
            console.log("(catch)error in finding all the buyer table data:-",err);
        })
    }

    async increaseBuyerTable(req , res){
        return new Promise(async(resolve , reject)=>{
            try {
                const { price, qty } = req.body;
                console.log("buyer:-",price , qty)
                // Check if an entry with the given price already exists
                const existingEntry = await BuyerTable.findOne({ price: price });
                console.log("existingEntry:-",existingEntry);
                if (existingEntry) {
                    console.log("hi inside existing entry block buyer")
                    // If the price already exists, increase the quantity
                    // existingEntry.qyt += parseInt(qty);\
                    let existingQyt = parseInt(existingEntry.qyt);
                    existingQyt = existingQyt + parseInt(qty)
                    existingEntry.qyt = existingQyt
                    await existingEntry.save();
                    console.log("Quantity increased in buyer table:", existingEntry);
                    resolve(existingEntry)
                } else {
                    // If the price does not exist, create a new entry
                    const newEntry = await BuyerTable.create({
                        price: price,
                        qyt: qty,
                    });
                    console.log("Entry created in buyer table:", newEntry);
                    resolve(newEntry);
                }
            } catch (error) {
                console.log("Error in creating the entry in buyer table:", error);
                reject(error);
            }}).catch((error) => {
                console.log("Error (catch) in creating the entry in buyer table:", error);
            });
    }
}

module.exports = new Buyer();