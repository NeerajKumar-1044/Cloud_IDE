import axios from 'axios';
axios.defaults.withCredentials = true;


const backend_url = String(import.meta.env.VITE_BACKEND_URL);
const api_backend_url = String(import.meta.env.VITE_API_BACKEND_URL);

const healthCheck = async () => {
    const response = await axios.get(`${backend_url}/health-check`);
    return response;
};
const healthCheckApiServer = async () => {
    const response = await axios.get(`${api_backend_url}/health-check`);
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


  const GoogleAuthLogin = async (response) => {
    const { credential } = response;
    try {
      const data = await axios.post(
        `${api_backend_url}/api/users/google-login`,
        { token: credential },
        { withCredentials: true }
      );
      // console.log(data?.data?.user);
      return data?.data?.user;
    } catch (err) {
      console.log('Google authentication failed or user already exists', err);
    }

};

const LogOut = async () => {
    try {
        const response = await axios.get(`${api_backend_url}/api/users/logout`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error('Error while logging out:', error);
    }
}

const CreateClassRoom = async (data) => {
    try {
        const response = await axios.post(`${api_backend_url}/api/classroom/create-classroom`, {data: data}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error while creating classroom:', error);
    }
}

const getAllClassRooms = async () => {
    try {
        const response = await axios.get(`${api_backend_url}/api/classroom/get-all-classrooms`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error while fetching classrooms:', error);
    }
}
  
export { 
    healthCheck,
    healthCheckApiServer,
    getFolderStructure,
    getfiledata,
    setfiledata,
    GoogleAuthLogin,
    CreateClassRoom,
    LogOut,
    getAllClassRooms
};