import { Order } from "../Models/Order.js";





// // verify , save to db
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderlatest = new Order({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  })

 const orderConfirm =  await orderlatest.save();

  res.json({ message: "payment successfull..", success: true, orderConfirm });
};

// user specificorder
export const userOrder = async (req,res) =>{
  
  let userId = req.user._id.toString();
  // console.log(userId)
  
  let orders = await Order.find({ userId: userId }).sort({ createdAt :-1});
  res.json(orders)
}

// user specificorder
export const allOrders = async (req,res) =>{
 
  let orders = await Order.find().sort({ orderDate :-1});
  res.json(orders)
}