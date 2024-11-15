import React from 'react';

const ProductRow = ({ product, onDelete, onUpdate }) => {
  const { id, name, description, category, price, quantity } = product;

  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>
        <button className="update" onClick={() => onUpdate(id)}>Update</button>
        <button className="delete" onClick={() => onDelete(id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ProductRow;