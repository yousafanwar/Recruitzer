<template>
	<NavBar />
	<SideBar />
	<div id="tableDiv">
		<table class="highlight centered responsive-table">
			<thead>
				<tr>
					<th>First Name / Surname</th>
					<th>Email Address</th>
					<th>Date of Birth</th>
					<th>Contact Number</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{ userData.firstname + userData.lastname }}</td>
					<td>{{ userData.email }}</td>
					<td>{{ userData.dob }}</td>
					<td>{{ userData.cell }}</td>
					<td>
						<button class="material-icons">close</button>
						<button class="material-icons">remove_red_eye</button>
						<button class="material-icons" v-on:click="redirctToInd()">edit</button>
						<button class="material-icons">settings</button>
					</td>
				</tr>
			</tbody>
		</table>
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
				userData: []
			};
		},
		props: {
			userId: String
		},
		mounted() {
			this.fetchData();
			this.printToLog();
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
			printToLog() {
				console.log(this.userId);
			}
		},
		components: { NavBar, SideBar }
	};
</script>
