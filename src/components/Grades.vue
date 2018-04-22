<template>
    <h1>Welcome to Gradebook </h1>

    <div id="app">
        <form v-on:submit.prevent="addItem">
            <input type="text" v-model="name">
            <select v-model="grade">
                <option disabled value="">Please select one</option>
                <option v-for="alpha in letters" v-bind:value="alpha.value">
                    {{alpha.text}}
                </option>
                <button type="submit"> Submit Grade</button>
            </select>
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
            <li v-for="grade in filteredItems" draggable="true" v-on:dragstart="dragItem(grade)" v-on:dragover.prevent v-on:drop="dropItem(grade)">
                <label v-bind:class="{ selected: grade.selected }"><span>Name:{{ grade.name }}</span> <br> <span>Grade: {{grade.grade}}</span></label>
                <button v-on:click="deleteItem(grade)" class="delete">X</button>
            </li>
        </ul>

    </div>

</template>

<script>
    export default {
        name: "Grades",
        data(){
          return{
              selected: 'ALL',
          }
        },

        created: function () {
            this.getItems();
        },
        computed: {
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
            dragItem: function (item) {
                this.drag = item;
            },

            //TODO: Call from the store here.
            dropItem: function (item) {
                axios.put("/grades/" + this.drag.id, {
                    name: this.drag.name,
                    grade: this.drag.grade,
                    selected: this.drag.selected,
                    orderChange: true,
                    orderTarget: item.id,
                }).then(response => {
                    this.getItems();
                    return true;
                }).catch(err => {
                    console.log(err);
                });
            },
            getItems: function () {
                axios.get("/grades").then(response => {
                    this.items = response.data;
                    return true;
                }).catch(err => {
                    console.log(err);
                });
            },

            addItem: function () {
                axios.post("/grades", {
                    name: this.name,
                    grade: this.grade,
                    selected: this.selected,
                }).then(response => {
                    this.name = "";
                    this.getItems();
                    return true;
                }).catch(err => {
                    console.log(err);
                });
            },
            deleteItem: function (item) {
                axios.delete("/grades/" + item.id).then(response => {
                    this.getItems();
                    return true;
                }).catch(err => {
                    console.log(err);
                });
            },
        }
    }
</script>

<style scoped>

</style>