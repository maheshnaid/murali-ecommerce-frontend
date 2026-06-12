import './index.css'

const Filters = (props) => {

    const renderCategories = () => {
        const {categories, getCategoryMethod, userSelectedCategory} = props

        const onClickCategory = (e) => {
            getCategoryMethod(e.target.value)
        }


        return (
            <div className='all-categories'>
                <h1 className='category-heading'>Categeries</h1>
                <select className='category-options' onChange={onClickCategory}>
                    {categories.map(each => (
                        <option value={each.category} key={each.id}>{each.displayText}</option>
                    ))}
                </select>
            </div>
        )
    }

    const renderCategoriesForSmallDevices = () => {
        const { categories, getCategoryMethod, userSelectedCategory } = props 

        const onClickCategory = (value) => {
            getCategoryMethod(value)
        }

        return (
            <ul className='small-device-category-container'>
                {categories.map(each => (
                    <li key={each.id}><button type='button' onClick={() => onClickCategory(each.category)} className={` ${userSelectedCategory === each.category ? 'selected-button' : 'unselected-button'}`}>{each.displayText}</button></li>
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