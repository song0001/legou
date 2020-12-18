import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        meta: {
            isShow: true
        },
        redirect: '/home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            isShow: true
        },
        component: () =>
            import ('../views/About.vue')
    }, {
        path: '/home',
        name: 'home',
        meta: {
            isShow: true
        },
        component: () =>
            import ('../views/home/index.vue')
    },
    {
        path: '/home/city',
        name: 'city',
        meta: {
            isShow: true
        },
        component: () =>
            import ('../views/home/city/index.vue')
    },
    {
        path: '/brandlist',
        name: 'brandlist',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/home/brandlist/brandlist.vue')
    },
    {
        path: '/branddetail',
        name: 'branddetail',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/home/branddetail/branddetail.vue')
    },
    {
        path: '/newgoods',
        name: 'newgoods',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/home/newgoods/newgoods.vue')
    },
    {
        path: '/goods',
        name: 'goods',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/home/goods/goods.vue')
    },
    {
        path: '/topic',
        name: 'topic',
        meta: {
            isShow: true
        },
        component: () =>
            import ('../views/topic/index.vue')
    },
    {
        path: '/topicdetail',
        name: 'topicdetail',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/topic/topicdetail/topicdetail.vue')
    },
    {
        path: '/category',
        name: 'category',
        meta: {
            isShow: true
        },
        component: () =>
            import ('../views/category/index.vue'),
    },
    {
        path: '/categorylist',
        name: 'categorylist',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/category/categorylist/categorylist.vue')
    },
    {
        path: '/my',
        name: 'my',
        meta: {
            isShow: true
        },
        component: () =>
            import ('../views/my/index.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        meta: {
            isShow: true
        },
        component: () =>
            import ('../views/cart/index.vue')
    },
    {
        path: '/search',
        name: 'search',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/search/search.vue')
    },
    {
        path: '/collect',
        name: 'collect',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/collect/collect.vue')
    }, {
        path: '/order',
        name: 'order',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/order/order.vue')
    },
    {
        path: '/address',
        name: 'address',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/address/address.vue')
    },
    {
        path: '/addaddress',
        name: 'addaddress',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/address/addaddress/addaddress.vue')
    },
    {
        path: '/feedback',
        name: 'feedback',
        meta: {
            isShow: false
        },
        component: () =>
            import ('../views/feedback/feedback.vue')
    }

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes

})

export default router