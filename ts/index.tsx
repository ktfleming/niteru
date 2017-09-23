import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { rootReducers } from "./reducers";
import { Provider } from "react-redux";
import {routes} from "./reducers/routes";
import thunkMiddleware from "redux-thunk";
import * as createLogger from "redux-logger";
import "../styles/main.scss";

// const loggerMiddleware = createLogger();

const store = createStore(
    rootReducers,
    applyMiddleware(
        thunkMiddleware
//        loggerMiddleware
    )
);

export const dispatch = store.dispatch;

const rootElement = document.querySelector("#root");
ReactDOM.render(
    <Provider store={ store }>
        { routes }
    </Provider>,
    rootElement
);
