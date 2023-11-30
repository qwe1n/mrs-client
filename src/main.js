import { createApp, provide } from 'vue'
import './style.css'

import { router } from "./common/router"
import axios from "axios"
import Antd from "ant-design-vue"

import 'ant-design-vue/dist/reset.css';
import 'vfonts/Lato.css'

import App from './App.vue'

const app = createApp(App)

app.use(Antd)
app.use(router)

const server_url = "http://127.0.0.1:8085"

axios.defaults.baseURL = server_url
axios.interceptors.request.use((config) => {
    config.headers.token = sessionStorage.getItem("token")
    return config
})

app.mount('#app')
