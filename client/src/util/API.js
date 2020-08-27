import axios from 'axios';
export default {
    addUser: function(newUser) {
        return axios.post("/api/signup", newUser);
    }
}
