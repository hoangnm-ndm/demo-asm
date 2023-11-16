// ProductList.js
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import ProductForm from "./ProductForm";
import api from "../api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    desc: "",
  });

  if (!formValues.name || !formValues.price || !formValues.desc) {
    alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
    return;
  }

  useEffect(() => {
    api.getProducts().then((data) => setProducts(data));
  }, []);

  const handleDelete = (productId) => {
    api.deleteProduct(productId).then(() => {
      setProducts(products.filter((p) => p.id !== productId));
    });
  };

  const handleShowModal = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
    setFormValues({
      id: product.id || "",
      name: product.name || "",
      price: product.price || "",
      desc: product.desc || "",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct({});
    setFormValues({ name: "", price: "", desc: "" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (selectedProduct.id) {
      api.updateProduct(selectedProduct.id, formValues).then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === selectedProduct.id ? { ...p, ...formValues } : p
          )
        );
        handleCloseModal();
      });
    } else {
      api.addProduct(formValues).then((newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        handleCloseModal();
      });
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <Button variant="primary" onClick={() => handleShowModal({})}>
        Add Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.desc}</td>
              <td>
                <Button variant="info" onClick={() => handleShowModal(product)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ProductForm
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        formValues={formValues}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default ProductList;
