import React from 'react';
import ProductItem from './ProductItem';
import styles from './ProductsGrid.module.scss';

const ProductsGrid = ({ products, actions, cartItems, searchItem }) => {

    return ( 
        <div className={styles.container}>
            <div className="row">
                <div className={styles.headerCont}>
                    <div className={styles.products}>
                        {products.length} Products
                    </div>
                    <div className={styles.searchBox}>
                        <input type="text" name="" onChange={searchItem} placeholder="Search product" className="form-control" id=""/>
                    </div>
                </div>
            </div>
            <div className={styles.p__grid}>

                {
                    products.map(product => (
                        <ProductItem key={product.id} product={product} actions={actions} cartItems={cartItems}/>
                    ))
                }

            </div>
        </div>
     );
}
 
export default ProductsGrid;