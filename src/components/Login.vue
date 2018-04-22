<template>
    <div>
        <h1>Welcome to Gradebook</h1>
        <h2>A simple gradebook for your class</h2>

        <form v-on:submit.prevent="login">
            <p>Enter your username and password</p>
            <input v-model="username" placeholder="Username">
            <input v-model="password" type="password" placeholder="Password">
            <button class="primary" type="submit">Login</button>
        </form>

        <h5><i>TAs: your username is admin and your password is p@$$w0rd</i></h5>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                username: '',
                password: '',
            }
        },
        computed: {
            user: function () {

            },
            loggedIn: function () {

            },
            loginError: function () {

            },
        },
        methods: {
            login: function(){

            }
        }

    }
</script>

<style scoped>

</style>