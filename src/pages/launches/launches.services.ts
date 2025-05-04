import axios from "axios";

const API_URL: string | undefined = "https://api.spacexdata.com/v3/";

export const launchResponseData = () => {
  return async () => {
    try {
      let res = await axios.get(`${API_URL}launches`);
      return res.data;
    } catch (error) {
      console.error(error, "Error occurred at launches api handling");
      throw error;
    }
  };
};
