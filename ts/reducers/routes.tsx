import * as React from "react";
import {Base} from "../components/Base";
import {SearchScreen} from "../components/SearchScreen";
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";

export const routes =
    <BrowserRouter>
        <div>
            <Base>
                <Route path="/" component={SearchScreen} />
            </Base>
        </div>
    </BrowserRouter>;
