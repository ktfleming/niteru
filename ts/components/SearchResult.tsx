import * as React from "react";
import {Kanji} from "../types/kanji";
import * as classnames from "classnames";
import { dispatch } from "../index";
import { doSearch } from "../actions/search";

interface DescriptionLineProps {
    items: string[];
    noneMessage: string;
}

const DescriptionLine: React.StatelessComponent<DescriptionLineProps> = (props: DescriptionLineProps) => {
    const { items, noneMessage } = props;
    const joined = items.length > 0 ? items.join(", ") : noneMessage;
    const classes = classnames({
        none: items.length === 0
    });
    return (
        <div className="description-line">
            <span className={classes}> { joined } </span>
        </div>
    );
};

interface SearchResultProps {
    result: Kanji;
}

export const SearchResult: React.StatelessComponent<SearchResultProps> = (props: SearchResultProps) => {
    const { result } = props;

    const search = () => {
        dispatch(doSearch(result.value));
    };

    return (
        <div key={result.value} className="search-result">
            <div className="kanji" onClick={search.bind(this)}>{ result.value }</div>
            <div className="right-panel">
                <DescriptionLine items={result.kanjiDic.onYomi} noneMessage="No on-yomi found" />
                <DescriptionLine items={result.kanjiDic.kunYomi} noneMessage="No kun-yomi found" />
                <DescriptionLine items={result.kanjiDic.meanings} noneMessage="No meanings found" />
            </div>
        </div>
    );
};
