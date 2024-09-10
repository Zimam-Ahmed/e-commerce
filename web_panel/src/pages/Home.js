import React from 'react';
import NavBar from '../components/Navbar';
import Slider from '../components/Slider';
import FeaturedProducts from '../components/FeaturedProducts';
import Sidebar from '../components/Sidebar';
import Cart from '../components/Cart';
import Footer from '../components/Footer';

const Home = () => {
	return(
		<>
		 	<NavBar/>
		 	<Slider/>
		 	<FeaturedProducts/>
		 	<Sidebar/>
		 	<Cart/>
			<Footer/>
		</>
		)
}


export default Home;