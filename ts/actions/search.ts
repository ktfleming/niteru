import {Action, Dispatch} from "redux";
import {Kanji} from "../types/kanji";
import {Thunk} from "../types/react-types";
import {GlobalState} from "../reducers/index";
import * as fetch from "isomorphic-fetch";

export interface SearchLoading extends Action {
    type: "search:loading";
}

export interface ReceivedSearchResults extends Action {
    type: "search:received_results";
    payload: Kanji[];
}

export interface SetQuery extends Action {
    type: "search:set_query";
    payload: string;
}

const searchLoading: SearchLoading = {
    type: "search:loading"
};

function received(kanji: Kanji[]): ReceivedSearchResults {
    return {
        type: "search:received_results",
        payload: kanji
    };
}

function setQuery(query: string): SetQuery {
    return {
        type: "search:set_query",
        payload: query
    };
}

export function doSearch(query: string): Thunk {
    return (dispatch: Dispatch<GlobalState>, getState: () => GlobalState): any => {
        dispatch(searchLoading);
        dispatch(setQuery(query));
        return fetch(`/similar/${query}`).then((response: any) => {
            return response.json();
        }).then((data: any) => {
            dispatch(received(data["items"]));
        }).catch((error: any) => {
            console.error(error);
        })
    }
}
