import React from 'react';
import { Link } from "react-router-dom";
import {CartIcon, Logout} from '../icons';
import styles from './Header.module.scss';

const Header = ({itemCount, isUserLoggedIn, logout}) => {

    return ( 
        <header className={styles.header}>
            <span className={styles.headerLeft}>Ecart</span>
            <span className={styles.headerRight}>
                <Link to='/'>Store</Link>
                {isUserLoggedIn ?
                    <span>
                        <Link to='/cart'> <CartIcon/> Cart {itemCount} </Link>
                        <Link to='/'> <Logout/>
                        <span onClick={logout}>Logout</span> </Link>
                    </span>
                    :
                    <Link to='/login'> <CartIcon/>Login</Link>
                }
            </span>
        </header>
     );
}
 
export default Header;