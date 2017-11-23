import * as React from "react";
import { Grid } from "react-bootstrap";
import {Card} from "./Card";

    interface BaseProps {
        children?: any;
    }

    export const Base: React.StatelessComponent<BaseProps> = (props: BaseProps) => {
        return (
            <Grid fluid={true} className="base-grid">
                <Card>
                    { props.children }
                </Card>
            </Grid>
        );
};
