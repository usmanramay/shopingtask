import {createStore,combineReducers} from 'redux';
import loginReducer from './reducers/login';
import postaddReducer from './reducers/postaddReducer';
import fetchdata from './reducers/fetchdata';

const store =createStore(combineReducers({loginReducer,postaddReducer,fetchdata}));

export default store;