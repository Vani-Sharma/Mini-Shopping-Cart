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
      <div>
        {products.map((product) => (
          <div className="card">
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%" }}
            />
            <h1>{product.title}</h1>
            <p className="price">{product.price}</p>
            <p>{product.description}</p>
            <div className="quantity">
              Quantity
              <select
                value={product.quantity}
                onChange={(e) => handleChange(e, product.id)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <p>
              <button onClick={() => dispatch(addAsync(product))}>
                Add to Cart
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
