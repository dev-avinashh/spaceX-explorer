import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL;

export const payloadList = () => {
  return async () => {
    try {
      const res = await axios.get(`${API_URL}payloads`);
      return res.data;
    } catch (error) {
      console.error(error, "Error occurred at payload api handling");
      throw error;
    }
  };
};

export const getFilteredPayloadList = async () => {
  try {
    const res = await axios.get(`${API_URL}payloads/?sort=flight number`);
    return res.data;
  } catch (error) {
    console.error(error, "Error occurred at payload filtering api handling");
    throw error;
  }
};
