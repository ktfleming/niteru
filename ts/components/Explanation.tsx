import * as React from 'react';
import { connect } from "react-redux";
import { GlobalState } from "../reducers/index";

interface ExplanationProps {
    kanji?: string;
}

class Explanation extends React.Component<ExplanationProps, {}> {
    public render() {
        const { kanji } = this.props;
        if (!kanji) {
            return null;
        }
        return (
            <div className="explanation">
                { `Showing nearest matches for ${kanji}.`}
            </div>
        );
    }
}

function mapStateToProps(state: GlobalState): ExplanationProps {
    return {
        kanji: state.search.query
    };
}

export default connect(mapStateToProps)(Explanation);
