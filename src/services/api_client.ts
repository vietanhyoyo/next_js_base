import { CustomAxiosResponse } from "@/common/interface/axios";
import { errorMessage } from "@/common/message";
import { getCookie} from 'cookies-next';

import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://45.79.198.164:3004/api",
  baseURL: "https://api.oxodb.com/api",
  // baseURL: "http://localhost:3004/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = getCookie("access_token");

    if (typeof token === "string" && token.length > 0) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Axios token:", token);
    return config;
  },
  (error) => {
    console.log("get axios error");
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use((config) => {
  return config;
});

export const get = (
  url: string,
  params: any = {}
): Promise<CustomAxiosResponse> => {
  return new Promise((resolve, reject) => {
    apiClient.get(url, { params }).then(
      (res: CustomAxiosResponse) => {
        resolve(res);
      },
      (err) => {
        errorMessage("网络错误");
        reject(new Error(err));
      }
    );
  });
};

export const post = (url: string, data: any = {}) => {
  return new Promise((resolve, reject) => {
    apiClient.post(url, data).then(
      (res: CustomAxiosResponse) => {
        resolve(res);
      },
      (err) => {
        errorMessage("网络错误");
        reject(new Error(err));
      }
    );
  });
};

export const patch = (url: string, data: any = {}): Promise<CustomAxiosResponse> => {
  return new Promise((resolve, reject) => {
    apiClient.patch(url, data).then(
      (res: CustomAxiosResponse) => {
        resolve(res);
      },
      (err) => {
        errorMessage("网络错误");
        reject(new Error(err));
      }
    );
  });
};

export const del = (url: string, params: any = {}) => {
  return new Promise((resolve, reject) => {
    apiClient.delete(url, { params }).then(
      (res: CustomAxiosResponse) => {
        resolve(res);
      },
      (err) => {
        errorMessage("网络错误");
        reject(new Error(err));
      }
    );
  });
};

export default apiClient;
