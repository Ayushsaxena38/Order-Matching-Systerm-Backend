let mongoose = require("mongoose");
let SellerTable = require('../model/SellerTable');
class Seller{
    constructor(){

    }

    async getSellerTable(req,res){
        return new Promise(async (resolve,reject)=>{
            try {
                 const tableData = await SellerTable.find({});
                console.log("all the Seller table data:-",tableData);
                resolve(tableData);
            } catch (error) {
                console.log("error in finding all the Seller table data:-",error);
                reject(error);
            }
           

        }).catch((err)=>{
            console.log("(catch)error in finding all the Seller table data:-",err);
        })
    }

    async increaseSellerTable(req , res){
        return new Promise(async(resolve , reject)=>{
            try {
                const { price, qty } = req.body;
                console.log("seller ",price , qty)
                // Check if an entry with the given price already exists
                const existingEntry = await SellerTable.findOne({ price: price });
                console.log("existing entry:-",existingEntry);
                if (existingEntry) {
                    // If the price already exists, increase the quantity
                    // existingEntry.qyt += parseInt(qty);
                    let existingQyt = parseInt(existingEntry.qyt);
                    existingQyt = existingQyt + parseInt(qty)
                    existingEntry.qyt = existingQyt
                    await existingEntry.save();
                    console.log("Quantity increased in seller table:", existingEntry);
                    resolve(existingEntry);
                } else {
                    // If the price does not exist, create a new entry
                    const newEntry = await SellerTable.create({
                        price: price,
                        qyt: qty,
                    });
                    console.log("Entry created in seller table:", newEntry);
                    resolve(newEntry);
                }
            } catch (error) {
                console.log("Error in creating the entry in seller table:", error);
                reject(error);
            }}).catch((error) => {
                console.log("Error (catch) in creating the entry in seller table:", error);
            });
    }
}

module.exports = new Seller();