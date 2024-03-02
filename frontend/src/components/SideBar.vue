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

		<li v-for="item in items" :key="item.id">
			<ul ref="collapsible" class="collapsible collapsible-accordion">
				<li>
					<a class="collapsible-header white-text waves-effect">
						{{ item.text }}<i class="material-icons">{{ item.icon }}</i>
					</a>
					<div class="collapsible-body" v-if="item.items && item.items.length > 0">
						<ul class="blue darken-2">
							<li v-for="nestedItem in item.items" :key="nestedItem.id">
								<a v-bind:href="nestedItem.href" class="white-text waves-effect">
									<i class="material-icons">{{ nestedItem.icon }}</i>
									{{ nestedItem.text }}
								</a>
							</li>
						</ul>
					</div>
				</li>
			</ul>
			<div v-if="item.dividerAfter" class="divider"></div>
		</li>
	</ul>
</template>

<script>
	import * as utilities from '../utilities';
	import * as M from 'materialize-css/dist/js/materialize.min.js';

	export default {
		data() {
			return {
				isAdmin: false,
				items: [
					{
						id: 1,
						text: 'Admin',
						href: '#',
						icon: 'arrow_drop_down',
						dividerAfter: false,
						items: [{ id: 1, text: 'Users', href: './users', icon: 'apps', dividerAfter: false }]
					},
					{
						id: 2,
						text: 'Expandable',
						href: '#',
						icon: 'arrow_drop_down',
						dividerAfter: true,
						items: [
							{ id: 1, text: 'Item 1', href: '#', icon: 'apps', dividerAfter: false },
							{ id: 2, text: 'Item 2', href: '#', icon: 'apps', dividerAfter: false }
						]
					},
					{ id: 3, text: 'Settings', href: '#', icon: 'settings', dividerAfter: false },
					{ id: 4, text: 'Logout', href: '#', icon: 'exit_to_app', dividerAfter: false }
				]
			};
		},
		mounted() {
			var elem = this.$refs.sidenav;
			M.Sidenav.init(elem);

			if (this.$refs.collapsible && this.$refs.collapsible.length > 0)
				for (let loopIndex = 0; loopIndex < this.$refs.collapsible.length; loopIndex++) {
					M.Collapsible.init(this.$refs.collapsible[loopIndex]);
				}

			this.checkAdmin();
		},
		methods: {
			checkAdmin() {
				const roleId = utilities.getLoginData().roleId == 1;
				this.isAdmin = roleId;
			}
		}
	};
</script>
