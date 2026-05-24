import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Products } from './Models/Product.js';

dotenv.config();

const updateImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "MERN_E_Commerce" });
        console.log("Connected to MongoDB...");

        const products = await Products.find({});
        let updatedCount = 0;

        for (let p of products) {
            // Check if it has the old Unsplash Source URL
            if (p.imgSrc && p.imgSrc.includes('source.unsplash.com')) {
                // Extract the keyword and the index
                // From: https://source.unsplash.com/600x600/?macbook&v=0
                const parts = p.imgSrc.split('?')[1].split('&v=');
                const keyword = parts[0];
                const index = parts[1] || Math.floor(Math.random() * 100);

                // Replace with LoremFlickr which actively supports keywords
                p.imgSrc = `https://loremflickr.com/600/600/${keyword}?lock=${index}`;
                await p.save();
                updatedCount++;
            }
        }

        console.log(`Updated ${updatedCount} product images beautifully. Check your frontend now (refresh the page)!`);
        process.exit();
    } catch (err) {
        console.error("Error updating images:", err);
        process.exit(1);
    }
}

updateImages();
