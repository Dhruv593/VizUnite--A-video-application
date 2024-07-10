import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import { response } from 'express';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        //upload file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // successfully uploaded
        // fs.unlinkSync(localFilePath)
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return response
    } catch (error) {
        // fs.unlinkSync(localFilePath)
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }  // remove the locally saved temporary file as the upload operations got failed
        return null
    }
}


export {uploadOnCloudinary}