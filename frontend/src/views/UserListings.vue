<template>
    <NavBar />
    <SideBar />
    <div>
     <h3>Total Users: {{ userCount }} </h3>   
    <table class="highlight centered responsive-table">
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
                    <button class="material-icons modal-trigger" data-target="modal1"  v-on:click="deleteUser(user)">close</button>
                    <button class="material-icons" v-on:click="redirctToInd(user)">remove_red_eye</button>
                    <button class="material-icons">edit</button>
                    <button class="material-icons">settings</button>
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
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
         
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import router from '@/router';

    export default{
    data() {
        return {
            token: '',
            userData: [],
            userCount: '',
            userId: '', // This id is taken from the user variable defined in v-for
        };
    },
    mounted() {
        this.getLoginData();
        this.fetchData();
        this.openModelFunc();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch('http://localhost:3000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                    }
                });
                if (!response.ok) {
                    console.log("Failed to get the all users data", this.token);
                }
                const result = await response.json();
                console.log(result);
                this.userData = result;
                this.userCount = result.length;
            }
            catch (error) {
                console.log(error);
            }
        },
        getLoginData() {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            this.token = loggedInUser.token;
            console.log("This is the user token", this.token);
        },
        redirctToInd(user) {
            this.userId = user.id;
            console.log(this.userId);
            // router.push('./indListing');
            router.push({ name: 'IndividualUserListing', params: { userId: this.userId } });
        },
        openModelFunc(){
            document.addEventListener('DOMContentLoaded', function() {
                var elems = document.querySelectorAll('.modal');
                var instances = M.Modal.init(elems);
            });
        },

        async deleteUser(user){
            // alert(`Are you sure you want to delete ${user.id}?`);
            try{
                const response = await fetch(`http://localhost:3000/api/user/${user.id}`, {
                method: 'DELETE',
                headers: {
                        'Authorization': `Bearer ${this.token}`,
                    }
            });
            }
            catch(error){
                console.log("This is the delete function error", error)
            }

        }
    },
    components: { NavBar, SideBar }
}
</script>

<style>
    h3{
        text-align: center;
        /* margin: 5px auto; */
    }
    /* #tableDiv{
        max-width: 800px;
        margin: 5px auto;
    }
    table{
        width: 100%;
        border-collapse: collapse;
    }
    td, th{
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    th{
        background-color: #f2f2f2;
    }
    tr:hover{
        background-color: #f5f5f5; 
    } */
</style>