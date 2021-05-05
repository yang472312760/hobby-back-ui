import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/system/Login.vue'
import Home from '../components/system/Home.vue'
import Permission from '../components/page/Permission.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Login',
		component: Login
	},
	{
		path: '/home',
		name: 'Home',
		component: Home
	}, {
		path: '/',
		component: Home,

		children: [{
			path: '/permission',
			component: Permission,
			meta: {
				title: '系统首页'
			}
		}]
	}

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
