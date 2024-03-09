<template>
	<div class="card-panel login blue darken-2 white-text center">
		<h2>Recruitzi Login</h2>
		<form action="/" @submit.prevent="login()">
			<div class="input-field">
				<i class="material-icons prefix">email</i>
				<input type="email" id="email" class="white-text" v-model="email" />
				<label for="email" class="white-text">Email</label>
			</div>
			<div class="input-field">
				<i class="material-icons prefix">lock</i>
				<input type="password" id="password" class="white-text" v-model="password" />
				<label for="password" class="white-text">Password</label>
			</div>
			<input type="submit" value="Login" class="btn btn-large btn-extended grey lighten-4 black-text" />
		</form>
	</div>
</template>

<script>
	import router from '@/router';
	import * as utilities from '../utilities';

	export default {
		data() {
			return {
				email: '',
				password: '',
				userData: ''
			};
		},
		methods: {
			async login() {
				try {
					const result = await utilities.apiCall('http://localhost:3000/api/login', 'POST', { email: this.email, password: this.password });
					this.userData = result;
					if (result) {
						localStorage.setItem('loggedInUser', JSON.stringify(result));
						router.push('/');
					}

					console.log('Save it in local storage', this.userData);
				} catch (error) {
					console.log('Login function in loginview error', error);
				}
			}
		}
	};
</script>
