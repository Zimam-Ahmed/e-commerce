import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import Product from './Product';
import Loading from '../components/Loading';

const FeaturedProducts = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(0, 6, '', '', '')); // Fetching 6 products only
  }, [dispatch]);

  if (!products || products.length === 0) {
    return <Loading />; // Loading spinner while fetching products
  }

  const featuredProduct = products.slice(0, 6); // Slicing the first 6 products if needed

  const renderList = featuredProduct.map((product, index) => (
    <Product detail={product} key={product._id || product.id  || index} /> // Using _id or fallback id
  ));

  return (
    <>
      <section className="section featured">
        <div className="title">
          <span />
          <h2>Featured Products</h2>
          <span />
        </div>
        <div className="section-center featured-center">
          {renderList}
        </div>
        <Link to="/products" className="btn">
          All Products
        </Link>
      </section>
    </>
  );
};

export default FeaturedProducts;
