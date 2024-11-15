import React from 'react';
// import './AddProduct.css'; // Assuming you will create this CSS file for styles

function AddProduct({ 
  productName, 
  setProductName, 
  productDescription, 
  setProductDescription, 
  productCategory, 
  setProductCategory, 
  productPrice, 
  setProductPrice, 
  productQuantity, 
  setProductQuantity, 
  handleAddProduct 
}) {
  return (
    <section id="addProductSection" className="addProductSection">
      <div className="card">
        <h2>Add Product</h2>
        <form onSubmit={handleAddProduct} className="addProductForm">
          <div className="formGroup">
            <label>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="formGroup">
            <label>Description</label>
            <input
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>
          <div className="formGroup">
            <label>Category</label>
            <input
              type="text"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              placeholder="Enter category"
              required
            />
          </div>
          <div className="formGroup">
            <label>Price</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Enter price"
              required
            />
          </div>
          <div className="formGroup">
            <label>Quantity</label>
            <input
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </div>
          <button type="submit" className="addProductButton">Add Product</button>
        </form>
      </div>
    </section>
  );
}

export default AddProduct;