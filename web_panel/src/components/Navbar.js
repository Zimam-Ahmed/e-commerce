import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {showCart} from '../redux/actions/cartActions';
import { logout } from "../redux/actions/userActions";
import ProductNaveBar from './ProductNaveBar';



const NavBar = () => {
	const dispatch = useDispatch();
	const showCartStatus = useSelector((state)=> state.cart.showCart);
	const cartItems = useSelector((state)=> state.cart.cartItems);
	const userInfo = useSelector((state)=> state.userPanelLogin.userInfo);
	let isLoggedin = false;
	let userName = '';
	
	if(typeof userInfo !== 'undefined' && Object.keys(userInfo).length !== 0){
		userName = userInfo.data[0].name;
		isLoggedin = true;
	}

	let cartItemsCount = cartItems.reduce((total, item)=>{
		return total + item.qty
	}, 0);


	const toggleCart = () => {
		dispatch(showCart(!showCartStatus))
	}

	const logoutHandler = () => {
	    dispatch(logout());    
	};

	useEffect(() => {
		
		
	}, []);

	return(
			<>
				<nav className="navbar">
			        <div className="nav-center">
			          <div>
					  
			           <ProductNaveBar/>
			          </div>
			          <div className="auth-section" >
			          	<div className="auth-container">
				        	{
				        		!isLoggedin ?
				        		(
				        			<Link to="/login" className="nav-link" style={{ color: 'white'}}>Login</Link>
				        		) :				        		
				        		(
				        			<>
				        				<div className="dropdown">
									        <button className="btn btn-secondary dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									          {userName}
									        </button>
									        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									          <Link className="dropdown-item" to="#">Profile</Link>
									          <Link className="dropdown-item" onClick={logoutHandler} to="#">Log Out</Link>
									        </div>
									      </div>
				        			</>
				        		)
				        	}
				        </div>
			            <div className="toggle-container">
				          	<button className="toggle-cart" onClick={toggleCart} style={{ color: 'white'}}>Cart 
				              <i className="fas fa-shopping-cart" style={{ color: 'white', marginLeft: '4px'}}/>
				            </button>
				            <span className="cart-item-count">{cartItemsCount}</span>
				        </div>				        
			          </div>
			        </div>
			    </nav>			
			</>
		)
}

export default NavBar;