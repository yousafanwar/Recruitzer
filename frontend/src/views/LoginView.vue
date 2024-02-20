<template>
	<div class="card-panel login blue darken-2 white-text center">
		<h2>Recruitzi Login</h2>
		<form action="/" @submit.prevent="userLogin()">
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
import router from '../router/index';
export default {
	data(){
		return{
			email: '',
			password: '',
		}
	},
	methods: {
		async userLogin() {
			try {
				const response = await fetch('http://localhost:3000/api/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: this.email,
						password: this.password
					})
				});
				if (!response.ok) {
					throw new Error('Failed to login');
				}
				const result = await response.json();
				localStorage.setItem('loggedInUser', JSON.stringify(result));
				console.log(result);
				router.push('./'); 
			} catch (error) {
				this.errorMessage = 'Invalid email or password';
				console.error('Error logging in:', error);
			}
		}
	}
};
</script>
