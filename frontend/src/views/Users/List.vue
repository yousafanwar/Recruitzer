<template>
	<NavBar />
	<SideBar />
	<div class="container">
		<h3>Users</h3>
		<table class="striped responsive-table">
			<thead>
				<tr>
					<th>First Name / Last Name</th>
					<th>Email Address</th>
					<th>Role</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in userData" :key="user.id">
					<td>{{ user.firstname + ' ' + user.lastname }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.title }}</td>
					<td>
						<i class="material-icons modal-trigger" data-target="modal1" v-on:click="this.userIdToDelete = user.id"> close </i>
						<i class="material-icons" v-on:click="redirctToInd(user)">remove_red_eye</i>
						<i class="material-icons">edit</i>
						<i class="material-icons">settings</i>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div id="modal1" class="modal">
		<div class="modal-content">
			<p>Are you sure you want to delete this user?</p>
		</div>
		<div class="modal-footer">
			<button class="modal-close waves-effect waves-green btn-flat" v-on:click="deleteUser()">Agree</button>
		</div>
	</div>
</template>

<script>
	import NavBar from '@/components/NavBar.vue';
	import SideBar from '@/components/SideBar.vue';
	import router from '@/router';
	import * as utilities from '../../utilities.js';

	export default {
		data() {
			return {
				userData: [],
				userCount: '',
				userId: '', // This id is taken from the user variable defined in v-for
				token: { Authorization: `Bearer ${utilities.getLoginData().token}` },
				userIdToDelete: null
			};
		},
		mounted() {
			this.getAllUsers();
			this.openModelFunc();
		},
		methods: {
			async getAllUsers() {
				try {
					let result = await utilities.apiCall('http://localhost:3000/api/user', 'GET', null, this.token);
					this.userData = await result.json();
				} catch (error) {
					console.log('In utilities.httpReqGET getAllUsers func', error);
				}
			},
			redirctToInd(user) {
				this.userId = user.id;
				console.log(this.userId);
				router.push({ name: 'user', params: { userId: this.userId } });
			},
			openModelFunc() {
				document.addEventListener('DOMContentLoaded', function () {
					var elems = document.querySelectorAll('.modal');
					var instances = M.Modal.init(elems);
				});
			},

			async deleteUser() {
				if (!this.userIdToDelete) {
					return;
				}
				const uId = this.userIdToDelete;
				let index = this.userData.findIndex(function (u) {
					return u.id !== uId;
				});
				console.log(index);
				try {
					console.log(this.userIdToDelete);
					let result = await utilities.apiCall(`http://localhost:3000/api/user/${this.userIdToDelete}`, 'DELETE', null, this.token);
				} catch (error) {
					console.log('In utilities.httpReqGET getAllUsers func', error);
				}

				this.userData.splice(index, 1);
				console.log(this.userData);
			}
		},
		components: { NavBar, SideBar }
	};
</script>

<style>
	h3 {
		text-align: center;
	}

	i {
		cursor: pointer;
	}

	i:hover {
		color: gray;
	}
</style>
