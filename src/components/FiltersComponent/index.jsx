import './index.css'

const Filters = (props) => {

    const renderCategories = () => {
        const {categories, getCategoryMethod, userSelectedCategory} = props

        const onClickCategory = (category) => {
            getCategoryMethod(category)
        }


        return (
            <div className='all-categories'>
                <h1 className='category-heading'>Categeries</h1>
                <ul className='categories-container'>
                    {categories.map(each => (
                        <li  onClick={() => onClickCategory(each.category)} className={`category-item ${userSelectedCategory === each.category ? 'selected' : 'not-selected'}`} key={each.id}>{each.displayText}</li>
                    ))}
                </ul>
            </div>
        )
    }

    const renderCategoriesForSmallDevices = () => {
        const { categories, getCategoryMethod, userSelectedCategory } = props 

        const onClickCategory = (category) => {
            getCategoryMethod(category)
        }

        return (
            <ul className='small-device-category-container'>
                {categories.map(each => (
                    <li key={each.id}><button onClick={() => onClickCategory(each.category)} className={`category-button ${userSelectedCategory === each.category ? 'selected-button' : 'unselected-button'}`}>{each.displayText}</button></li>
                ))}
            </ul>
        )
    }

    return (
        <div className='div'>
            {renderCategories()}
            {renderCategoriesForSmallDevices()}
        </div>
    )
}

export default Filters