import Vue from 'vue';
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        items: [],
        name: '',
        drag: {},
        grade: '',
        selectedText: '',
        letters: [
            {text: 'A', value: 'A'},
            {text: 'B', value: 'B'},
            {text: 'C', value: 'C'},
            {text: 'D', value: 'D'},
            {text: 'E (because we don\'t fail people)', value: 'E'}
        ],
        loggedIn: false,
        loginError: '',
    },

    getters: {
        items: state => state.items,
        name: state => state.name,
        drag: state => state.drag,
        grade: state => state.grade,
        selectedText: state => state.selectedText,
        letters: state => state.letters,
        loggedIn: state => state.loggedIn,
        loginError: state => state.loginError,
    },

    mutations: {
        setItems(state,items){
            state.items = items;
        },
        setName(state,name){
            state.name = name;
        },
        setDrag(state,drag){
            state.drag = drag;
        },
        setGrade(state,grade){
            state.grade = grade;
        },
        setSelectedText(state,selectedText){
            state.selectedText = selectedText;
        },
        setLetters(state,letters){
            state.letters = letters;
        },
        setLogin(state,status){
            state.loggedIn = status;
        },
        setLoginError(state, message){
            state.loginError = message;
        },

    },

    actions:{

        //Login call for user
        login(context, user){
            axios.post("/grades/login", user).then(response =>{
                context.commit('setUser', response.data.user);
                context.commit('setLogin', true);
                context.commit('setRegisterError', "");
                context.commit('setLoginError', "");
            }).catch(error => {
                context.commit('setRegisterError', "");
                if (error.response) {
                    if (error.response.status === 403 || error.response.status === 400)
                        context.commit('setLoginError', "Invalid login.");
                    context.commit('setRegisterError', "");
                    return;
                }
                context.commit('setLoginError', "Sorry, your request failed. We will look into it.");
            });
        },

        //Call to log user out
        logout(context, user) {
            context.commit('setUser', {});
            context.commit('setLogin', false);
        },

        //Allows Drag and Drop in Chrome
        dragItem: function (item) {
            this.drag = item;
        },

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

        //Calls for all items from server
        getItems: function () {
            axios.get("/grades").then(response => {
                this.items = response.data;
                return true;
            }).catch(err => {
                console.log(err);
            });
        },

        //Adds an item to the server
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

        //Removes an Item from the server
        deleteItem: function (item) {
            axios.delete("/grades/" + item.id).then(response => {
                this.getItems();
                return true;
            }).catch(err => {
                console.log(err);
            });
        },
    }
});