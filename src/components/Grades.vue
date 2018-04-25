<template>
    <div>
        <span class="right" ><a @click="logout" href="#">Logout</a></span>
        <h1>Welcome to Gradebook </h1>


        <div id="app">
            <form v-on:submit.prevent="addItem">
                <input type="text" v-model="student" placeholder="Enter Student's Name">
                <select v-model="grade">
                    <option disabled value="">Please select one</option>
                    <option v-for="alpha in letters" v-bind:value="alpha.value">
                        {{alpha.text}}
                    </option>
                    <button type="submit"> Submit Grade</button>
                </select>
                <input type = "text" v-model="desc" placeholder="Enter the Name of the Assignment">
                <button type="submit">Add</button>
            </form>

            <div class="controls">
                <button v-on:click="showAll()">Show All</button>
                <button v-on:click="show_A()">Show only As</button>
                <button v-on:click="show_B()">Show only Bs</button>
                <button v-on:click="show_C()">Show only Cs</button>
                <button v-on:click="show_D()">Show only Ds</button>
                <button v-on:click="show_E()">Show only Es</button>
            </div>
            <br />
            <span>Currently Viewing: {{ selected }} Grades</span>

            <ul>
                <li v-for="grade in filteredItems">
                    <label v-bind:class="{ selected: grade.selected }"><span id = name><u>Name: {{ grade.student }}</u></span> <br><br>
                        <span>Grade: {{grade.grade}}</span>
                        <span id="desc">Desc: {{ grade.desc}}</span></label>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Grades",
        data(){
            return{
                student: '',
                desc: '',
                grade: '',
                selected: 'ALL',
                letters: [
                    {text: 'A', value: 'A'},
                    {text: 'B', value: 'B'},
                    {text: 'C', value: 'C'},
                    {text: 'D', value: 'D'},
                    {text: 'E (because we don\'t fail people)', value: 'E'}
                ],
            }
        },

        created: function () {
            this.getItems();
        },
        computed: {
            cache: false,
            items: function(){
                return this.$store.getters.items;
            },

            filteredItems: function () {
                if (this.selected === 'A') {
                    return this.items.filter(function (item) {
                        return item.grade === 'A';
                    });
                }
                if (this.selected === 'B') {
                    return this.items.filter(function (item) {
                        return item.grade === 'B';
                    });
                }
                if (this.selected === 'C') {
                    return this.items.filter(function (item) {
                        return item.grade === 'C';
                    });
                }
                if (this.selected === 'D') {
                    return this.items.filter(function (item) {
                        return item.grade === 'D';
                    });
                }
                if (this.selected === 'E') {
                    return this.items.filter(function (item) {
                        return item.grade === 'E';
                    });
                }

                return this.items;

            }
        },


        methods: {

            //Filter Buttons
            showAll: function () {
                this.selected= 'ALL';
            },
            show_A: function () {
                this.selected = 'A';
            },
            show_B: function () {
                this.selected = 'B';
            },
            show_C: function () {
                this.selected = 'C';
            },
            show_D: function () {
                this.selected = 'D';
            },
            show_E: function () {
                this.selected = 'E';
            },

            getItems: function () {
                this.$store.dispatch('getItems');

            },

            addItem: function () {
                console.log("Student is:" + this.student);

                this.$store.dispatch('addItem',{
                    student: this.student,
                    grade: this.grade,
                    desc: this.desc,
                }).then(response => {
                    this.student = "";
                    this.grade = "";
                    this.desc = "";
                });

            },
            logout: function() {
                this.$store.dispatch('logout');
            },
        }
    }
</script>

<style scoped>
    #desc{
        padding-left: 10em;
    }
    #name{
        font-size: 1.5em;

    }
</style>