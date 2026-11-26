import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SinglePredictionsPage from "../components/app_components/PredictionsPage/SinglePredictionsPage";
import PredictionProjectLayoutPage from "../components/app_components/PredictionsPage/PredictionProjectLayoutPage";
import SingleParametersPage from "../components/app_components/ParametersPage/SingleParametersPage";
import ParameterProjectLayoutPage from "../components/app_components/ParametersPage/ParameterProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/predictions/:singlePredictionsId" exact element={<SinglePredictionsPage />} />
<Route path="/predictions" exact element={<PredictionProjectLayoutPage />} />
<Route path="/parameters/:singleParametersId" exact element={<SingleParametersPage />} />
<Route path="/parameters" exact element={<ParameterProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
