import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order for frontend
// const placeOrder = async (req,res) => {

//     const frontend_url ="http://localhost:5174"
//     try{
//         const newOrder = new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address: req.body.address
//         })
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//         const line_items = req.body.items.map((item)=>({
//             price_data:{
//                 currency:"aud",
//                 product_data:{
//                     name:item.name
//                 },
//                 unit_amount:item.price*100
//             },
//             quantity:item.quantity
//         }))
//         line_items.push({
//             price_data:{
//                 currency:"aud",
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:2*100
//             },
//             quantity:1
//         })

//         const session = await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode:'payment',
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//         })

//         res.json({success:true,session_url:session.url})
//     }catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

//........................................

const placeOrder = async (req, res) => {
    const frontend_url = "https://food-delivery-frontend-ok8k.onrender.com";
    
    try {
        // Create new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();

        // Clear user's cart after order is saved
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe checkout session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "aud",  // Ensure this is the right currency
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Ensure price is in the smallest currency unit (cents)
            },
            quantity: item.quantity
        }));

        // Add delivery charge
        line_items.push({
            price_data: {
                currency: "aud",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 // 2 AUD in cents
            },
            quantity: 1
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Return session URL for frontend redirection
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);  // Improved error logging
        res.status(500).json({ success: false, message: "Order processing failed. Please try again later." });
    }
};


//....................................

// const verifyOrder = async (req,res) =>{
//     const {orderId,success} = req.body;
//     try{
//         if(success=="true"){
//             await orderModel.findByIdAndUpdate(orderId,{payment:true});
//             res.json({success:true,message:"Paid"})
//         }
//         else{
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success:false,message:"Not Paid"})
//         }
//     }catch(error){
//       console.log(error);
//       res.json({success:false,message:"Error"})
//     }
// }

//................................................

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required." });
        }

        if (success === true || success === "true") {
            // Mark order as paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful. Order marked as paid." });
        } else {
            // Delete order if payment failed
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed. Order deleted." });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ success: false, message: "Internal server error during order verification." });
    }
};

//.............................................

//user orders for frontend
const userOrders = async (req,res) => {
   try{
      const orders = await orderModel.find({userId:req.body.userId});
      res.json({success:true,data:orders})
   }catch(error){
      console.log(error);
      res.json({success:false,message:"Error"})
   }
}

//Listing orders for admin panel
const listOrders = async (req,res)=>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// api for updating order status
const updateStatus = async (req,res) =>{
   try{
       await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
       res.json({success:true,message:"Status Updated"})
   }catch(error){
       console.log(error);
       res.json({success:false,message:"Error"})
   }
}


export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}


//*********************************************************** */
