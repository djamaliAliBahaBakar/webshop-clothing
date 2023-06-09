import './product-card.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import { useContext } from 'react';
import { CartContext } from '../context/cart.context';

const ProductCard = ({product}) => {
    const {name,price,imageUrl} = product;
    const {addItemToCart} = useContext(CartContext)

   
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={()=> addItemToCart(product)}>Add to card</Button>
            </div>
        </div>
    )

}

export default ProductCard