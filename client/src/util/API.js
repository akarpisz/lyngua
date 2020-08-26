import axios from 'axios';
export default {
    addUser: function(newUser) {
        console.log(newUser);
        console.log(typeof newUser);
        axios.post("/api/signup", {
            body: newUser,
        }).then(res =>{
            console.log(res.status);
            return res;
        }).catch(err =>{
            console.log(err);
            return err;
        })
    }
}
