const API_URL = 'http://localhost:3000/api/v1';

async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

// get all menus
export async function getMenus() {
  return fetchData(`secret_menu_items`);
}

// delete menu item
export async function deleteMenu(id) {
  const response = await fetch(`${API_URL}/secret_menu_items/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error deleting menu item: ${response.statusText}`);
  }
  return response;
}

// edit menu item
export async function editMenu(id, menuData) {
  const response = await fetch(`${API_URL}/secret_menu_items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuData),
  });
  if (!response.ok) {
    throw new Error(`Error editing menu item: ${response.statusText}`);
  }
  return response;
}

// get menu item by ID
export async function getMenu(id) {
  const response = await fetch(`${API_URL}/secret_menu_items/${id}`);
  if (!response.ok) {
    throw new Error(`Error getting menu item: ${response.statusText}`);
  }
  return response;
}
