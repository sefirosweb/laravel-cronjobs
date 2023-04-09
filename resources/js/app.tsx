
import React from "react";
import axios from "axios";
import ReactDOM from 'react-dom/client'
import { axiosInstance as crudAxiosInstance } from '@sefirosweb/react-crud'
import { error, response } from "@/lib/axios.interceptors";
import RoutesConfig from "@/routes/RoutesConfig";
import "@/lib/toastrInstance";
import '@sass/app.scss'
import '@/lib/i18n'


crudAxiosInstance.interceptors.response.use(response, error);
axios.interceptors.response.use(response, error);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RoutesConfig />
  </React.StrictMode>,
);

