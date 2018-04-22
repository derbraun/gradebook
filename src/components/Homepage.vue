<template>
    <template>
        <div>
            <div v-if="loggedIn">
                <grades/>
            </div>
            <div v-else>
                <login/>
            </div>
        </div>
    </template>
</template>

<script>
    import Grades from './Grades';
    import Login from './Login';
    export default {
        name: "Main",
        components: {Grades,Login},
        computed: {
            loggedIn: function () {
                return this.$store.getters.loggedIn();
            }
        }
    }
</script>

<style scoped>

</style>