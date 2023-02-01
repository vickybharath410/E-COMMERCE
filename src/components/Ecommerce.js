import "./e-commerce.css";

import React, { useEffect, useState } from "react";

import axios from "axios";

export default function Ecommerce() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("smartphones");
  const [currPage, setCurrPage] = useState(1);
  const [showProduct, setShowProduct] = useState(false);
  const [product, setProduct] = useState({});
  const options = {
    method: "GET",
    url: "https://dummyjson.com/products?skip=0&limit=0",
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    async function fetch() {
      await axios
        .request(options)
        .then((res) => setProducts(res.data.products))
        .catch((error) => {
          console.error(error);
        });
    }
    fetch();
  }, []);

  const productsPerPage = 3;
  const filteredProducts = products.filter((obj) => obj.category === category);
  const lastIndex = productsPerPage * currPage;
  const firstIndex = lastIndex - productsPerPage;
  const currPageProduct = filteredProducts.slice(firstIndex, lastIndex);
  const maxPages = Math.ceil(filteredProducts.length / productsPerPage);
  return (
    <>
      <div className="main">
        <div>
          <h2>Products</h2>
       
         
        </div>
        <div style={{ display: "flex" }}>
          <div className="categaries">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (currPage > 1) {
                  setCurrPage(1);
                }
              }}>
              <option value="smartphones">Mobile Phones</option>
              <option value="laptops">Personal Laptops</option>
              <option value="fragrances">Fragrances</option>
              <option value="skincare">Cosmetics</option>
              <option value="groceries">Household groceries</option>
              <option value="furniture">Furnitures</option>
              <option value="tops">tops</option>
              <option value="sunglasses">Sun glasses</option>
            </select>
          </div>
          <div className="products">
            {currPageProduct.map((item, index) => (
              <img
                className="prod-image"
                key={index}
                onClick={() => {
                  setShowProduct(true);
                  setProduct(item);
                }}
                src={item.images[0]}
                alt="product img"
              />
            ))}
            <div className="pagination">
              <button
                onClick={() => {
                  if (currPage > 1) {
                    setCurrPage(currPage - 1);
                  }
                }}>
                previous
              </button>
              <span>{currPage} </span>
              <button
                onClick={() => {
                  if (currPage < maxPages) {
                    setCurrPage(currPage + 1);
                  }
                }}>
                next
              </button>
            </div>
          </div>
        </div>
      </div>
      {showProduct && (
        <div className="product-details">
          <div>
            <div>
              <button
                style={{
                  "text-align": "center",
                  cursor: "pointer",
                  "margin-left": "auto",
                  width: "80px",
                  height: "24px",
                  "margin-bottom": "10px",
                }}
                onClick={() => setShowProduct(false)}>
                close
              </button>
            </div>
            <div>
              <div>
                <img src={product.images[0]} alt="product img" />
              </div>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
