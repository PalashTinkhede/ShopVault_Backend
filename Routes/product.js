import express from 'express'
import { addProduct, deleteProductById, getProductById, getProducts, sendEmail, updateProductById } from '../Controllers/product.js';

const router = express.Router();

// add product
router.post('/add',addProduct)

// get product
router.get('/all',getProducts)

// get product by Id
router.get('/:id',getProductById)

// update product by Id
router.put('/:id',updateProductById)

// delete product by Id
router.delete('/:id',deleteProductById)

//send email
router.post("/email", sendEmail);


export default router