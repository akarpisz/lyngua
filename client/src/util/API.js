import axios from "axios";

export default {
  addUser: function (newUser) {
    return axios.post("/api/signup", newUser);
  },
  getUserInfo: function (token) {
    return axios.get("/api/getuser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  login: function (user) {
    return axios.post("/api/login", user);
  },
  getLanguages: function () {
    return axios.get("/api/supportedlangs");
  },
  translate: function (trans, token) {
    console.log(token);
    return axios.post(
      "/api/newtrans",
      { data: trans },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  getTrans: function (token) {
    return axios.get("/api/savedtrans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateTrans: function (token, transID, newFavState) {
    const config = {
      method: "PUT",
      url: "/api/startrans",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id: transID,
        newState: newFavState
      },
    }
    return axios(config);
  },
  deleteTrans: function (token, transID) {
    const config = {
      method: "DELETE",
      url: "/api/deltrans",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      data: {
        id: transID
      },
    };
    return axios(config);
  },
  emailTrans: function (id, token) {
    
    const config = {
      method: "POST",
      url: "/api/email",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      data: {
        id: id
      },
    };
  
    return axios(config);
  }
};
