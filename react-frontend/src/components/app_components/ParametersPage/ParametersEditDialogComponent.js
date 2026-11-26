/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from "primereact/calendar";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ParametersEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            modelType: _entity?.modelType,
accuracyNumber: _entity?.accuracyNumber,
timeStampOfVideo: _entity?.timeStampOfVideo,
numberOfPeople: _entity?.numberOfPeople,
        };

        setLoading(true);
        try {
            
        const result = await client.service("parameters").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info parameters updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit Model Parameters" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="parameters-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="modelType">Model Type:</label>
                <InputText id="modelType" className="w-full mb-3 p-inputtext-sm" value={_entity?.modelType} onChange={(e) => setValByKey("modelType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["modelType"]) && (
              <p className="m-0" key="error-modelType">
                {error["modelType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="accuracyNumber">Accuracy Number:</label>
                <InputNumber tooltip="Use only numbers" id="accuracyNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.accuracyNumber} onChange={(e) => setValByKey("accuracyNumber", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["accuracyNumber"]) && (
              <p className="m-0" key="error-accuracyNumber">
                {error["accuracyNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="timeStampOfVideo">Time Stamp Of Video:</label>
                <Calendar id="timeStampOfVideo"  value={_entity?.timeStampOfVideo ? new Date(_entity?.timeStampOfVideo) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("timeStampOfVideo", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["timeStampOfVideo"]) && (
              <p className="m-0" key="error-timeStampOfVideo">
                {error["timeStampOfVideo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="numberOfPeople">Number Of People:</label>
                <InputNumber tooltip="Use only numbers" id="numberOfPeople" className="w-full mb-3 p-inputtext-sm" value={_entity?.numberOfPeople} onChange={(e) => setValByKey("numberOfPeople", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["numberOfPeople"]) && (
              <p className="m-0" key="error-numberOfPeople">
                {error["numberOfPeople"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ParametersEditDialogComponent);
