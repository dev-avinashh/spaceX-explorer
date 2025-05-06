import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL;

export const rocketsResponse = () => {
  return async () => {
    try {
      const res = await axios.get(`${API_URL}rockets`);
      return res.data;
    } catch (error) {
      console.error(error, "Error occurred at rockets response");
      throw error;
    }
  };
};

export const getRocketDetails = async (rocket_id: string | undefined) => {
  try {
    const res = await axios.get(`${API_URL}rockets/${rocket_id}`);
    return res.data;
  } catch (error) {
    console.error(error, "Error occurred at rocket details response");
    throw error;
  }
};
