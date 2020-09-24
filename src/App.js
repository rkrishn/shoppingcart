import React, { useState, useEffect } from 'react';
import './App.css';
import ProductsGrid from './components/ProductsGrid';
import Header from './components/Header';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import { handleLogout } from './actions/productActions';
import axios from 'axios';

const App =() => {

  const [products, setProducts] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const { cartItems, isUserLoggedIn } = useSelector(state => ({
    cartItems: state.CartReducer.cartItems,
    isUserLoggedIn: state.CartReducer.isUserLoggedIn,
  }));

  useEffect(() => {
    axios.get(`http://localhost:3000/Products`)
    .then(res => {
      setProducts(res.data);
    })
  },[]);

  const onSearchItem = (evt) => {
    const searchString = evt.target.value;
    setSearchString(searchString);
  }

  useEffect(() => {
    setFilteredItems([]);
    if(searchString.length > 0) {
      const filteredItems = products.filter(function(l){
          return l.name.toLowerCase().match( searchString );
      });
      setFilteredItems(filteredItems);
    }
  },[searchString]);

  return (
    <div className="App">
      <Header itemCount={cartItems.length} isUserLoggedIn={isUserLoggedIn} logout={handleLogout}/>
        <ProductsGrid products={filteredItems.length>0 ? filteredItems: products} cartItems={cartItems} searchItem={onSearchItem}/>
      <Footer />
    </div>
  )

}

export default App;

