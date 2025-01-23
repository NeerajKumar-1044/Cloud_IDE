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
        `${api_backend_url}/api/auth/google-login`,
        { token: credential },
        { withCredentials: true }
      );
      // console.log(data?.data?.user);
      return data?.data?.user;
    } catch (err) {
      console.log('Google authentication failed or user already exists', err);
    }

};

const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${api_backend_url}/api/user/get-current-user`, { withCredentials: true });
        // console.log(response);
        return response?.data?.user;
    } catch (error) {
        console.error('Error while fetching current user:', error);
    }
}

const LogOut = async () => {
    try {
        const response = await axios.get(`${api_backend_url}/api/auth/logout`, { withCredentials: true });
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

const joinClassRoom = async (data) => {
    try {
        const response = await axios.post(`${api_backend_url}/api/classroom/join-classroom`, {joinCode: data}, { withCredentials: true });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error while joining classroom:', error);
    }
}

const getEnrolledClassrooms = async () => {
    try {
        const response = await axios.get(`${api_backend_url}/api/classroom/get-enrolled-classroom`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error while fetching enrolled classrooms:', error);
    }
}

const getAllQuestions = async () => {
    try {
        const response = await axios.get(`${api_backend_url}/api/question/get-all-question`, { withCredentials: true });
        console.log(response.data.Questions);
        return response.data;
    } catch (error) {
        console.error('Error while fetching questions:', error);
    }
}

const CreateQuestion = async (data) => {
    try {
        const response = await axios.post(`${api_backend_url}/api/question/create-question`, {...data}, { withCredentials: true });
        // console.log(response.data?.CreateQuestion);
        return response?.data?.CreateQuestion;
    } catch (error) {
        console.error('Error while creating question:', error);
    }
}

const getQuestionById = async (id) => {
    try {
        const response = await axios.get(`${api_backend_url}/api/question/get-question?id=${id}`, { withCredentials: true });
        console.log(response.data?.Question);
        return response.data?.Question;
    } catch (error) {
        console.error('Error while fetching question:', error);
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
    getAllClassRooms,
    joinClassRoom,
    getCurrentUser,
    getEnrolledClassrooms,
    getAllQuestions,
    CreateQuestion,
    getQuestionById,
};