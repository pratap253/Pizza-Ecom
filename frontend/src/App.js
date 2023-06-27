import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import Navigation from "./components/Navigation";
import SingleProduct from "./pages/SingleProduct";
import { CartContext } from "./Cartcontext";
import { useEffect, useState } from "react";
import { getCart, storeCart } from "./helper";

const App = () => {
  const [cart, setCart] = useState({});
  // fetch from local storage
  useEffect(() => {
    getCart().then((cart) => {
      setCart(JSON.parse(cart));
    });
  }, []);

  useEffect(() => {
    storeCart(JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" exact element={<ProductsPage />}></Route>
          <Route path="/products/:_id" element={<SingleProduct />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </CartContext.Provider>
    </>
  );
};

export default App;
