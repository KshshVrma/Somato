import React from 'react'
import classes from "./Cart.module.css"
import Modal from '../UI/Modal';
import { useContext,useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = (props) => {
const[isCheckout,setIsCheckOut]=useState(false);
const  [isSubmitting, setIsSubmitting] = useState(false);
const [didSubmit, setDidSubmit] = useState(false);
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


 const submitOrderHandler=async (userData)=>{
  setIsSubmitting(true);
await fetch('https://somato-ca457-default-rtdb.firebaseio.com/orders.json',{
    method:'POST',
    body:JSON.stringify({
      user:userData,
      orderedItems:cartCtx.items
    })
  });
  setIsSubmitting(false);
  setDidSubmit(true);

 };
    const cartItems=<ul 
    className={classes['cart-items']}>{cartCtx.items.map((item)=><CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}></CartItem>)}</ul>;
    const modalActions=   <div className={classes.action}>


            <button className={classes['button--alt']} onClick={props.onClose}>close</button>
            {hasItems&&<button className={classes.button}
            onClick={orderHandler}>Order</button>}
        </div>
        const cartModalContent=(<React.Fragment> {cartItems}
        <div className={classes.total}><span>
         Total Amount
        </span>
        <span>{totalAmount}</span>

        </div>

        {isCheckout&&<Checkout onConfirm={submitOrderHandler}onCancel={props.onClose}></Checkout>}

        {!isCheckout &&modalActions}
        </React.Fragment>)

        const isSubmittingModalContent=<p>Sending order data...</p>;
        const didSubmitModalContent=<p>successfully sent the order</p>
        
  return (
    <Modal onClose={props.onClose}>
{!isSubmitting &&!didSubmit&& cartModalContent}
{isSubmitting&&isSubmittingModalContent}
{didSubmit&&didSubmitModalContent}
     
    </Modal>
  )
};
export default Cart;