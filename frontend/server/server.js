import axios from 'axios';
axios.defaults.withCredentials = true;


const backend_url = String(import.meta.env.VITE_BACKEND_URL);

const healthCheck = async () => {
    const response = await axios.get(`${backend_url}/health-check`);
    return response;
};

const getFolderStructure = async () => {
    const response = await axios.get(`${backend_url}/get-folder-structure`);
    // console.log(response?.data);
    return response.data;
}
const getfiledata = async (path) => {
    const response = await axios.get(`${backend_url}/get-file-content?path=${path}`);
    // console.log(response);
    return response.data;
}

const setfiledata = async (path, data) => {
    try {
      const response = await axios.post(`${backend_url}/save-file-content`, { path_: path, data: data });
    //   console.log(response);
      return response;
    } catch (error) {
      console.error('Error while saving file:', error);
    }
  }
  
export { 
    healthCheck,
    getFolderStructure,
    getfiledata,
    setfiledata
};