var app = new Vue({
    el: '#app',
    data: {
        items: [],
        name: '',
        drag: {},
        grade: '',
        letters: [
            {text: 'A', value: 'A'},
            {text: 'B', value: 'B'},
            {text: 'C', value: 'C'},
            {text: 'D', value: 'D'},
            {text: 'E because we don\'t fail people', value: 'F'}
        ]
    },
});