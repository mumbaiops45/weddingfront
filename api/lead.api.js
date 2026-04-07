import apiClient from "../utils/apiClient";



apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
 
    if(originalRequest.url === "/refresh-token"){
      window.location.href = "/login";
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken(); 
        return apiClient(originalRequest); 
      } catch (err) {
        
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (data) => {
  const response = await apiClient.post("/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await apiClient.post("/login", data);
  return response.data;
};

export const refreshToken = async () => {
  const response = await apiClient.post("/refresh-token");
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/logout");
  return response.data;
};  

export const searchLead = async (query) => {
  const response = await apiClient.get("/search", {params:{query}});
  return response.data;
}
 
export const createLead = async (data) => {
  const response = await apiClient.post("/create", data);
  return response.data;
}

export const getAllLeads = async () => {
  const response = await apiClient.get("/getall");
  return response.data.leads; 
};

export const getleads = async(id) =>{
    const response = await apiClient.get(`/get/${id}`);
    return response.data.data;
}


export const createPackage = async(data)  => {
  const response = await apiClient.post("/createpack", data);
  return response.data;
}

export const getAllPackage = async()  => {
  const response = await apiClient.get("/getpack");
  return response.data;
}