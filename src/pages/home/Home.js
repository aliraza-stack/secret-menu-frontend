import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { getMenus, deleteMenu } from "../../api";
import { Row, Col, Table, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);

  useEffect(() => {
    getMenus().then((menus) => setMenus(menus));
  }, []);

  // Calculate the indexes of the first and last results on the current page
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;

  // Get the menus for the current page
  const currentMenus = menus.slice(indexOfFirstResult, indexOfLastResult);

  // Calculate the total number of pages based on the number of results and results per page
  const totalPages = Math.ceil(menus.length / resultsPerPage);

  const handleDelete = (menuToDelete) => {
    deleteMenu(menuToDelete.id)
      .then((response) => {
        setMenus((menus) =>
          menus.filter((menu) => menu.id !== menuToDelete.id)
        );
        setShowModal(false);
      })
      .catch((error) => console.log(error));
  };

  const toggleModal = (menu) => {
    setMenuToDelete(menu);
    setShowModal((showModal) => !showModal);
  };

  const handlePageChange = (event) => {
    setCurrentPage(parseInt(event.target.value));
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset the current page to 1 when changing the number of results per page
  };

  return (
    <>
      <Row>
        <Col>
          <div className={styles.header}>
            <h1 className="fw-bold">Secret Menu</h1>
          </div>
        </Col>
      </Row>
      <Row className="my-3">
        <Col sm={12} md={6} className="mb-3 mb-md-0">
          <div className="d-flex justify-content-center align-items-center">
            <span>Show:</span>
            <select
              className="form-select mx-2"
              style={{ width: "20%" }}
              value={resultsPerPage}
              onChange={handleResultsPerPageChange}
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>results per page</span>
          </div>
        </Col>
        <Col sm={12} md={6}>
          <div className="d-flex justify-content-center align-items-center">
            <span>Page:</span>
            <select
              className="form-select mx-3"
              style={{ width: "20%" }}
              value={currentPage}
              onChange={handlePageChange}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <option key={pageNumber} value={pageNumber}>
                    {pageNumber}
                  </option>
                )
              )}
            </select>
            <span className="">of {totalPages}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Menu Name</th>
                <th>Restaurant Name</th>
                <th>Menu Description</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMenus.map((menu, index) => (
                <tr key={menu.id}>
                  <td>{index + 1}</td>
                  <td style={{ width: "20%" }}>{menu.menu_name}</td>
                  <td>{menu.restaurant_name}</td>
                  <td>{menu.menu_description}</td>
                  <td className="text-center" style={{ width: "15%" }}>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Action Buttons"
                    >
                      <Button variant="primary">
                        <Link to={`/edit/${menu.id}`} className="text-light text-decoration-none">Edit</Link>
                      </Button>
                      <Button
                        variant="danger"
                        className=""
                        onClick={() => toggleModal(menu)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this menu: <snap className="badge badge-danger">{menuToDelete?.menu_name}</snap>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(menuToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Home;
