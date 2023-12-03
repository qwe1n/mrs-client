import { createApp, provide } from 'vue'
import '@/assets/css/style.css'
import { router } from "./common/router"
import axios from "axios"
import Antd from "ant-design-vue"
import DEBUG from "./common/debug.js";
import 'ant-design-vue/dist/reset.css';
import 'vfonts/Lato.css'
import App from './App.vue'
import VueLazyload from '@jambonn/vue-lazyload'
import { notification } from "ant-design-vue";

const app = createApp(App)

app.use(Antd)
app.use(router)

import loadimage from "@/assets/img/giphy.gif"
import errorimage from "@/assets/img/default-0.jpeg"
app.use(VueLazyload, {
    preLoad: 1.3,
    error: errorimage,
    loading: loadimage,
    attempt: 1
})

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
const server_url = `http://${SERVER_HOST}:${SERVER_PORT}`

DEBUG(server_url)

axios.defaults.baseURL = server_url
axios.interceptors.request.use((config) => {
    config.headers.token = sessionStorage.getItem("token")
    return config
})

const notify = (msg) => {
    notification.open({
        message: msg,
        duration: 1,
    });
};

app.provide("server_url",server_url)
app.provide("axios", axios)
app.provide("notify", notify)

app.mount('#app')
