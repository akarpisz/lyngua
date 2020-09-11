import axios from "axios";

export default {
  addUser: function (newUser) {
    console.log(newUser);
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
        newState: newFavState,
      },
    };
    return axios(config);
  },
  deleteTrans: function (token, transID) {
    const config = {
      method: "DELETE",
      url: "/api/deltrans",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        id: transID,
      },
    };
    return axios(config);
  },
  msgTrans: function (id, token, recip) {
    const config = {
      method: "POST",
      url: "/api/msgexisting",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        id: id,
        recip: recip,
      },
    };

    return axios(config);
  },

  getMsgs: function (token) {
    const config = {
      method: "GET",
      url: "/api/usermsgs",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    return axios(config);
  },
  newMsg: function (token, msg, recip, toLang) {
    const config = {
      method: "POST",
      url: "/api/usermsgs",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        msg: msg,
        recip: recip,
        lang: toLang
      }
    }
    return axios(config);
  },
  deleteMsg:  function (id, token) {
    const config = {
      method: "DELETE",
      url: "/api/usermsgs",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        id: id
      }
    };
    return axios(config);
  }

};
