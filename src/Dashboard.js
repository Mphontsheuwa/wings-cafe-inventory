import React, { useState } from 'react';

function Dashboard({ products, handleDeleteProduct, isLowStock, handleEditProduct }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedProduct(products[index]);
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();
    handleEditProduct(editIndex, editedProduct);
    setEditIndex(null);
    setEditedProduct({ name: '', description: '', category: '', price: '', quantity: '' });
  };

  const handleSellProduct = (index) => {
    if (products[index].quantity > 0) {
      const newQuantity = products[index].quantity - 1;
      handleEditProduct(index, { ...products[index], quantity: newQuantity });
    }
  };

  return (
    <section id="overview">
      <h2>Current Stock Levels</h2>
      <table id="stockTable">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedProduct.name}
                    onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                    placeholder="Product Name"
                    required
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedProduct.description}
                    onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                    placeholder="Description"
                    required
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedProduct.category}
                    onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                    placeholder="Category"
                    required
                  />
                ) : (
                  product.category
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="number"
                    value={editedProduct.price}
                    onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                    placeholder="Price"
                    required
                  />
                ) : (
                  product.price
                )}
              </td>
              <td style={{ color: isLowStock(product.quantity) ? 'red' : 'black' }}>
                {editIndex === index ? (
                  <input
                    type="number"
                    value={editedProduct.quantity}
                    onChange={(e) => setEditedProduct({ ...editedProduct, quantity: e.target.value })}
                    placeholder="Quantity"
                    required
                  />
                ) : (
                  product.quantity
                )}
                {isLowStock(product.quantity) && <strong> (Low Stock)</strong>}
              </td>
              <td>
                {editIndex === index ? (
                  <button onClick={handleSaveEdit}>Save</button>
                ) : (
                  <>
                    <button className="editButton" onClick={() => handleEditClick(index)}>Edit</button>
                    <button className="sellButton" onClick={() => handleSellProduct(index)} style={{ marginLeft: '10px' }}>Sell</button>
                    <button className="deleteButton" onClick={() => handleDeleteProduct(index)} style={{ marginLeft: '10px' }}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Dashboard;
