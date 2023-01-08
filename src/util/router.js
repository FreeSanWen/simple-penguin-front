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
            component:() => import('../components/Index.vue'),
            children:[
                {
                    // 默认跳转到home页面
                    path:"",
                    name:"home",
                    component:() => import('../components/layout/Home.vue')
                },{
                    path:"/userIndex",
                    name:"UserIndex",
                    title:"userIndex",
                    component:() => import('../components/authentic/UserIndex.vue')
                },{
                    path:"/roleIndex",
                    name:"RoleIndex",
                    title:"roleIndex",
                    component:() => import('../components/authentic/RoleIndex.vue')
                }
            ]
        }
    ]
})

export default router;