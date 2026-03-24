import { Component } from 'react'
import Product from '../product'
import './index.css'
import Header from '../Header'
import { TailSpin } from 'react-loader-spinner'
import Fotter from '../Fotter'
import Filters from '../FiltersComponent'
import { IoSearchOutline } from "react-icons/io5"
import { MdSort } from "react-icons/md"


const apiStatusConstant = {
    initial:'INITIAL',
    progress:'PROGRESS',
    success:'SUCCESS',
    failure:'FAILURE'
}

const categoriesList = [
    {
        id:1,
        category:'clothing',
        displayText:'Clothings',
    },
    {
        id:3,
        category:'beauty',
        displayText:'Beauty'
    },
    {
        id:2,
        category:'footwear',
        displayText:'Footwear'
    },
    {
        id:4,
        category:'watches',
        displayText:'Watches'
    },
    {
        id:5,
        category:'electronics',
        displayText:'Electronics'
    },
    {
        id:6,
        category:'smartphones',
        displayText:'Smart Phones'
    },
    {
        id:7,
        category:'sports equipment',
        displayText:'Sports Equipment'
    },
    {
        id:8,
        category:'fashion accessories',
        displayText:'Fashion Accessories'
    },
    {
        id:9,
        category:'fragrances',
        displayText:'Fragrances'
    },
    {
        id:10,
        category:'groceries',
        displayText:'Groceries'
    }
]

const priceSortList = [
    {
        id:'asc',
        priceLevel:'(Low-High)'
    },
    {
        id:'desc',
        priceLevel:'(High-Low)'
    },
]


class Products extends Component{

    state = {
        productsList:[],
        filteredList:[],
        selectedCategory:'All',
        userInput:'',
        apiStatus:apiStatusConstant.initial,
    }

    componentDidMount(){
        this.getProducts()
    }

    updateRating = (rating) => {
        return Math.round(rating * 10) / 10
    }


    getProducts = async () => {
        this.setState({apiStatus:apiStatusConstant.progress})
        let productsApi = `https://dummyjson.com/products?limit=0`
        const options = {method:'GET'}
        const fetchResponse = await fetch(productsApi, options)
        if(fetchResponse.ok){
            const fetchProducts = await fetchResponse.json()
            const modifiedData = fetchProducts.products.map(each => ({
                category:each.category,
                brand:each.brand,
                availibilityStatus:each.availibilityStatus,
                description:each.description,
                id:each.id,
                images:each.images,
                price:each.price,
                rating:this.updateRating(each.rating),
                title:each.title,
                reviews:each.reviews,
                tags:each.tags,
                isFavorite:false,
            }))
            const sortByDesc = modifiedData.sort((product1, products2) => product1.price - products2.price)
            this.setState({
                productsList:modifiedData,
                filteredList:sortByDesc,
                apiStatus:apiStatusConstant.success
            })
        }else{
            this.setState({
                apiStatus:apiStatusConstant.failure
            }) 
        }

    }


    changeIsFavoriteStatus = (id) => {
        this.setState(prevState => ({
            productsList:prevState.productsList.map(each => {
                if(each.id === id){
                    return {...each, isFavorite:!each.isFavorite}
                }else{
                    return each
                }
            })
        }))
    }

    getCategory = (category) => {
        const {productsList} = this.state
        const filterCategoryList = productsList.filter(each => each.tags.includes(category) || each.category === category)
        this.setState({selectedCategory : category , filteredList : filterCategoryList})
    }

    renderAllProducts = () => {
        const {filteredList} = this.state

        return (
                <ul className='products-list-container'>
                    {filteredList.map(each => (
                        <Product changeStatus={this.changeIsFavoriteStatus} productDetails={each} key={each.id}/>
                    ))}
                </ul>
        )
    }


    renderUI = () => {
        const {selectedCategory} = this.state

        return (
            <div className='filters-products-container'>
                <Filters 
                categories={categoriesList}
                getCategoryMethod={this.getCategory}
                userSelectedCategory={selectedCategory}
                />
                <div className='my-container'>
                    {this.rednerSearchInputAndSort()}
                    {this.renderUIByApiStatus()}
                </div>
            </div>
        )
    }

    getSortByValue = (e) => {
        const { filteredList } = this.state
        let sortedProducts = []
        if(e.target.value === 'asc'){
            sortedProducts = filteredList.sort((a, b) => a.price - b.price)
        }else{
            sortedProducts = filteredList.sort((a, b) => b.price - a.price)
        }

        this.setState({filteredList : sortedProducts})
    }

    getUserInput = (e) => {
        this.setState({userInput:e.target.value})
    }

    keyDownEvent = (e) => {
        const { userInput, productsList } = this.state
        if(e.key === 'Enter'){
            const filterSearchItems = productsList.filter(each => each.brand ===userInput || each.category.includes(userInput) || each.tags.includes(userInput) || each.title.toLowerCase().includes(userInput))
            this.setState({filteredList : filterSearchItems})
        }
    }

    onClickSearchIcon = () => {
        const { userInput, productsList } = this.state
        const filterSearchItems = productsList.filter(each => each.brand === userInput || each.category.includes(userInput) || each.tags.includes(userInput) || each.title.toLowerCase().includes(userInput))
        this.setState({filteredList : filterSearchItems})
    }

    rednerSearchInputAndSort = () => (
        <div className='search-and-sort-container'>
            <div className='search-product-inout-container'>
                <input onKeyDown={this.keyDownEvent} onChange={this.getUserInput} className='search-products-input' type='search' />
                <button onClick={this.onClickSearchIcon} className='search-button'><IoSearchOutline className='search-icon' /></button>
            </div>
            <div className='sort-container'>
                <div className='sort-name-icon-container'>
                    <MdSort className='sort-icon' />
                    <p className='sort-by'>sort by price</p>
                </div>
                <select onChange={this.getSortByValue} className='sort-container'>
                    {priceSortList.map(each => (
                        <option value={each.id} key={each.id}>{each.priceLevel}</option>
                    ))}
                </select>
            </div>
        </div>
    )


    renderLoadingView = () => (
        <div className='loading-container'>
            <TailSpin color='#0b69ff' height='40' width='40' />
        </div>
    )

    onClickRetry = () => (
        this.getProducts()
    )

    renderFailureView = () => (
        <div className='failure-container'>
            <img src='https://media.istockphoto.com/id/1279275963/vector/system-error-concept.jpg?s=612x612&w=0&k=20&c=c0IkhU0L53Jrvl2AombUcG1aI3-FnXa8f1oH-TMC5vM=' alt='error image' className='failure-image' />
            <h1 className='failure-heading'>Opps! Something Went Wrong</h1>
            <p className='failure-note'>We could't find your request. Please try Again</p>
            <button onClick={this.onClickRetry} className='re-try'>Retry</button>
        </div>
    )


    renderUIByApiStatus = () => {
        const {apiStatus} = this.state

        switch (apiStatus){
            case apiStatusConstant.progress:
                return this.renderLoadingView()
            case apiStatusConstant.success:
                return this.renderAllProducts()
            case apiStatusConstant.failure:
                return this.renderFailureView()
            default:
                return null
        }
    }


    render(){
        return(
        <>
           <Header />
            <>
               {this.renderUI()}
            </>
            <Fotter />
        </>
        )
    }
}

export default Products