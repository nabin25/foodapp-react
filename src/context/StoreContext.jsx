import { useState } from "react";
import { createContext } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [currencyMultiplier, setCurrencyMultiplier] = useState(1);

    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems(prev => ({...prev,[itemId]:1}))
        }
        else{
            setCartItems(prev => ({...prev, [itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => ({...prev, [itemId]:prev[itemId]-1}))
    }

    const cartTotal = () => {
        let total = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id===item)
                total = total+= itemInfo.price*cartItems[item];
            }
        }
        return total;
    }
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        cartTotal,
        currencySymbol,
        setCurrencySymbol,
        currencyMultiplier,
        setCurrencyMultiplier
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider