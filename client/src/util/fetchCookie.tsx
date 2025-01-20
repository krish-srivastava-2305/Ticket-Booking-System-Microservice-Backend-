import axios from "axios";

export const fetchUser = async () => {
  try {
    const response = await axios.get('https://ticketing.dev/api/users/get-user');
    return response.data.currentUser
  } catch (error) {
    console.error('Error fetching auth status:', error);
    return null;
  }
}

