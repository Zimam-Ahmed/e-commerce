import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import getProductImageUrl from '../util/imageURL';

const Product = (props) => {
  const { _id, images, price, title, stock } = props.detail;
  const dispatch = useDispatch();

  const addToCartHandle = (product) => {
    dispatch(addToCart(product, 1));
  };

  return (
    <article className="product">
      <div className="product-container">
        <img src={getProductImageUrl(images[0])} className="product-img img" alt={title} />
        <div className="product-icons">
          <Link to={`/product/${_id}`} className="product-icon" title="View">
            <i className="fas fa-search" />
          </Link>
          {stock > 0 ? (
            <button
              className="product-cart-btn product-icon"
              title="Add to Cart"
              data-id={_id}
              onClick={() => addToCartHandle(props.detail)}
            >
              <i className="fas fa-shopping-cart" />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <footer>
        <h5 className="product-name">{title}</h5>
        {stock > 0 ? (
          <span className="product-price">${price}</span>
        ) : (
          <span className="out-of-stock-text">OUT OF STOCK</span>
        )}
      </footer>
    </article>
  );
};

export default Product;
