import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/app/Layout";

var urlElements = {};

const app = document.getElementById('app');
ReactDOM.render(<Layout urlElements={urlElements}/>, app);