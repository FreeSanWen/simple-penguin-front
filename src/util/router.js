import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            component:() => import('../components/Login.vue')
        },
        {
            path:'/index',
            component:() => import('../components/Index.vue')
        }
    ]
})

export default router;