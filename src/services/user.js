import store from "../../src/store/store";
import history from "../history";

const userservices = {
  login: function(data) {
    fetch("http://185.189.50.173:8000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(user => {
        console.log("user", user);
        if (user._id) {
          store.dispatch({
            type: "user_signed_success",
            payload: user
          });
          localStorage.setItem("user", JSON.stringify(user));
          if (user.userType === "Seller") {
            history.push("/dashboard");
          } else {
            history.push("/");
          }
        }
      });
  },
  signup: function(data) {
    fetch("http://185.189.50.173:8000/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(user => {
        store.dispatch({
          type: "user_signed_success",
          payload: user
        });
        history.push("/login");
      });
  }
};

export default userservices;
