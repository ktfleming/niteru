import * as React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import {TextFieldInput} from "./form/FieldInputs";
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import {dispatch} from "../index";
import {doSearch} from "../actions/search";

interface SearchFormData {
    query: string;
}

interface SearchPanelProps extends InjectedFormProps<SearchFormData, {}> {

}

class SearchPanel extends React.Component<SearchPanelProps> {
    protected onSubmit = (values: SearchFormData) => {
        dispatch(doSearch(values.query));
    }

    public render() {
        const { handleSubmit } = this.props;
        return (
            <form className="search-panel" onSubmit={handleSubmit(this.onSubmit)}>
                <Row>
                    <Col xs={12} md={4} mdOffset={4}>
                        <InputGroup className="search-group">
                            <Field component={TextFieldInput}
                                   placeholder="猫"
                                   name="query" />
                            <InputGroup.Button>
                                <Button type="submit" className="">Search</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </Col>
                </Row>
            </form>
        );
    }
}

export default reduxForm({
    form: "search"
})(SearchPanel);
