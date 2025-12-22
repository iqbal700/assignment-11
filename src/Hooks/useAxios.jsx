import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'assignment-backend-11.vercel.app'
})

const useAxios = () => {
    return axiosInstance
}

export default useAxios;