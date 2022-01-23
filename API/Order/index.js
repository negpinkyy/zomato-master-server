//libraries
import express from "express";
import passport from "passport";

//import database modal

import {OrderModel}  from "../../database/allModels";

//Router connections 
const Router = express.Router();

/**
 * Router     /Order
 * Des        /Get all Order based on particular _id
 * Params     /_id
 * Access     /private 
 * Method     /Get
 */
Router.get("/:_id", passport.authenticate("jwt"), async (req,res) =>{
   try{ const {_id} = req.params;
    const getOrders =  await OrderModel.findOne({user: _id});
    if(!getOrders){
    return res.status(400).json({error: "User not found"});
    }
    return res.status(200).json({orders: getOrders})
   }catch(error){
return res.status(500).json({error: error.message})
   }
});

/**
 * Router     /new
 * Des        /Add new orders
 * Params     /_id
 * Access     /Public 
 * Method     /POST
 */

Router.post("/new/:-id",  passport.authenticate("jwt"), async(req,res) =>{
    try{
const {_id} = req.params;
const {orderDetails} = req.body;
const addNewOrder = await OrderModel.findOneAndUpdate({
    user: -id,
},
{
$push:{orderDetails},
},
{
    new: true,
});

return res.json({order: addNewOrder})
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
})

export default Router;
