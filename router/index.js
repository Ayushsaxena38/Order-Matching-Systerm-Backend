const express = require("express");
const router = express.Router();
const buyerController = require('../controller/buyerController');
const sellerController = require("../controller/sellerController");
const evaluation = require("../controller/evaluationController");
const completedTable = require("../model/completedTable");
router.get('/',(req , res)=>{
    return res.status(200).json({
        status:true
    })
})

router.get('/getData',async(req, res)=>{
    try {
        const buyerData = await buyerController.getBuyerTable(req , res);
        const sellerData = await sellerController.getSellerTable(req,res);
        const completedTableData = await completedTable.find({});
        return res.status(200).json({
            buyerData,
            sellerData,
            completedTableData,
            status : true
        })
    } catch (error) {
        console.log("(inside the index router)-error in getting data:-",error);
        return res.status(500).json({
            status:false,
            msg:"error in getting the data"
        });
    }
    
})

router.post('/addBuyer',async(req, res)=>{
    try {
        const entry = await buyerController.increaseBuyerTable(req, res);
        console.log("new entry in buyer table:-",entry);
        const buyerData = await buyerController.getBuyerTable(req , res);
        return res.status(200).json({
            status :true,
            buyerTableData:buyerData
        })
        
    } catch (error) {
        console.log("error in adding buyer table :-",error);
        return  res.status(500).json({
            status:false,
            msg:"error in adding the entry in buyer table"
        })
    }
})

router.post('/addSeller',async(req, res)=>{
    try {
        const entry = await sellerController.increaseSellerTable(req, res);
        console.log("new entry in Seller table:-",entry);
        const sellerData = await sellerController.getSellerTable(req , res);
        return res.status(200).json({
            status :true,
            SellerTableData:sellerData
        })
        
    } catch (error) {
        console.log("error in adding Seller table :-",error);
        return  res.status(500).json({
            status:false,
            msg:"error in adding the entry in Seller table"
        })
    }
})

router.post('/evaluate',async(req, res)=>{
    try {
        await evaluation.evaluate(req , res);
        const buyerData = await buyerController.getBuyerTable(req , res);
        const sellerData = await sellerController.getSellerTable(req , res);
        return res.status(200).json({
            staues:true,
            sellerData,
            buyerData
        })
    } catch (error) {
        
    }
})

module.exports = router;