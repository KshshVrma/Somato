import React from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
const Header=(props)=>{
return <React.Fragment>
<header className={classes.header}>
    <h1>Somato</h1>
  <HeaderCartButton></HeaderCartButton>
</header>
<div className={classes['main-image']}>

    <img src={mealsImage} alt="a table full of food"/>
</div>
</React.Fragment>
};

export default Header;