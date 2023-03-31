import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import axios from "axios";

function Home() {

  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/secret_menu_items")
      .then(response => setMenus(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/api/v1/secret_menu_items/${menuToDelete.id}`)
      .then(response => {
        setMenus(menus.filter(menu => menu.id !== menuToDelete.id));
        setShowModal(false);
      })
      .catch(error => console.log(error));
  };

  const toggleModal = (menu) => {
    setMenuToDelete(menu);
    setShowModal(!showModal);
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Secret Menu</h1>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Menu Name</th>
            <th scope="col">Restaurant Name</th>
            <th scope="col">Menu Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus.map(menu => (
          <tr key={menu.id}>
            <th scope="row">{menu.id}</th>
            <td>{menu.menu_name}</td>
            <td>{menu.restaurant_name}</td>
            <td>{menu.menu_description}</td>
            <td>
              <button className="btn btn-primary btn-sm mx-2">Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => toggleModal(menu)}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this record?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
