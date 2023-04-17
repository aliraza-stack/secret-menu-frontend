import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { editMenu, getMenu } from "../../api";

function EditPage(props) {
  const { id } = props.match.params;

  const [menuData, setMenuData] = useState({
    menu_name: '',
    menu_description: '',
    restaurant_name: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getMenu(id);
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.log(error); // handle errors here
      }
    }
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedMenu = await editMenu(id, menuData);
      console.log(updatedMenu); // you can handle the response data here
      props.history.push('/'); // redirect to table page
    } catch (error) {
      console.log(error); // handle errors here
    }
  };

  return (
    <div className="container mt-5">
      <h1>Edit Menu</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMenuName">
          <Form.Label>Menu Name</Form.Label>
          <Form.Control
            type="text"
            name="menu_name"
            value={menuData.menu_name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formMenuDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="menu_description"
            value={menuData.menu_description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formMenuPrice">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            type="text"
            name="restaurant_name"
            value={menuData.restaurant_name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditPage;
