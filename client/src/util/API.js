import axios from 'axios';
export default {
    addUser: function(newUser) {
        return axios.post("/api/signup", newUser);
    },
    getUserInfo: function(token) {
        
        return axios.get("/api/getuser",{
            headers: {
            "Authorization": `Bearer ${token}`
        }
        })
    },
    login: function(user){
        return axios.post("/api/login", user);
    }
}
