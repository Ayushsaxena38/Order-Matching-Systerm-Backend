const BuyerTable =  require( "../model/BuyerTable");//es6 module
const  SellerTable = require("../model/SellerTable");//es6 module
const  buyerController = require("./buyerController");
const sellerController = require('./sellerController');
const completedTable = require("../model/completedTable");
class evaluate{
    constructor(){

    }
    async evaluate(req , res){
        return new Promise(async (resolve, reject) => {
            try {
                // First take all the data from buyer table and seller table
                const buyerData = await buyerController.getBuyerTable(req, res);
                const sellerData = await sellerController.getSellerTable(req, res);
    
                for (const sellerEntry of sellerData) {
                    // Check whether sellerEntry's price matches any buyerEntry's price
                    for (const buyerEntry of buyerData) {
                        if (sellerEntry.price === buyerEntry.price) {
                            // If quantities are equal
                            if (sellerEntry.qyt === buyerEntry.qyt) {
                                console.log("inside the same qty block-------------------------------------")
                                // Add the entry in completed table
                                await completedTable.create({
                                    price: sellerEntry.price,
                                    qyt: sellerEntry.qyt,
                                });
                                // Remove the entry from seller table and buyer table
                                await SellerTable.deleteOne({ _id: sellerEntry._id });
                                await BuyerTable.deleteOne({ _id: buyerEntry._id });
                            }
                            // If seller quantity is greater than buyer quantity
                            else if (sellerEntry.qyt > buyerEntry.qyt) {
                                // Add the entry in completed table
                                await completedTable.create({
                                    price: sellerEntry.price,
                                    qyt: buyerEntry.qyt,
                                });
                                // Update the seller entry quantity
                                await SellerTable.updateOne(
                                    { _id: sellerEntry._id },
                                    { $inc: { qyt: -buyerEntry.qyt } }
                                );
                                // Remove the buyer entry from the buyer table
                                await BuyerTable.deleteOne({ _id: buyerEntry._id });
                            }
                            // If buyer quantity is greater than seller quantity
                            else if (sellerEntry.qyt < buyerEntry.qyt) {
                                // Add the entry in completed table
                                await completedTable.create({
                                    price: sellerEntry.price,
                                    qyt: sellerEntry.qyt,
                                });
                                // Update the buyer entry quantity
                                await BuyerTable.updateOne(
                                    { _id: buyerEntry._id },
                                    { $inc: { qyt: -sellerEntry.qyt } }
                                );
                                // Remove the seller entry from the seller table
                                await SellerTable.deleteOne({ _id: sellerEntry._id });
                            }
                        }
                    }
                }
                resolve("Evaluation completed successfully");
            } catch (error) {
                console.error("Error during evaluation:", error);
                reject(error);
            }
        });
    }
}

module.exports = new evaluate();