import React, { useState } from 'react';
import Slider from 'react-slick';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images directly
import image1 from './images/image1.jpeg';
import image2 from './images/image2.jpeg';
import image3 from './images/image3.jpeg';
import image4 from './images/image4.jpeg';

function Dashboard({ products, handleDeleteProduct, isLowStock, handleEditProduct }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });

  const images = [image1, image2, image3];

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const styles = {
    carouselContainer: {
      marginTop: '20px',
      width: '100%',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    imgStyle: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxHeight: '300px',
      width: 'auto',
    },
    lowStock: {
      color: 'red',
    },
    actionButtons: {
      marginLeft: '10px',
    },
    chartContainer: {
      width: '100%',
      maxWidth: '800px',
      margin: '40px auto',
    }
  };

  return (
    <section id="overview">
      <h2>Current Stock Levels</h2>
      <div style={styles.carouselContainer}>
        <Slider {...settings}>
          {images.map((src, idx) => (
            <div key={idx}>
              <img src={src} alt={`Slide ${idx + 1}`} style={styles.imgStyle} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Stock Levels Graph */}
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={products} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

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
              <td style={isLowStock(product.quantity) ? styles.lowStock : {}}>
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
                    <button className="sellButton" onClick={() => handleSellProduct(index)} style={styles.actionButtons}>Sell</button>
                    <button className="deleteButton" onClick={() => handleDeleteProduct(index)} style={styles.actionButtons}>Delete</button>
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
