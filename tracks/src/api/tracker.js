import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance =  axios.create({
    baseURL: 'http://eba498d037a5.ngrok.io',
    headers: {
        'Content-Type': 'application/json'
      }
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers.common["x-auth-token"] = token;
        } else {
            delete config.headers.common["x-auth-token"];
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
        }
);

export default instance;


