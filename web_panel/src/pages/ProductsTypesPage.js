import React from 'react';
import NavBar from '../components/Navbar';
import PageHeading from '../components/PageHeading';
import ProductsByTypes from '../components/ProductTypes';
import Sidebar from '../components/Sidebar';
import Cart from '../components/Cart';

const ProductsTypesPage = () => {
	return(
		<>
		 	<NavBar/>	
		 	<PageHeading title="Home / Products"/>
		 	<ProductsByTypes/>	
		 	<Sidebar/>
		 	<Cart/>
		</>
		)
}


export default ProductsTypesPage;