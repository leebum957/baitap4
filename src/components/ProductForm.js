import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addProduct,
  deleteSelectedProducts,
  toggleProductSelect,
  toggleSelectAll,
} from "../actions/productActions";

const ProductForm = ({
  products,
  selectAll,
  addProduct,
  toggleSelectAll,
  deleteSelectedProducts,
  toggleProductSelect,
}) => {
  const [productName, setProductName] = useState("");

  const handleAddProduct = () => {
    addProduct(productName);
    setProductName("");
  };

  const handleToggleProductSelect = (productId) => {
    toggleProductSelect(productId);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div>
        <div>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <button
            className="action-button add-button"
            onClick={handleAddProduct}
            disabled={!productName}
          >
            Add Product
          </button>
        </div>
        <div>
          <button
            className={`action-button select-all-button ${
              selectAll ? "selected" : ""
            }`}
            onClick={toggleSelectAll}
            disabled={products.length === 0}
          >
            {selectAll ? "Unselect All" : "Select All"}
          </button>
          <button
            className="action-button delete-selected-button"
            onClick={deleteSelectedProducts}
            disabled={!products.some((product) => product.selected)}
          >
            Delete Selected
          </button>
        </div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <input
                type="checkbox"
                checked={product.selected}
                onChange={() => handleToggleProductSelect(product.id)}
              />
              {product.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  selectAll: state.selectAll,
});

export default connect(mapStateToProps, {
  addProduct,
  toggleSelectAll,
  deleteSelectedProducts,
  toggleProductSelect,
})(ProductForm);
