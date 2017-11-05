import * as React from "react";
import SearchPanel from "./SearchPanel";
import SearchResults from "./SearchResults";
import Explanation from "./Explanation";
import { RouteComponentProps } from "react-router";
import { About } from "./About";

interface SearchScreenProps extends RouteComponentProps<any> {

}

export const SearchScreen: React.StatelessComponent<SearchScreenProps> = () => {
    return (
        <div className="search-screen">
            <SearchPanel />
            <Explanation />
            <SearchResults />
            <About />
        </div>
    );
};
