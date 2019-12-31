let initialstate = {
  data: "No data found.."
};

let fetchdata = (state = initialstate, action) => {
  switch (action.type) {
    case "fetchdata":
      return {
        ...action
      };
  }
  return state;
};

export default fetchdata;
