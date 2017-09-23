import { SearchLoading, ReceivedSearchResults, SetQuery } from "../actions/search";
import {Kanji} from "../types/kanji";
export interface SearchState {
    loading: boolean;
    results: Kanji[];
    query?: string;
}

const initialState: SearchState = {
    loading: false,
    results: []
};

type SearchAction = SearchLoading | ReceivedSearchResults | SetQuery;

export function searchStateReducer(state: SearchState = initialState, action: SearchAction): SearchState {
    switch (action.type) {
        case "search:loading":
            return {...state, loading: true};
        case "search:received_results":
            return {...state, loading: false, results: action.payload};
        case "search:set_query":
            return {...state, query: action.payload};
        default:
            return state;
    }
}
