export const CODReducer = (state = true, action) => {
  switch (action.type) {
    case "COD":
      return action.payload;
    default:
      return state;
  }
};
