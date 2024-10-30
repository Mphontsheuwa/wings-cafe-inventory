// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddProduct from './AddProduct';
import UserManagement from './UserManagement';
import Header from './Header';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      const loginTime = new Date().toLocaleString();
      const newUser = { username, loginTime };
      setUser(newUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setUsername('');
      setPassword('');
    }
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      setShowSignUp(false);
      const loginTime = new Date().toLocaleString();
      const newUser = { username, loginTime };
      setUser(newUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    const newProduct = {
      name: productName,
      description: productDescription,
      category: productCategory,
      price: productPrice,
      quantity: productQuantity,
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setProductName('');
    setProductDescription('');
    setProductCategory('');
    setProductPrice('');
    setProductQuantity('');
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleEditProduct = (index, updatedProduct) => {
    const updatedProducts = products.map((product, i) => 
      i === index ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  const isLowStock = (quantity) => quantity < 5;

  return (
    <Router>
      <div className="App">
        {!user ? (
          <div className="authSection">
            <h2>{showSignUp ? "Sign Up" : "Login"}</h2>
            <form onSubmit={showSignUp ? handleSignUpSubmit : handleLoginSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="authInput"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="authInput"
              />
              <button type="submit" className="authButton">{showSignUp ? "Sign Up" : "Login"}</button>
            </form>
            <button onClick={() => setShowSignUp(!showSignUp)} className="toggleButton">
              {showSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
          </div>
        ) : (
          <div id="mainContent">
            <Header user={user} handleLogout={handleLogout} />
            <nav>
              <ul className="navbar">
                <li>
                  <Link to="/" className="navButton">Dashboard</Link>
                </li>
                <li>
                  <Link to="/add-product" className="navButton">Add Product</Link>
                </li>
                <li>
                  <Link to="/user-management" className="navButton">User Management</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={
                <Dashboard
                  products={products}
                  handleDeleteProduct={handleDeleteProduct}
                  isLowStock={isLowStock}
                  handleEditProduct={handleEditProduct}
                />
              } />
              <Route path="/add-product" element={
                <AddProduct
                  productName={productName}
                  setProductName={setProductName}
                  productDescription={productDescription}
                  setProductDescription={setProductDescription}
                  productCategory={productCategory}
                  setProductCategory={setProductCategory}
                  productPrice={productPrice}
                  setProductPrice={setProductPrice}
                  productQuantity={productQuantity}
                  setProductQuantity={setProductQuantity}
                  handleAddProduct={handleAddProduct}
                />
              } />
              <Route path="/user-management" element={<UserManagement initialUsers={users} />} />
            </Routes>
          </div>
        )}
        <footer>
          <p>© 2024 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
