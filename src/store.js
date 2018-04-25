import Vue from 'vue';
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        items: [],
        user: {},
        loggedIn: false,
        loginError: '',
        record: {},
    },

    getters: {
        items: state => state.items,
        loggedIn: state => state.loggedIn,
        loginError: state => state.loginError,
        desc: state => state.desc,
        user: state => state.user,
        record: state => state.record,
    },

    mutations: {
        setItems(state,items){
            state.items = items;
        },
        setLogin(state,status){
            state.loggedIn = status;
        },
        setLoginError(state, message){
            state.loginError = message;
        },
        setUser(state,user){
            state.user = user;
        },
        setGrade(state,grade){
            state.grade = grade;
        },
        setRecord(state,record){
            state.record = record;
        }
    },

    actions:{

        //Login call for user
        login(context,user) {
            console.log("In login store");

            axios.post("/api/login",user).then(response => {
                context.commit('setUser', response.data.user);
                context.commit('setLogin',true);
                context.commit('setLoginError',"");
            }).catch(error => {
                if (error.response) {
                    if (error.response.status === 403 || error.response.status === 400)
                        context.commit('setLoginError',"Invalid login.");
                    return;
                }
                context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
            });
        },

        //Call to log user out
        logout(context,user) {
            context.commit('setUser', {});
            context.commit('setLogin',false);
        },


        //Register call
        register(context,user) {
            axios.post("/api/users",user).then(response => {
                context.commit('setUser', response.data.user);
                context.commit('setLogin',true);
                context.commit('setLoginError',"");
            }).catch(error => {
                context.commit('setLoginError',"");
                context.commit('setLogin',false);

                //403 error = email exists
                //409 error = username exists

            });
        },

        //Calls for all items from server
        getItems(context) {

            axios.get("/api/grades").then(response => {
                context.commit('setItems', response.data.grades[0]);
            }).catch(err => {
                console.log("Something blew up on getItems axios call");
                console.log(err);
            });
        },

        //Adds an item to the server
        addItem: function (context, record) {

            axios.post("/api/grades", record).then(response => {
                context.commit('setRecord', response.data.record);

            }).catch(err => {
                console.log("Something blew up on addItem axios call");
                console.log(err);
            });
        },
    }
});