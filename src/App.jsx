import {BrowserRouter,Route, Switch, Redirect} from 'react-router-dom'
import { Component } from 'react'

import './index.css'

import cartContext from './context/cartContext'
import ProtectedRoute from './components/protectedRoute'
import Home from './components/HomeComponent'
import WishList from './components/WishlistComponent'
import Cart from './components/CartComponent'
import NotFound from './components/NotFound'
import LoginPage from './components/login'
import Signup from './components/singin'
import Products from './components/Products'
import SpecificProduct from './components/specificProduct'
import PaymentComponent from './components/Payment'

class App extends Component{

    state = {
        cartList:[],
        wishList:[],
        allSelected:true,
    }


    addToCart = (data, itemQuantity) => {
        const {cartList} = this.state
        const findObj = cartList.find(each => each.id === data.id)
        if(findObj === undefined){
            const newObj = {...data, quantity:itemQuantity, isSelected:true}
            this.setState(prevState => ({
                cartList:[...prevState.cartList, newObj],
            }))
        }else{
            this.setState(prevState => ({
                cartList:prevState.cartList.map(each => {
                    if(each.id === data.id){
                        return {...each, quantity: each.quantity + itemQuantity}
                    }
                    return each
                })
            }))
        }
    }

    removeFromCart = (itemId) => {
        const {cartList} = this.state
        const filteredList = cartList.filter(each => each.id !== itemId)
        this.setState({cartList:filteredList})
    }

    clearCart = () => {
        this.setState({cartList:[]})
    }

    placeOrder = () => {
        const {cartList} = this.state
        const newCartList = cartList.filter(each => each.isSelected === false)
        this.setState({cartList:newCartList})
    } 


    changeAllSelectedStatus = () => {
        const {allSelected} = this.state
        this.setState(prevState => ({
            allSelected:!prevState.allSelected,
            cartList:prevState.cartList.map(each => {
                if(allSelected){
                    return {...each, isSelected:false}
                }
                return {...each, isSelected:true}
            })
        }))
    }

    changeCheckboxStatus = (Id) => {
        this.setState(prevState => ({
            cartList:prevState.cartList.map(each => {
                if(each.id === Id){
                    return {...each, isSelected:!each.isSelected}
                }else{
                    return each
                }
            })
        }))
    }

    deCreaseProductQuantity = (productId) => {
        const {cartList} = this.state
        const findObj = cartList.find(each => each.id === productId)
        this.setState(prevState => ({
            cartList:prevState.cartList.map(each => {
                if(each.id === productId && findObj.quantity > 1){
                    return {...each, quantity:each.quantity - 1}
                }else{
                    return each
                }
            })
        }))
    }

    inCreaseProductQuantity = (productId) => {
        this.setState(prevState => ({
            cartList:prevState.cartList.map(each => {
                if(each.id === productId){
                    return {...each, quantity:each.quantity + 1}
                }else{
                    return each
                }
            })
        }))
    }

    addToWishList = (data) => {
        const {wishList} = this.state
        const item = wishList.find(each => each.id === data.id)
        if(item === undefined){
            this.setState(prevState => ({
                wishList:[...prevState.wishList, data]
            }))
        }else{
            const filterlist = wishList.filter(each => each.id !== data.id)
            this.setState(prevState => ({
                wishList:filterlist
            }))
        }
    }

    addToCartFromWishlist = (data, quantity) => {
        const {cartList, wishList} = this.state
        const newWishList = wishList.filter(each => each.id !== data.id)
        const findItem = cartList.find(each => each.id === data.id)
        const newItem = {...data, quantity:1, isSelected:true}

        if(findItem === undefined){
            this.setState(prevState => ({
                cartList:[...prevState.cartList, newItem]
            }))
        }else{
            this.setState(prevState => ({
                cartList:prevState.cartList.map(each => {
                    if(each.id === data.id){
                        return {...each, quantity:each.quantity + quantity}
                    }
                    return each
                })
            }))
        }

        this.setState({wishList:newWishList})

    }

    removeFromWishList = (removeId) => {
        const {wishList} = this.state
        const filteredWishlist = wishList.filter(each => each.id !== removeId)
        this.setState({wishList:filteredWishlist})
    }

    clearWishList = () => {
        this.setState({wishList:[]})
    }

    render(){
        const {cartList, allSelected, wishList} = this.state
        console.log(wishList)
        return(
            <cartContext.Provider value={{
                cartList,
                wishList,
                allSelected,
                addToCart: this.addToCart,
                removeFromCart: this.removeFromCart,
                addToWishList:this.addToWishList,
                removeFromWishList:this.removeFromWishList,
                addToCartFromWishlist: this.addToCartFromWishlist,
                deCreaseProductQuantity: this.deCreaseProductQuantity,
                inCreaseProductQuantity: this.inCreaseProductQuantity,
                clearCart: this.clearCart,
                clearWishList:this.clearWishList,
                changeCheckboxStatus: this.changeCheckboxStatus,
                changeAllSelectedStatus: this.changeAllSelectedStatus,
                placeOrder:this.placeOrder
            }}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/login' component={LoginPage} />
                        <Route exact path='/signup' component={Signup} />
                        <ProtectedRoute exact path='/' component={Home} />
                        <ProtectedRoute exact path='/products' component={Products} />
                        <ProtectedRoute exact path='/products/:id' component={SpecificProduct} />
                        <ProtectedRoute exact path='/wishlist' component={WishList} />
                        <ProtectedRoute exact path='/cart' component={Cart} />
                        <ProtectedRoute exact path='/success' component={PaymentComponent} />
                        <Route path='/not-fount' component={NotFound} />
                        <Redirect to='/not-found' />
                    </Switch>
                </BrowserRouter>
            </cartContext.Provider>
        )
    }
}

export default App