import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

export default function UserTheme(){
    return (
        <Fragment>
            <Header/>
            <div style={{paddingTop: 72}}></div>
            <Outlet/>
            <Footer/>
        </Fragment>
    );
}