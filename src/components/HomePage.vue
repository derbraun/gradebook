<template>
    <div>
        <div v-if="loggedIn">
            <Grades/>
        </div>
        <div v-else>
            <Login/>
        </div>


    </div>
</template>

<script>
    import Grades from './Grades';
    import Login from './Login';
    import Register from "./Register";
    export default {
        name: "Main",
        components: {Register, Grades,Login},
        computed: {
            loggedIn: function () {
                return this.$store.getters.loggedIn;
            }
        }
    }
</script>

<style scoped>

</style>