import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Cart.css'

const Cart = () => {

  const {cartItems, food_list, removeFromCart, cartTotal, currencySymbol, currencyMultiplier} = useContext(StoreContext)

  const convert = (amount) => {
    return (amount*currencyMultiplier).toFixed(2);
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index)=>{
          if(cartItems[item._id]>0){
            return(
              < div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{currencySymbol}{convert(item.price)}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{currencySymbol}{convert(item.price*cartItems[item._id])}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div> 
      <div className="cart-bottom">
        <div className="cart-bottom-container">
          <h4>Items total</h4>
          <p>{}{currencySymbol}{convert(cartTotal())}</p>
        </div>
        <div className="cart-bottom-container">
          <h4>Delivery Charge</h4>
          <p>{currencySymbol}{cartTotal()>0?convert(2):0}</p>
        </div>
        <hr />
        <div className="cart-bottom-container">
          <h4>Grand Total</h4>
          <p>{currencySymbol}{cartTotal()>0?convert(cartTotal()+2):0}</p>
        </div>
      </div>
    </div>
  )
}

export default Cart