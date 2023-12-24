import {createContext, useContext, useEffect, useState} from 'react';

const CartContext=createContext();

const CartPovider=({children})=>{
    const [cart,setCart]=useState([]);
    useEffect(()=>{
        let existingCartItem=localStorage.getItem('cart');
        if(existingCartItem) setCart(JSON.parse(existingCartItem));
    },[]);
    return (
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    )
}

//custom hook
const useCart=()=>useContext(CartContext);

export {useCart,CartPovider};