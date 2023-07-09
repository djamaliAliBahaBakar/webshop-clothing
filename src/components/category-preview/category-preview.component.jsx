import './category-preview-styles.scss'
import ProductCard from '../product-card/product-card.component'
import { Link } from 'react-router-dom'

const CategoryPreview = ({title,products}) => {
    return (
        <div className='category-preview-container'>
            <h2>
                    <Link className='title' to={title}>{title.toUpperCase()}</Link>
                <div className='preview'>
                    {
                        products.filter((_,idx) => idx < 4)
                        .map(product=>
                            <ProductCard key={product.id} product={product} />)
                    }
                </div>
            </h2>
        </div>
    )
}

export default CategoryPreview