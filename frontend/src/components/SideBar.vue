<template>
	<ul ref="sidenav" id="slide-out" class="sidenav blue darken-2">
		<li>
			<div class="user-view">
				<div class="background">
					<img src="/images/ocean.jpg" />
				</div>
				<a href="#user"><img class="circle" src="/images/person1.jpg" /></a>
				<a href="#name"><span class="white-text name">John Doe</span></a>
				<a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
			</div>
		</li>
		<li>
			<a href="/apps" class="white-text waves-effect" v-if="admin"><i class="material-icons">supervisor_account</i>Admin</a>
		</li>
		<li>
			<a href="/entities" class="white-text waves-effect"><i class="material-icons">widgets</i>Two</a>
		</li>
		<li>
			<div class="divider"></div>
		</li>
		<li>
			<a href="/settings" class="white-text waves-effect"><i class="material-icons">settings</i>Three</a>
		</li>
		<li>
			<a href="#" class="white-text waves-effect"><i class="material-icons">exit_to_app</i>Logout</a>
		</li>
	</ul>
</template>

<script>
	import * as M from 'materialize-css/dist/js/materialize.min.js';
	import * as login from '../views/LoginView.vue';

	export default {
		data(){
			return{
				admin: localStorage.getItem('roleId') == 1
			}
		},
		mounted() {
			var elem = this.$refs.sidenav;
			M.Sidenav.init(elem);
		}
	};
</script>
