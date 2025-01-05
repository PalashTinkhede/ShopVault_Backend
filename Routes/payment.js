import express from 'express'
import {
  verify,
  userOrder,
  
  allOrders,
} from "../Controllers/payment.js";
import {Authenticated} from '../Middlewares/auth.js'

const router = express.Router();

// // checkout

// // verify-payment & save to db
router.post('/verify-payment',verify)

// // user order
router.get("/userorder",Authenticated, userOrder);

// // All order's
router.get("/orders", allOrders);




export default router