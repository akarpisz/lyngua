import React, {createContext} from "react";

const LoginContext = createContext({
    loggedIn: false,
    username: "",
});

export default LoginContext;
