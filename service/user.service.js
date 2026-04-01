import { registerUser , loginUser, refreshToken,logoutUser } from "../api/lead.api";



export const registerUserService = async (data) => {
    const res = await registerUser(data);
    return {
        ...res,
        registeredAt: new Date().toISOString(),
    };
};


export const loginUserService = async(data) => {
    const res = await loginUser(data);
    return{
        ...res,
        lastLogin: new Date().toISOString(),
    };
};


export const refreshTokenService = async () => {
    const res = await refreshToken();
    return res;
};

export const logoutUserService = async () =>{
    const res = await logoutUser();
    return res;
}
