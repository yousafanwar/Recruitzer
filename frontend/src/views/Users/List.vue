<template>
	<NavBar />
	<SideBar />
	<nav>
		<div class="nav-wrapper blue darken-1">
			<div class="col s12">
				<a href="#" class="breadcrumb">Users</a>
			</div>
		</div>
	</nav>

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
					<td>
						<RouterLink :to="`./user/${user.id}`"> {{ user.firstname + ' ' + user.lastname }}</RouterLink>
					</td>
					<td>
						<RouterLink :to="`./user/${user.id}`"> {{ user.email }}</RouterLink>
					</td>
					<td>{{ user.role }}</td>
					<td>
						<a href="#"> <i class="material-icons modal-trigger" data-target="modal1" v-on:click="this.userIdToDelete = user.id"> delete </i></a>
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
					let result = await (await utilities.apiCall('http://localhost:3000/api/user', 'GET', null, this.token)).json();
					this.userData = { ...result };
				} catch (error) {
					console.log('Error in /api/user GET: ', error);
				}
			},
			openModelFunc() {
				document.addEventListener('DOMContentLoaded', function () {
					var elems = document.querySelectorAll('.modal');
					M.Modal.init(elems);
				});
			},

			async deleteUser() {
				if (!this.userIdToDelete) {
					return;
				}
				const uId = this.userIdToDelete;
				let index = this.userData.findIndex(function (u) {
					return u.id === uId;
				});

				try {
					await utilities.apiCall(`http://localhost:3000/api/user/${this.userIdToDelete}`, 'DELETE', null, this.token);
				} catch (error) {
					console.log('In utilities.httpReqGET getAllUsers func', error);
				}

				this.userData.splice(index, 1);
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
