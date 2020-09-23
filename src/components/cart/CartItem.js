import React from 'react';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../../icons';
import styles from './CartProducts.module.scss';
import { formatNumber } from '../../helpers/utility';
const CartItem = ({product, actions}) => {

    const { increase, decrease, removeProduct } = actions;

    return ( 
        <div className={styles.cartItem}>
            <div className={styles.imgWidth}>
                <img
                alt={product.name}
                style={{margin: "0 auto", maxHeight: "100px"}} 
                src={product.photo} className="img-fluid d-block"/>
            </div>
            <div className={styles.prodInfo}>
                <h5 className="mb-1">{product.name}</h5>
                <p className="mb-1">Price: {formatNumber(product.price)} </p>
                
            </div>
            <div className={styles.prodAction}>
            <p className="mb-0">Qty: {product.quantity}</p>
                 <button 
                 onClick={() => increase(product)}
                 className="btn btn-primary btn-sm mr-2 mb-1">
                     <PlusCircleIcon width={"20px"}/>
                 </button>

                 {
                     product.quantity > 1 &&
                     <button
                    onClick={() => decrease(product)}
                    className="btn btn-danger btn-sm mb-1">
                        <MinusCircleIcon width={"20px"}/>
                    </button>
                 }

                {
                     product.quantity === 1 &&
                     <button
                    onClick={() => removeProduct(product)}
                    className="btn btn-danger btn-sm mb-1">
                        <TrashIcon width={"20px"}/>
                    </button>
                 }
                 
            </div>
        </div>
     );
}
 
export default CartItem;