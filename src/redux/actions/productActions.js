import {store} from "../index";
import t from '../../redux/types/productTypes'
import axios from "axios";

export const getProducts = () => {
    return (dispatch) => {
        axios("https://gist.githubusercontent.com/juravlevdima/b239931140d1c3ae402a87b130f2caa6/raw/2aeee347830d20ec0720293d32905b0ae359526c/food.json")
            .then(({data}) => dispatch({type: t.GET_PRODUCTS, products: data}))
    }
}

export const addToCart = (product) => {
    const cart = {...store.getState()?.products.cart}
    let newCart
    if (cart[product.id]) {
        newCart = {...cart, [product.id]: {...product, count: cart[product.id].count + 1}}
    } else {
        newCart = {...cart, [product.id]: {...product, count: 1}}
    }
    localStorage.setItem('cart', JSON.stringify(newCart))
    return {type: t.UPDATE_CART, cart: newCart}
}
export const deleteFromCart = (product) => {
    let cart = {...store.getState()?.products.cart}
    if (cart[product.id] && cart[product.id].count > 1 ) {
        cart = {...cart, [product.id]: {...product, count: cart[product.id].count - 1}}
    } else {
        delete cart[product.id]
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    return {type: t.UPDATE_CART, cart: cart}
}
export const deleteFromAllCart = (id) => {
    let cart = {...store.getState()?.products.cart}
    delete cart[id]
    localStorage.setItem('cart', JSON.stringify(cart))
    return {type: t.UPDATE_CART, cart}
}

export const clearCart = () => {
    localStorage.removeItem('cart')
    return {type: t.UPDATE_CART, cart: {}}
}

export const getRates = () => {
    return (dispatch) => {
        axios("https://api.exchangerate.host/latest?base=USD&symbols=KGS,RUB,USD")
            .then(({data}) => dispatch({type: t.GET_RATES, rates: data.rates}))
    }
}

export const changeRate = (rate) => {
    return {type: t.CHANGE_RATE, current: rate}
}

export const sortByPrice = () => {
   return (dispatch, getState) => {
       const store = getState()
       const {sortByPrice, products, cart} = store.products
       let sortedProducts
       let sortedCart
       if (sortByPrice > 0) {
           sortedProducts = products.sort((a,b) => a.price - b.price)
           sortedCart = Object.fromEntries(Object.entries(cart).sort((a,b) => a[1].price - b[1].price))
       } else {
           sortedProducts = products.sort((a,b) => b.price - a.price)
           sortedCart = Object.fromEntries(Object.entries(cart).sort((a,b) => b[1].price - a[1].price))
       }
       dispatch({type: t.CHANGE_SORT, products: sortedProducts, cart: sortedCart})
   }
}
export const sortByTitle = () => {
    return (dispatch, getState) => {
        const store = getState()
        const {sortByTitle, products, cart} = store.products
        let sortedProducts
        let sortedCart
        if (sortByTitle > 0) {
            sortedProducts = products.sort((a,b) => a.title.localeCompare(b.title))
            sortedCart = Object.fromEntries(Object.entries(cart).sort((a,b) => a[1].title.localeCompare(b[1].title)))
        } else {
            sortedProducts = products.sort((a,b) => b.title.localeCompare(a.title))
            sortedCart = Object.fromEntries(Object.entries(cart).sort((a,b) => b[1].title.localeCompare(a[1].title)))
        }

        dispatch({type: t.CHANGE_SORT_TITLE, products: sortedProducts, cart: sortedCart})
    }
}
export const searchInput = (searchText) => {
    return {type: t.SEARCH_VALUE, searchValue: searchText}
}