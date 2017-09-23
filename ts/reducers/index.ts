import {SearchState, searchStateReducer} from "./searchstate";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

export type GlobalState = {
    search: SearchState;
}

export const rootReducers = combineReducers<GlobalState>({
    search: searchStateReducer,
    form: formReducer
});
