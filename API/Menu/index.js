//libraries
import express from 'express'

//database model
import { MenuModel, ImageModel } from '../../database/allmodels';

//Router
const Router = express.Router();

/**
 * Router      /list
 * Des        /get all images based on restaurant id
 * Params     /-id
 * Access     /Public 
 * Method     /Get
 */

Router.get("/list/:-id", async (req, res) => {
    try {
        const { _id } = req.params;
        const menus = await MenuModel.findById(_id);

        if (!menus) {
            res.status(404).json({ error: "No menu present for this restaurant" });

        }
        return res.json({ menus })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

/**
 * Router      /image
 * Des        /get all list of menu based on images id
 * Params     /-id
 * Access     /Public 
 * Method     /Get
 */

Router.get('/image/:id', async(req,res) =>{
    try{
 const {_id} = req.params;
 const menuImages = await ImageModel.findOne(_id);


 if (!menuImages) {
    res.status(404).json({ error: "No menu present for this restaurant" });

}

 return res.json({menuImages})
    }catch(error){
    return res.status(500).json({error: error.message})
     }
})



export default Router