import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from './Product';
import { getProductsByType, resetProducts } from '../redux/actions/productActions';
import Loading from './Loading';
import Filters from './Filters';

const ProductsByTypes = () => {
  const dispatch = useDispatch();
  const { productType } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [priceFilter, setPriceFilter] = useState(10000);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByFilter, setSortByFilter] = useState('');

  const productsPerPage = 9;

  const productTypeState = useSelector((state) => state.allProducts);
  console.log('first', productTypeState)
  const { products, numOfPages, loading, error, productType: currentProductType } = productTypeState;

  const renderList = products.map((product) => (
    <Product detail={product} key={product._id} />
  ));

  useEffect(() => {
    if (productType) {
      dispatch(resetProducts());
      dispatch(getProductsByType(productType));
    }
  }, [productType, dispatch]);

  const changePrice = (e) => {
    setPriceFilter(e.target.value);
  };

  const changeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortBy = (e) => {
    setSortByFilter(e.target.value);
    setCurrentPage(0);  // Reset page when sorting changes
  };

  return (
    <section className="products">
      <Filters 
        priceFilter={priceFilter} 
        changePrice={changePrice} 
        changeSearch={changeSearch} 
        handleSortBy={handleSortBy} 
      />
      {
			        	(Object.keys(products).length === 0) ? 
						<Loading/> :
						<div className="products-container">
				          {renderList}
				        </div>
			        }	
    </section>
  );
};

export default ProductsByTypes;
