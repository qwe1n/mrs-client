import { createRouter, createWebHashHistory } from "vue-router"

let routes = [
    {
        path: "/register",
        name: "register",
        component: () => import("../view/Register.vue")
    },{
        path: "/login",
        name: "login",
        component: () => import("../view/Login.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export { router,routes }
