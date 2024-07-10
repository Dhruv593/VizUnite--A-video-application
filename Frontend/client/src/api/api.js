import axios from "axios";

const baseURL = "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register a new user with multipart form data
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user with application/json content type
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/users/current-user");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axiosInstance.post("/users/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error during logout:", error.response || error.message || error);
    throw error.response?.data || error.message || error;
  }
};

export const fetchAllVideos = async() => {
  try {
    const token = localStorage.getItem('accessToken')
    const response = await axiosInstance.get("/videos/all-videos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.statusCode.docs
  } catch (error) {
    throw error.response? error.response.data : error.message

  }
}

export const fetchUserChannelProfile = async(username) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axiosInstance.get(`/users/c/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (error) {
    throw error.response ?  error.response.data : error.message
  }
}

export default axiosInstance;