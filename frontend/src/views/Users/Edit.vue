<template>
	<NavBar />
	<SideBar />
	<nav>
		<div class="nav-wrapper blue darken-1">
			<div class="col s12">
				<RouterLink to="/users" class="breadcrumb">Users</RouterLink>
				<a href="#" class="breadcrumb">{{ this.action }}</a>
			</div>
		</div>
	</nav>
	<div class="container">
		<div class="row">
			<form class="col s12" @submit.prevent="saveUser()">
				<div class="row">
					<div class="input-field col s6">
						<input id="first_name" type="text" class="validate" v-model="userData.firstname" />
						<label class="active" for="first_name">First Name</label>
					</div>
					<div class="input-field col s6">
						<input id="last_name" type="text" class="validate" v-model="userData.lastname" />
						<label class="active" for="last_name">Last Name</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s6">
						<input type="tel" class="validate" v-model="userData.cell" />
						<label class="active" for="cell">Contact Number</label>
					</div>
					<div class="input-field col s6">
						<input ref="datepicker" id="dob" type="text" class="validate datepicker" v-model="userData.dob" />
						<label class="active" for="dob">Date of Birth</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<input id="email" type="email" class="validate" v-model="userData.email" />
						<label class="active" for="email">Email</label>
					</div>
				</div>
				<div class="row">
					<div class="col s6">
						<button style="width: 100%" type="submit" value="Update User" class="btn waves-effect waves-light blue darken-2">
							Save
							<i class="material-icons right">save</i>
						</button>
					</div>
					<div class="col s6">
						<RouterLink to="/users" style="width: 100%" class="btn waves-effect waves-light red darken-2">
							Back
							<i class="material-icons right">arrow_back</i>
						</RouterLink>
					</div>
				</div>
			</form>
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
		props: {
			userId: String
		},
		mounted() {
			this.fetchData();
			this.datePicker();
		},
		methods: {
			async fetchData() {
				if (this.$route?.params?.userId !== '0') {
					this.action = 'Edit';
					try {
						let result = await (await utilities.apiCall(`http://localhost:3000/api/user/${this.userId}`, 'GET', null, this.token)).json();

						this.userData = { ...result };
					} catch (error) {
						console.log('Error in fetchdata function of edit.vue', error);
					}
				} else {
					this.action = 'Create';
					// Form opened to create a new user so we don't do a fetch here.
				}
			},
			datePicker() {
				const options = {
					yearRange: 100,
					format: 'mm-dd-yyyy'
				};

				let el = this.$refs.datepicker;
				M.Datepicker.init(el, options);
			},
			async saveUser() {
				if (this.$route?.params?.userId === '0') {
					//creating
					try {
						let result = await utilities.apiCall(`http://localhost:3000/api/user`, 'POST', this.userData, this.token);
						let jsonResult = await result.json();
						router.push('/user/' + jsonResult.id);
					} catch (error) {
						console.log('Error in fetchdata function of edit.vue', error);
					}
				} else {
					//updating existing
					try {
						let result = await utilities.apiCall(`http://localhost:3000/api/user`, 'PUT', this.userData, this.token);
						console.log(result);
					} catch (error) {
						console.log('Error in fetchdata function of edit.vue', error);
					}
				}
			}
		},
		components: { NavBar, SideBar }
	};
</script>
