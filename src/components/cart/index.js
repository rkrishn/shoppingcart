import React from 'react';
import CartProducts from './CartProducts';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/productActions';
import { formatNumber } from '../../helpers/utility';
import Header from '../Header';
import Footer from '../Footer';
import styles from './CartProducts.module.scss';

class Cart extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        persons: []
      }
    }

    render() {
    const { clearCart,  handleCheckout } = this.props.actions;
    const { total, itemCount, checkout } = this.props;
    
    return ( 
        <div title="Cart" description="This is the Cart page" >
             <Header itemCount={itemCount} isUserLoggedIn={this.props.isUserLoggedIn} logout={this.props.actions.handleLogout}/>
            <div >
                <div className={styles.cardTextAlignCenter}>
                    <h1>Cart</h1>
                    <p>This is the Cart Page.</p>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className={styles.cardItem}>
                        {
                            this.props.cartItems.length > 0 ?
                            <CartProducts actions={this.props.actions} cartItems={this.props.cartItems}/> :
                            !checkout && 
                                <div className={styles.cardTextAlignCenter}>
                                    Your cart is empty
                                </div>
                            
                        }

                        { checkout && 
                            <div className="p-3 text-center text-success">
                                <p>Checkout successfull</p>
                                <Link to="/" className="btn btn-outline-success btn-sm">
                                    <span onClick={clearCart}>BUY MORE </span>
                                </Link>
                            </div>
                        }
                    </div>
                    {
                        this.props.cartItems.length > 0 && 
                        <div className={styles.cardItem}>
                            <div className={styles.cartTotalItems}>
                                <p className="mb-1">Total Items</p>
                                <h4 className=" mb-3 txt-right">{itemCount}</h4>
                            </div>
                            <div className={styles.cartTotalPrice}>
                                <p className="mb-1">Total Payment</p>
                                <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
                            </div>
                            <hr className="my-4"/>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary mb-2" onClick={handleCheckout}>CHECKOUT</button>
                                <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
            <Footer />
        </div>
    );
    }
}

function mapStateToProps(state, ownProps) {
    return {
      cartItems: state.CartReducer.cartItems,
      total: state.CartReducer.total, 
      itemCount: state.CartReducer.itemCount, 
      checkout: state.CartReducer.checkout,
      isUserLoggedIn: state.CartReducer.isUserLoggedIn,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(cartActions, dispatch)
    };
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));