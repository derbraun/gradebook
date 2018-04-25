<template>
    <div>
        <div id="menu">

            <span class="right" v-if="loggedIn">{{user.username}}</span>

            <h1> Welcome to Gradebook</h1>
            <h2> Please enter your username and password.</h2>
            <form class="right" v-on:submit.prevent="login">
                <input v-model="username" placeholder="Username">
                <input v-model="password" placeholder="Password" type="password">
                <button class="primary" type="submit">Login</button>
            </form>
            <h5><i>TAs: Your username is: <u>Grader</u> and password is: <u>password</u></i></h5>
        </div>
        <div class="flexWrapper errorPlace">
            <p v-if="loginError" class="flexRight error">{{loginError}}</p>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                username: '',
                password: '',
            }
        },
        computed: {
            user: function() {
                return this.$store.getters.user;
            },
            loggedIn: function() {
                return this.$store.getters.loggedIn;
            },
            loginError: function() {
                return this.$store.getters.loginError;
            },
        },
        methods: {
            login: function() {

                console.log("in login call");

                this.$store.dispatch('login',{
                    username: this.username,
                    password: this.password,
                }).then(user => {
                    this.username = '';
                    this.password = '';
                });
            },

        }
    }
</script>

<style scoped>

</style>