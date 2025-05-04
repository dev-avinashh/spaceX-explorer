import axios from "axios";

const API_URL: string | undefined = "https://api.spacexdata.com/v3/";

export const launchResponseData = () => {
  return async () => {
    try {
      const res = await axios.get(`${API_URL}launches`);
      return res.data;
    } catch (error) {
      console.error(error, "Error occurred at launches api handling");
      throw error;
    }
  };
};
export const getSingleLaunchData = async (launchId: string) => {
  try {
    const res = await axios.get(`${API_URL}launches/${launchId}`);
    return res.data;
  } catch (error) {
    console.error(error, "Error occurred at single launch api handling");
    throw error;
  }
};

export const searchByRocketName = async (rocket_name: string) => {
  try {
    const res = await axios.get(
      `${API_URL}launches/?rocket_name=${rocket_name}`
    );
    return res.data;
  } catch (error) {
    console.error(
      error,
      "Error occurred at search by rocket name api handling"
    );
    throw error;
  }
};

export const getLaunchDataByFilter = async (filter: string) => {
  try {
    const res = await axios.get(`${API_URL}launches/${filter}`);
    return res.data;
  } catch (error) {
    console.error(
      error,
      "Error occurred at get launch data by filter api handling"
    );
    throw error;
  }
};
