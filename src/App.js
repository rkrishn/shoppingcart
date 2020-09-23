import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import ProductsGrid from './components/ProductsGrid';
import Header from './components/Header';
import Footer from './components/Footer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from './actions/productActions';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      searchString: ''
    }
    this.onSearchItem = this.onSearchItem.bind(this);
  }

  onSearchItem(evt) {
    const searchString = evt.target.value;
    this.setState({searchString});
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/Products`)
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
      console.log(persons)
    })
  }

  render() {
    const searchString = this.state.searchString;
    let products = this.state.persons;
    if(this.state.searchString.length > 0){
      // We are searching. Filter the results.
      products = products.filter(function(l){
          return l.name.toLowerCase().match( searchString );
      });
    }
    return (
      <div className="App">
        <Header itemCount={this.props.cartItems.length} isUserLoggedIn={this.props.isUserLoggedIn} logout={this.props.actions.handleLogout}/>
          <ProductsGrid products={products} cartItems={this.props.cartItems} actions={this.props.actions} searchItem={this.onSearchItem}/>
        <Footer />
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    cartItems: state.CartReducer.cartItems,
    isUserLoggedIn: state.CartReducer.isUserLoggedIn, // See: reducers/index.js
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(cartActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

