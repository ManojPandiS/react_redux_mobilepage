import { combineReducers } from "redux";
import userReducer from "./users/userReduce";

const rootReducer = combineReducers({
    users : userReducer
})

export default rootReducer