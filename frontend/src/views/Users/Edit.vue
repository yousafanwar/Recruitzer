<template>
	<NavBar />
	<SideBar />
	<div class="container">
		<table class="highlight centered responsive-table">
			<thead>
				<tr>
					<th>First Name / Surname</th>
					<th>Email Address</th>
					<th>Date of Birth</th>
					<th>Contact Number</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{ userData.firstname + userData.lastname }}</td>
					<td>{{ userData.email }}</td>
					<td>{{ userData.dob }}</td>
					<td>{{ userData.cell }}</td>
			
				</tr>
			</tbody>
		</table>

		<div class="row">
    <form class="col s12" @submit.prevent="updateUser()">
      <div class="row">
        <div class="input-field col s6">
          <input id="first_name" type="text" class="validate" v-model="updateInfo.firstname">
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate" v-model="updateInfo.lastname">
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
		  <div class="input-field col s6">
          <input type="tel" class="validate" v-model="updateInfo.cell">
          <label for="cell">Contact Number</label>
        </div>
		  <div class="input-field col s6">
		  <input type="text" class="datepicker" v-model="updateInfo.dob">
          <label for="dob">Date of Birth</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" v-model="updateInfo.email">
          <label for="email">Email</label>
        </div>
      </div>
	  <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" v-model="updateInfo.password">
          <label for="password">Password</label>
        </div>
		<input type="submit" value="Update User" class="btn btn-large btn-extended grey lighten-4 black-text" />
      </div>
    </form>
  </div>
	</div>
</template>

<script>
	import NavBar from '@/components/NavBar.vue';
	import SideBar from '@/components/SideBar.vue';
	import * as utilities from '../../utilities.js';

	export default {
		data() {
			return {
				token: { Authorization: `Bearer ${utilities.getLoginData().token}` },
				userData: [],
				updateInfo: {firstname: '', 
							lastname: '', 
							dob: '', 
							cell: '', 
							email: '', 
							password: '',
							id: this.userId
						}
			}
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
				try {
					let result = await utilities.apiCall(`http://localhost:3000/api/user/${this.userId}`, 'GET', null, this.token);
					this.userData = result;
				} catch (error) {
					console.log('Error in fetchdata function of edit.vue', error);
				}
			},
			datePicker(){
				document.addEventListener('DOMContentLoaded', function() {
        const options = {
            yearRange: 10
        };
        let elems = document.querySelectorAll('.datepicker');
        let instances = M.Datepicker.init(elems, options);
    });
			},
			prinToConsole(){
				console.log(this.updateInfo);
			},
			async updateUser(){
				try {
					await utilities.apiCall(`http://localhost:3000/api/user`, 'PUT', this.updateInfo, this.token);
					
				} catch (error) {
					console.log('Error in fetchdata function of edit.vue', error);
				}

			}
		},
		components: { NavBar, SideBar }
	};
</script>
