import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsync } from "./productSlice";
import "../products/Product.css";
import { addAsync } from "../carts/cartSlice";

export function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.product);

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div className="card">
          <img src={product.thumbnail} alt={product.title} />
          <div className="cardContent">
            <h1>{product.title}</h1>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <p>
              <button onClick={() => dispatch(addAsync(product))}>
                Add to Cart
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
