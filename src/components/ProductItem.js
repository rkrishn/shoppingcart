import React from 'react';
import styles from './ProductsGrid.module.scss';
import { formatNumber } from '../helpers/utility';

const ProductItem = ({product, actions, cartItems}) => {

    const { addProduct, increase } = actions;

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }

    return ( 
        <div className={styles.card}>
            <img style={{display: "block", margin: "0 auto 10px", maxHeight: "200px"}} className="img-fluid" 
            src={product.photo + '?v=' + product.id} alt=""/>
            <p>{product.name}</p>
            <h3 className="text-left">{formatNumber(product.price)}</h3>
            <div className={styles.cardText}>
                {
                    isInCart(product) && 
                    <button 
                    onClick={() => increase(product)}
                    className="btn btn-outline-primary btn-sm">Add more</button>
                }

                {
                    !isInCart(product) && 
                    <button 
                    onClick={() => addProduct(product)}
                    className="btn btn-primary btn-sm">Add to cart</button>
                }
                
            </div>
        </div>
     );
}

export default ProductItem