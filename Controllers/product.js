import { Products } from "../Models/Product.js";
import nodemailer from 'nodemailer';
import http from 'http'
export const addProduct = async (req,res) =>{
    const {title,description,price,category,qty,imgSrc} = req.body
    try {
        let product = await Products.create({
          title,
          description,
          price,
          category,
          qty,
          imgSrc,
        });
        res.json({message:'Product added successfully...!',product})
        
    } catch (error) {
        res.json(error.message)
    }
}

// get products
export const getProducts = async (req,res) =>{

    let products = await Products.find().sort({createdAt:-1})
    res.json({message:'All products',products})
  }
  
  // find product by id
  export const getProductById = async (req, res) => {
   try {
    const id = req.params.id;
    
    const product = await Products.findById(id)
    // console.log(id)
  if(!product) return res.json({message:'Invalid Iddd'})
  res.json({ message: "Specific product", product });
    
   } catch (error) {
    console.log(error)
   }
};

// update product by id
export const updateProductById = async (req, res) => {
    const id = req.params.id;
  let product = await Products.findByIdAndUpdate(id,req.body,{new:true})
  if(!product) return res.json({message:'Invalid Id'})
  res.json({ message: "Product has been updated", product });
};

// delete product by id
export const deleteProductById = async (req, res) => {
    const id = req.params.id;
  let product = await Products.findByIdAndDelete(id)
  if(!product) return res.json({message:'Invalid Id'})
  res.json({ message: "Product has been deleted", product });
}; 

//send email

export const sendEmail = async(req , res)=>{
  
  const { name, email, transactionId } = req.body;

  
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "palash.tinkhede8124@gmail.com",
            pass: "jysezzjfwmldhidq"

        }
    });

    // const receiver1 = {
    //     from : "palash.tinkhede8124@gmail.com",
    //     to : email,
    //     subject : "no-reply conformation mail",
    //     text : `this is conformation mail to conform the order with transtaion id ${transactionId}`
    // };

    // auth.sendMail(receiver1, (error, emailResponse) => {
    //     if(error)
    //     throw error;
    //     console.log("success!");
    //     response.end();
    // });

    const receiver2 = {
        from : "palash.tinkhede8124@gmail.com",
        to : "palash.tinkhede@gmail.com",
        subject : "no-reply order placed mail",
        text : `this is conformation of the order with transtaion id ${transactionId}`
    };
console.log("helo")
    auth.sendMail(receiver2, (error, emailResponse) => {
        if(error)
        throw res.status(502);
        console.log("success!");
        response.end();
    });
    


  
res.status(200).json({message : "sucess"});
};