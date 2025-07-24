import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authorization from "./Authorization";
import RecoverPassword from "../shared/recover-password/RecoverPassword";
import Dashboard from "./Dashboard";

function AuthorizationMain() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/reset-password/:token" element={<Authorization isResetMode={true} />} />
                <Route path="/*" element={<Authorization />} />
                <Route path="/after-service-authorization" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AuthorizationMain;
