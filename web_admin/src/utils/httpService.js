import Cookies from 'js-cookie';
import axios from 'axios';

export const fetchDataWithToken = async (url, method = 'GET', data = null) => {
  const token = JSON.parse(Cookies.get('userPanelInfo'))?.token;
  console.log('user token',token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in the headers
    },
  };

  try {
    let response;

    switch (method) {
      case 'POST':
        response = await axios.post(url, data, config);
        break;
      case 'PUT':
        response = await axios.put(url, data, config);
        break;
      case 'DELETE':
        response = await axios.delete(url, config);
        break;
      case 'GET':
      default:
        response = await axios.get(url, config);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching data with token", error);
    throw error; // Re-throw error to be handled by the caller
  }
};
