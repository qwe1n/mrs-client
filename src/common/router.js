import { createRouter, createWebHashHistory } from "vue-router"

/**
 *     {
 *         path: "/register",
 *         name: "register",
 *         component: () => import("../view/Register.vue")
 *     },{
 *         path: "/login",
 *         name: "login",
 *         component: () => import("../view/Login.vue")
 *     }
 * @type {*[]}
 */

let routes = [
    {
        path: "/",
        name: "index",
        component: () => import("@/views/Home.vue")
    }, {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home.vue")
    }, {
        path    : "/login",
        name    : "login",
        component: () => import("@/views/Login.vue")
    }, {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue")
    }, {
        path: "/test",
        name: "test",
        component: () => import("@/components/MovieCard2.vue")
    }, {
        path: "/evaluate",
        name: "evaluate",
        component: () => import("@/views/Evaluate.vue")
    }, {
        path: "/recommend",
        name: "recommend",
        component: () => import("@/views/Recommend.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export { router,routes }
