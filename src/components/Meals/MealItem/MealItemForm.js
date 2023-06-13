
import React from 'react'
import classes from './MealItemForm.module.css'
import { Input } from '../../UI/Input'
export const MealItemForm = (props) => {
  return (
  <form className={classes.form}>

    <Input label="ammount" input={{id:'amount', type:'number',
min:'1',max:'5',step:'1',defaultValue:'1'}}/>
    <button>+  Add</button>
  </form>
  )
}
