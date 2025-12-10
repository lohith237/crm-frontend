
export const loginMiddleware = (store) => (next) => (action) => {
  if (action.type === "LOGIN_SUCCESS") {
    console.log("Login successful:", action.payload.user);
  }

  if (action.type === "LOGIN_FAILURE") {
    console.log("Login failed:", action.payload.data.message);
  }
  return next(action);
};
