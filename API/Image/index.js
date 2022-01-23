//libraries
import express from "express";
import multer from "multer";

//database Modal

import { ImageModel } from "../../database/allmodels";
const Router = express.Router();

//Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });


//utility function;

import { s3Upload } from '../../utils/s3';



/**
 * Router     /r
 * Des        /Uploads given images to s3 Bucket and save file  to mongodb
 * Params     /none
 * Access     /Public 
 * Method     /POST
 */

Router.post("/", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        //s3 buckets options

        const bucketOptions = {
            Bucket: "zomatopro",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"    //  access control list
        };



        const upLoadImage = await s3Upload(bucketOptions);
        const saveImageToDataBase = await ImageModel.create({ images: [{ location: upLoadImage.location }], });

        return res.status(200).json( saveImageToDataBase )

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



export default Router;
