
import { createContext , useEffect, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
    //Find if cartItems contains productToAdd
    const found = cartItems.find(cartItem => productToAdd.id === cartItem.id)

    if (found) {
        return cartItems.map(cartItem=> cartItem.id === productToAdd.id?
            {...cartItem, quantity: cartItem.quantity +1}: cartItem)
    }
    return [...cartItems,{...productToAdd,quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
    //Find if cartItems contains productToAdd
    const found = cartItems.find(cartItem => productToRemove.id === cartItem.id)
    if (found.quantity > 1) {
        return cartItems.map(cartItem=> cartItem.id === productToRemove.id?
            {...cartItem, quantity: cartItem.quantity -1}: cartItem)
    } 
    
    return cartItems.filter(cartItem=>cartItem.id !== productToRemove.id)
}
    
const clearItem = (cartItems, productToRemove) => {
     return cartItems.filter(cartItem=>cartItem.id !== productToRemove.id)
}

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen : ()=>{},
    cartItems : [],
    addItemToCart : ()=>{},
    removeItem : ()=>{},
    cartcount : 0,
    removeItemToCart : ()=>{},
    totalPrice : 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartcount, setCartCount] = useState(0)
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((sum, cartItem)=> sum + cartItem.quantity,0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(()=>{
        const newTotal = cartItems.reduce((sum, cartItem)=> sum + (cartItem.quantity*cartItem.price),0)
        setTotal(newTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd))
    }

    const removeItemToCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems,productToRemove))
    }
    const removeItem = (productToRemove) => {
        setCartItems(clearItem(cartItems,productToRemove))
    }

    const value ={isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartcount,removeItemToCart, removeItem, total}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}