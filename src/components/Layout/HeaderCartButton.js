import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import { useContext } from "react";
import CartContext from "../../store/cart-context";
const HeaderCartButton=props=>{
    const cartCtx=useContext(CartContext);
    const numberOfCartItems=cartCtx.items.reduce((curNumber,item)=>{return curNumber+item.amount},0);
    //transforms an array to a single value
return <button className={classes.button} onClick={props.onClick}>

    <span className={classes.icon}>
<CartIcon></CartIcon>
    </span>
    <span>
Your Cart
    </span>
    <span className={classes.badge}>
{numberOfCartItems}
    </span>
</button>
};
export default HeaderCartButton;