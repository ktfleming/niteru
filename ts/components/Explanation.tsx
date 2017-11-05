import * as React from 'react';
import { connect } from "react-redux";
import { GlobalState } from "../reducers/index";
import { Kanji } from "../types/kanji";

interface ExplanationProps {
    kanji?: string;
    results?: Kanji[];
}

class Explanation extends React.Component<ExplanationProps, {}> {
    public render() {
        const { kanji, results } = this.props;
        if (!kanji) {
            return null;
        }
        const message = results.length > 0 ?
            `Showing nearest matches for ${kanji}. Click on a kanji to run another search.` :
            `No results found for ${kanji}.`;
        return (
            <div className="explanation">
                { message }
            </div>
        );
    }
}

function mapStateToProps(state: GlobalState): ExplanationProps {
    return {
        kanji: state.search.query,
        results: state.search.results
    };
}

export default connect(mapStateToProps)(Explanation);
