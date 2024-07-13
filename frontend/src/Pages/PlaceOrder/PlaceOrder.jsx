import React,{useState,useContext, useEffect} from 'react'
// import { useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) =>{
    const name= event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  // checking purpose............
  // useEffect(()=>{
  //   console.log(data);
  // },[data])

  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    // console.log(orderItems);
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});

    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Pata nhi kaha galti kar raha hu");
    }
  }

  //...........................
  // const placeOrder = async (event) => {
  //   event.preventDefault();
    
  //   const orderItems = [];
  //   food_list.forEach((item) => {
  //     if (cartItems[item._id] > 0) {
  //       const itemInfo = { ...item, quantity: cartItems[item._id] };  // Create a new object to avoid mutating the original item
  //       orderItems.push(itemInfo);
  //     }
  //   });
  
  //   const orderData = {
  //     address: data,
  //     items: orderItems,
  //     amount: getTotalCartAmount() + 2,
  //   };
  
  //   try {
  //     const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      
  //     if (response.data.success) {
  //       const { session_url } = response.data;
  //       window.location.replace(session_url);
  //     } else {
  //       alert("Error occurred while placing the order.");
  //     }
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     alert("An unexpected error occurred. Please try again later.");
  //   }
  // };
  

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
       navigate('/cart')
    }
    else if(getTotalCartAmount===0){
       navigate('/cart')
    }
  },[token])


  
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
              <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'/>
              <input required  name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'/>
          </div>
                <input required  name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
                <input required  name='street' onChange={onChangeHandler} value={data.street}  type="text" placeholder='Street'/>
                <div className="multi-fields">
                    <input required  name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>  
                    <input required  name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
                </div>
                <div className="multi-fields">
                    <input required  name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>  
                    <input required  name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
                </div>
                <input required  name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
      </div>
      <div className="place-order-right">
         <div className="cart-total">
                <h2>Cart Totals</h2>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr/>
                <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>${getTotalCartAmount()===0 ? 0 : 2}</p>
                </div>
                <hr/>
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getTotalCartAmount()===0 ? 0 : getTotalCartAmount()+2}</b>
                </div>
                <button type='submit'>Proceed to Payment</button>
            </div>
      </div>
    </form>
  )
}

export default PlaceOrder