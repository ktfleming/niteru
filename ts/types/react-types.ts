import {GlobalState} from "../reducers/index";
import {ThunkAction} from 'redux-thunk';


export type Thunk = ThunkAction<any, GlobalState, void>;
