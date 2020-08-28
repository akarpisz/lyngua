import axios from 'axios';
export default {
    addUser: function(newUser) {
        return axios.post("/api/signup", newUser);
    },
    getUserInfo: function(user) {

    },
    login: function(user){
        return axios.post("/api/login", user);
    }
}
