import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import Users from '../views/Users/List.vue';
import User from '../views/Users/Edit.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView
		},
		{
			path: '/users',
			name: 'users',
			component: Users
		},
		{
			path: '/user/:userId',
			name: 'user',
			component: User,
			props: true
		}
	]
});

export default router;
