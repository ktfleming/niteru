import * as React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import {TextFieldInput} from "./form/FieldInputs";
import { Button } from "react-bootstrap";
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
                <div className="pt-control-group search-group">
                    <Field component={TextFieldInput}
                           placeholder="猫"
                           name="query" />
                    <Button type="submit" className="pt-button pt-large">Search</Button>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: "search"
})(SearchPanel);
