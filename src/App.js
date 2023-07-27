import React, { useState, useEffect } from "react";
import { Product } from "./features/products/Product";
import { Cart } from "./features/carts/Cart";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsync } from "./features/carts/cartSlice";

function App() {
  const [showCart, setShowCart] = useState(false);
  const item = useSelector((state) => state.cart.item);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  return (
    <div className="App">
      <button className="outer-btn" onClick={() => setShowCart(!showCart)}>
        {showCart ? (
          <button className="custom-btn btn-5">View Products</button>
        ) : (
          <button className="custom-btn btn-5">
            View Cart [{item.length}]
          </button>
        )}
      </button>
      {showCart ? <Cart /> : <Product />}
    </div>
  );
}

export default App;
