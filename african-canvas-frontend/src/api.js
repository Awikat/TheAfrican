const API_BASE_URL = "http://127.0.0.1:8000/api/users/admin/";

export const loginAdmin = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error("Invalid login credentials");

    return await response.json(); // { token, username }
  } catch (error) {
    throw error;
  }
};

export const logoutAdmin = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}logout/`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Token ${token}` 
      },
    });

    if (!response.ok) throw new Error("Logout failed");

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchAdminDashboard = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}dashboard/`, {
      method: "GET",
      headers: { 
        Authorization: `Token ${token}` 
      },
    });

    if (!response.ok) throw new Error("Unauthorized access");

    return await response.json();
  } catch (error) {
    throw error;
  }
};

