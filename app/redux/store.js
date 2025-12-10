import { createStore, combineReducers,applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import { thunk } from "redux-thunk";
import { themeReducer } from "./themeReducer";
import { loginReducer } from "./loginReducer";
import {loginMiddleware} from "./middlewares"
const loginPersistConfig = {
    key: "login",
    storage: sessionStorage,
    whitelist: ["token", "user","isAuthenticated"],
};

const rootReducer = combineReducers({
    theme: themeReducer,
    login: persistReducer(loginPersistConfig, loginReducer),
});

const rootPersistConfig = {
    key: "root",
    storage: localStorage,
    whitelist: ["theme"],
};
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, loginMiddleware)
);
export const persistor = persistStore(store);
