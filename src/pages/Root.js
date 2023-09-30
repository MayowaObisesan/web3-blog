import React from "react";
import Header from "../component/Header";
import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <section className={""}>
            <Header />
            <Outlet />
        </section>
    );
};

export default Root;
