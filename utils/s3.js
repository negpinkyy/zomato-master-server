require("dotenv").config();
import AWS from "aws-sdk";


//S3 aws bucket;

const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: "ap-south-1"

});

//Utility functions

