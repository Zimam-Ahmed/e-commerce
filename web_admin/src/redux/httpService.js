import Cookies from 'js-cookie';
import axios from 'axios';
export const fetchDataWithToken = async (url, method = 'GET', data = null) => {
  const token = JSON.parse(Cookies.get('userPanelInfo'))?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
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
    console.error("Error fetching data with token", error.response ? error.response.data : error.message);
    throw error;
  }
};
 