import React from 'react'
import classes from "./Cart.module.css"
import Modal from '../UI/Modal';
import { useContext,useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = (props) => {
const[isCheckout,setIsCheckOut]=useState(false)
 const cartCtx= useContext(CartContext);

 const cartItemRemoveHandler=(id)=>{
  cartCtx.removeItem(id);
 }
 const cartItemAddHandler=item=>{
  cartCtx.addItem({...item, amount: 1});

 }
 const orderHandler=()=>{
setIsCheckOut(true);
 }



 const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
 const hasItems=cartCtx.items.length>0


 const submitOrderHandler=(userData)=>{
  fetch('https://somato-ca457-default-rtdb.firebaseio.com/orders.json',{
    method:'POST',
    body:JSON.stringify({
      user:userData,
      orderedItems:cartCtx.items
    })
  });

 };
    const cartItems=<ul 
    className={classes['cart-items']}>{cartCtx.items.map((item)=><CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}></CartItem>)}</ul>;
    const modalActions=   <div className={classes.action}>


            <button className={classes['button--alt']} onClick={props.onClose}>close</button>
            {hasItems&&<button className={classes.button}
            onClick={orderHandler}>Order</button>}
        </div>
  return (
    <Modal onClose={props.onClose}>

        {cartItems}
        <div className={classes.total}><span>
         Total Amount
        </span>
        <span>{totalAmount}</span>

        </div>

        {isCheckout&&<Checkout onConfirm={submitOrderHandler}onCancel={props.onClose}></Checkout>}

        {!isCheckout &&modalActions}
     
    </Modal>
  )
}
export default Cart;