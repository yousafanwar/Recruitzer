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
import router from '@/router';

    export default{
    data() {
        return {
            token: '',
            userData: []
        };
    },
    props: {
        userId: String
    },
    mounted() {
        this.getLoginData();
        this.fetchData();
        this.printToLog();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/api/user/${this.userId}`, {
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
        printToLog() {
            console.log(this.userId);
        }
    },
    components: { NavBar, SideBar }
}
</script>

<style>
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