import userservices from "../../services/user";
let initialState = {
  in_process: "false",
  loggedInUser: "false"
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "user_sign-in":
      userservices.login({
        username: action.username,
        password: action.password
      });
      return {
        in_process: "true"
        // loggedInUser:'true'
      };

    case "user_signed_success":
      return {
        ...state,
        in_process: "false",
        loggedInUser: "true",
        loggeduserdata: action.payload
      };

    case "user_loggedout_success":
      return {
        loggedInUser: action.loggedInUser
      };

    case "user_sign-up":
      userservices.signup({
        ...action
      });
      return {
        in_process: "true"
      };
      break;

    case "user_signing_error":
      return {
        in_process: "some issue"
      };
      break;
  }

  return state;
};

export default loginReducer;
