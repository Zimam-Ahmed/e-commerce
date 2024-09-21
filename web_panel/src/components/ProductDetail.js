import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import getProductImageUrl from '../util/imageURL';

const Products = (props) => {
  const productDetails = props.details.data;
  const { images, title, price, description, color = [], size = [] } = productDetails;
  console.log(`this is color: ${color}, this is size: ${size} `);

  const [itemQty, setItemQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const dispatch = useDispatch();

  const addToCartHandle = (product) => {
    if (selectedColor && selectedSize) {
      const productWithSelections = {
        ...product,
        selectedColor,
        selectedSize,
        quantity: itemQty,
      };
      dispatch(addToCart(productWithSelections, itemQty));
    } else {
      alert('Please select a color and size.');
    }
  };

  const handleItemQty = (e) => {
    setItemQty(e.target.value);
  };

  return (
    <>
      <section className="single-product section">
        <div className="section-center single-product-center">
          <img
            src={getProductImageUrl(images[0])}
            className="single-product-img img"
            alt={title}
          />
          <article className="single-product-info">
            <div>
              <h2 className="single-product-title">{title}</h2>
              <p className="single-product-company">By VIBES</p>
              <span className="single-product-price">${price}</span>

              {/* Color Selector */}
              <div className="single-product-colors">
                <h4>Select Color</h4>
                <div className="color-options">
                  {color.map((colorItem, index) => (
                    <div
                      key={index}
                      className={`color-circle ${selectedColor === colorItem ? 'selected-color' : ''}`}
                      style={{ backgroundColor: colorItem }}
                      onClick={() => setSelectedColor(colorItem)}
                      title={colorItem}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="single-product-sizes">
                <h4>Select Size</h4>
                <div className="size-options">
                  {size.map((sizeItem, index) => (
                    <button
                      key={index}
                      className={`size-button ${selectedSize === sizeItem ? 'selected-size' : ''}`}
                      onClick={() => setSelectedSize(sizeItem)}
                    >
                      {sizeItem}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <p className="item-qty single-product-desc">
                Select Quantity 
                <select
                  onChange={handleItemQty}
                  value={itemQty}
                  className="qty-selector"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
              </p>

              {/* Add to Cart Button */}
              <button
                className="add-to-cart-btn"
                onClick={() => addToCartHandle(productDetails)}
              >
                Add to Cart
              </button>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Products;
