import * as React from "react";
import {Kanji} from "../types/kanji";
import {connect} from "react-redux";
import {GlobalState} from "../reducers/index";
import {SearchResult} from "./SearchResult";
import CSSProperties = React.CSSProperties;
import { Col, Row } from "react-bootstrap";
import * as Spinner from "react-spinkit";

interface SearchResultsProps {
    results?: Kanji[];
    loading?: boolean;
}

class SearchResults extends React.Component<SearchResultsProps, {}> {
    public render() {
        const { results, loading } = this.props;
        if (loading) {
            return (
                <div className="search-results">
                    <Spinner name="double-bounce" className="spinner"/>
                </div>
            )
        } else {
            return (
                <div className="search-results">
                    <Row>
                        <Col xs={12} md={4} mdOffset={4}>
                        { results.map((result, index) => <SearchResult key={index} result={result}/>) }
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

function mapStateToProps(state: GlobalState): SearchResultsProps {
  return {
      results: state.search.results,
      loading: state.search.loading
  }
}

export default connect(mapStateToProps)(SearchResults);
