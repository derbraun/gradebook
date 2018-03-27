var app = new Vue({
    el: '#app',
    data: {
        items: [],
        name: '',
        drag: {},
        grade: '',
        selected: 'ALL',
        selectedText: '',
        letters: [
            {text: 'A', value: 'A'},
            {text: 'B', value: 'B'},
            {text: 'C', value: 'C'},
            {text: 'D', value: 'D'},
            {text: 'E (because we don\'t fail people)', value: 'E'}
        ]
    },
    created: function () {
        this.getItems();
    },
    computed: {
        filteredItems: function() {
            if (this.selected === 'A') {
                return this.items.filter(function (item) {
                    return item.grade === 'A';
                });
            }
            if(this.selected === 'B'){
                return this.items.filter(function (item) {
                    return item.grade === 'B';
                });
            }
            if(this.selected === 'C'){
                return this.items.filter(function (item) {
                    return item.grade === 'C';
                });
            }
            if(this.selected === 'D'){
                return this.items.filter(function (item) {
                    return item.grade === 'D';
                });
            }
            if(this.selected === 'E'){
                return this.items.filter(function (item) {
                    return item.grade === 'E';
                });
            }

            return this.items;

        }
    },

    methods: {
        showAll: function () {
            this.selected = 'ALL';
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
        dropItem: function(item) {
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
        getItems: function() {
            axios.get("/grades").then(response => {
                this.items = response.data;
                return true;
            }).catch(err => {
                console.log(err);
            });
        },

        addItem: function() {
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
        deleteItem: function(item) {
            axios.delete("/grades/" + item.id).then(response => {
                this.getItems();
                return true;
            }).catch(err => {
                console.log(err);
            });
        },

    }
});