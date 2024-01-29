// third-party
import { combineReducers } from "redux";

// project import
import adminAuth from "./admin";
import page from "./page";
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ adminAuth, page });

export default reducers;
