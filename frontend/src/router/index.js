import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import UserListings from '../views/UserListings.vue';
import IndividualUserListing from '../views/IndividualUserListing.vue';

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
			path: '/listings',
			name: 'userListings',
			component: UserListings
		},
		{
			path: '/indListing/:userId',
			name: 'IndividualUserListing',
			component: IndividualUserListing,
			props: true
		}
	]
});

export default router;
