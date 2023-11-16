// ProductForm.js
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ProductForm = ({
  showModal,
  handleCloseModal,
  formValues,
  handleFormChange,
  handleFormSubmit,
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Title>
        {formValues.id ? "Edit Product" : "Add Product"}
      </Modal.Title>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              value={formValues.name}
              onChange={handleFormChange}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              name="price"
              value={formValues.price}
              onChange={handleFormChange}
            />
          </Form.Group>
          <Form.Group controlId="formDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="desc"
              value={formValues.desc}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          {formValues.id ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductForm;
