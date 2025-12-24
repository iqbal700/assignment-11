import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'https://assignment-backend-11.vercel.app'
})


const useAxios = () => {
    return axiosInstance
}

export default useAxios;

