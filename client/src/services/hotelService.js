import axios from 'axios';

/**
 * @description get data from remote api
 */
export default {
  getHotels: (city) => axios.get(`http://localhost:3000/hotels/${city}`),
  getCitys: async () => {
    try {
      const res = await axios.get('http://localhost:3000/city');
      return res.data;
    } catch (error) {
      console.error(`an error has been occurred while getting cicty from remote api, the details is ${error}`);
      throw error;
    }
  },
};
