<template>
	<NavBar />
	<SideBar />

	<div class="container">
		<div class="row">
			<div class="col s12">
				<div class="card">
					<nav>
						<div class="nav-wrapper blue lighten-1">
							<div class="col s12">
								<RouterLink to="/users" class="breadcrumb">Users</RouterLink>
								<a href="#" class="breadcrumb">{{ this.action }}</a>
							</div>
						</div>
					</nav>
					<div class="card-content">
						<span class="card-title">{{ this.action }} User</span>
						<form>
							<div class="row">
								<div class="input-field col s12">
									<input id="first_name" type="text" class="validate" v-model="userData.firstname" />
									<label class="active" for="first_name">First Name</label>
								</div>
								<div class="input-field col s12">
									<input id="last_name" type="text" class="validate" v-model="userData.lastname" />
									<label class="active" for="last_name">Last Name</label>
								</div>

								<div class="input-field col s12">
									<input type="tel" class="validate" v-model="userData.cell" />
									<label class="active" for="cell">Contact Number</label>
								</div>
								<div class="input-field col s12">
									<input ref="datepicker" id="dob" type="text" class="validate datepicker" v-model="userData.dob" />
									<label class="active" for="dob">Date of Birth</label>
								</div>

								<div class="input-field col s12">
									<input id="email" type="email" class="validate" v-model="userData.email" />
									<label class="active" for="email">Email</label>
								</div>
							</div>
						</form>
					</div>
					<div class="card-action">
						<button class="btn green" v-on:click="this.saveUser()">Save</button>
						<RouterLink to="/users" class="btn grey">Back</RouterLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NavBar from '@/components/NavBar.vue';
	import SideBar from '@/components/SideBar.vue';
	import * as utilities from '../../utilities.js';
	import router from '../../router/index';

	export default {
		data() {
			return {
				token: { Authorization: `Bearer ${utilities.getLoginData().token}` },
				userData: {
					id: 0,
					firstname: '',
					lastname: '',
					cell: '',
					dob: '',
					email: ''
				},
				action: ''
			};
		},
		mounted() {
			this.fetchData();
			this.setDatePicker();
		},
		methods: {
			async fetchData() {
				const userId = this.$route?.params?.userId;
				if (userId !== '0') {
					this.action = 'Edit';
					try {
						let result = await (await utilities.apiCall(`http://localhost:3000/api/user/${userId}`, 'GET', null, this.token)).json();

						this.userData = { ...result };
					} catch (error) {
						console.log('Error in fetchdata function of edit.vue', error);
					}
				} else {
					this.action = 'Create';
					// Form opened to create a new user so we don't do a fetch here.
				}
			},
			setDatePicker() {
				const options = {
					yearRange: 100,
					format: 'mm-dd-yyyy'
				};

				let el = this.$refs.datepicker;
				M.Datepicker.init(el, options);
			},
			async saveUser() {
				const userId = this.$route?.params?.userId;
				if (userId === '0') {
					//creating
					try {
						let result = await utilities.apiCall(`http://localhost:3000/api/user`, 'POST', this.userData, this.token);
						let jsonResult = await result.json();
						alert('User created successfully');
						router.push('/user/' + jsonResult.id);
					} catch (error) {
						console.log('Error in fetchdata function of edit.vue', error);
					}
				} else {
					//updating existing
					try {
						await utilities.apiCall(`http://localhost:3000/api/user`, 'PUT', this.userData, this.token);
						alert('User saved successfully');
					} catch (error) {
						console.log('Error in fetchdata function of edit.vue', error);
					}
				}
			}
		},
		components: { NavBar, SideBar }
	};
</script>
