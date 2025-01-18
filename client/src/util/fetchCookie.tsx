import axios from "axios";

export const fetchUser = async () => {
  try {
    const response = await axios.get('/api/users/get-user');
    return response.data.email
  } catch (error) {
    console.error('Error fetching auth status:', error);
    return null;
  }
}

