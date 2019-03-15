import AuthProvider from './AuthProvider';
import promiseXHR from './ServerFun';
import {API_PATH} from "../constants/OriginName";

export const addMoment = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/moment';
        return promiseXHR(url, {type: 'bearer', value: token}, params, 'POST');
    })
}
export const delMoment = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/moment/' + params;
        return promiseXHR(url, {type: 'bearer', value: token}, null, 'DELETE');
    })
}
export const editMoment = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/moment/' + params.id;
        return promiseXHR(url, {type: 'bearer', value: token}, params, 'PUT');
    })
}
export const getMoment = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/moment/' + params;
        return promiseXHR(url, {type: 'bearer', value: token}, null, 'GET');
    })
}
export const getMomentList = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/moments';
        return promiseXHR(url, {type: 'bearer', value: token}, params, 'POST');
    })
}