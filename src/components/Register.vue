<!--This page is for initial set up so the bcrypt password gets the right salts.-->
<!--On the live site, this will not show up, as it would appear on the imaginary admin section-->


<template>
    <form v-on:submit.prevent="register">
        <p>1. Choose a user name.</p>
        <input class="narrow" v-model="username" placeholder="User Name">
        <p>2. Create an account.</p>
        <input class="wide" v-model="name" placeholder="First and Last Name"><br/>
        <input class="narrow" v-model="email" placeholder="Email Address">
        <input class="narrow" type="password" v-model="password" placeholder="Password">
        <button class="alternate" type="submit">Register</button>
    </form>
</template>

<script>
    export default {
        name: "Register",
        data () {
            return {
                username: '',
                email: '',
                password: '',
                name: '',
            }
        },

        methods: {
            register: function() {
                this.$store.dispatch('register',{
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    name: this.name,
                });
            }
        }
    }
</script>

<style scoped>

</style>