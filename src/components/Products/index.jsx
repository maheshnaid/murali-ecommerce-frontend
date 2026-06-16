import { Component } from 'react'

import { TailSpin } from 'react-loader-spinner'
import { IoSearchOutline } from "react-icons/io5"
import { TbArrowsSort } from "react-icons/tb";

import Footer from '../FooterComponent'
import Filters from '../FiltersComponent'
import Product from '../product'
import Header from '../Header'

import './index.css'

const categoriesList = [
    {
        id:0,
        category:'all',
        displayText:'ALL',
    },
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

const apiStatusConstants = {
    initial:'INITIAL',
    progress:'PROGRESS',
    success:'SUCCESS',
    failure:'FAILURE'
}

class Products extends Component{

    state = {
        productsList:[],
        filterProducts:[],
        userInput:'',
        selectedCategory:'all',
        apiStatus:apiStatusConstants.initial,
        categoryStatus:false
    }


    componentDidMount(){
        this.getAllProducts()
    }

    updateRating = (rating) => {
        return Math.round(rating * 10) / 10
    }


    getAllProducts = async () => {
        this.setState({apiStatus:apiStatusConstants.progress})
        const {userInput} = this.state
        const api = `https://dummyjson.com/products/search?q=${userInput}&limit=194`
        const options = {
            method:'GET'
        }
        const response = await fetch(api, options)
        if(response.ok){
            const responseData = await response.json()
            const modifiedList = responseData.products.map(each => ({
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
                    discountPercentage:each.discountPercentage
            }))
            const sortByPrice = modifiedList?.sort((product1, products2) => product1.price - products2.price)
            this.setState({
                apiStatus:apiStatusConstants.success,
                productsList:modifiedList,
                filterProducts:sortByPrice
            })
        }else{
            this.setState({apiStatus:apiStatusConstants.failure})
        }
    }

    getSortByValue = (e) => {
        this.setState({categoryStatus:true})
        const { filterProducts } = this.state
        let sortedProducts = []
        
        setTimeout(() => {
            if(e.target.value === 'asc'){
                sortedProducts = filterProducts.sort((a, b) => a.price - b.price)
            }else{
                sortedProducts = filterProducts.sort((a, b) => b.price - a.price)
            }
            this.setState({filterProducts : sortedProducts, categoryStatus:false})
        },2000)
    }

    getUserInput = (e) => {
        this.setState({userInput:e.target.value}, this.getAllProducts)
    }

    rednerSearchInputAndSort = () => (
        <div className='search-and-sort-container'>
            <div className='search-product-inout-container'>
                <input onChange={this.getUserInput} className='search-products-input' type='search' />
                <button className='search-button'><IoSearchOutline className='search-icon' /></button>
            </div>
            <div className='sort-container'>
                <div className='sort-name-icon-container'>
                    <TbArrowsSort className='sort-icon' />
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


    renderAllProducts = () => {
        const {filterProducts, categoryStatus} = this.state

        return (
            <>
                {categoryStatus ?
                this.renderLoadingView() : 
                    <ul className='products-list-container'>
                        {filterProducts?.map(each => (
                            <Product productDetails={each} key={each.id}/>
                        ))}
                    </ul>
                }
            </>
        )
    }


    renderLoadingView = () => (
        <div className='products-loading-container'>
            <TailSpin color='#1a75ff' height='40' width='40' />
        </div>
    )

    onClickRetry = () => {
        this.getAllProducts()
    }


    renderFailureView = () => (
        <div className='failure-container'>
            <h1 className='failure-heading'>Opps! Something Went Wrong</h1>
            <p className='failure-note'>We could't find your request. Please try Again</p>
            <button onClick={this.onClickRetry} className='re-try'>Try Again</button>
        </div>
    )


    renderUIByApiStatus = () => {
        const {apiStatus} = this.state

        switch (apiStatus){
            case apiStatusConstants.progress:
                return this.renderLoadingView()
            case apiStatusConstants.success:
                return this.renderAllProducts()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            default:
                return null
        }
    }

    getCategory = (category) => {
        this.setState({categoryStatus:true})
        const {productsList} = this.state

        const filterCategoryList = productsList.filter(each => each.tags.includes(category) || each.category === category)
        
        setTimeout(() => {
            if(category === 'all'){
                this.setState({filterProducts:productsList})
            }else{
                this.setState({selectedCategory : category , filterProducts : filterCategoryList})
            }
            this.setState({categoryStatus:false})
        }, 2000)
        this.setState({selectedCategory: category})
    }

    renderUI = () => {
        const {selectedCategory} = this.state

        return (
            <div className='filters-products-container'>
                <div className='filters-container'>
                    <Filters
                    categories={categoriesList}
                    getCategoryMethod={this.getCategory}
                    userSelectedCategory={selectedCategory}
                    />
                </div>
                <div className='my-container'>
                    {this.rednerSearchInputAndSort()}
                    {this.renderUIByApiStatus()}
                </div>
            </div>
        )
    }


    render(){
        return(
            <>
            <Header />
                <>
                    {this.renderUI()}
                </>
                <Footer />
            </>
        )
    }
}


export default Products