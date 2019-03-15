import AuthProvider from './AuthProvider';
import promiseXHR from './ServerFun';
import {API_PATH} from "../constants/OriginName";

export const getCityJson = () => {
    return promiseXHR(API_PATH + '/basis-api/noauth/region/download?version=1', null, null, "GET")
}

export const getHospital = () => {
    return AuthProvider.getAccessToken().then(token => {
        return promiseXHR(API_PATH + '/basis-api/authsec/hospitals', {type: 'bearer', value: token}, null, "GET")
    })
}
//group person list
export const getGroupPerson = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = `/groupadmin-api/authsec/groupadmin/tenant/${params.groupId}/members?_page=${params.currentPage}&_size=${params.pageSize}`;
        if (params.nickName) {
            url = `/groupadmin-api/authsec/groupadmin/tenant/${params.groupId}/members?_page=${params.currentPage}&_size=${params.pageSize}&nickName=${params.nickName}`;
        }
        return promiseXHR(API_PATH + url, {type: 'bearer', value: token}, null, "GET")
    })
}
//group member message
export const getMemberMessage = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupadmin-api/authsec/groupadmin/tenant/${params.groupId}/member/${params.memberId}`;
        return promiseXHR(url, {type: 'bearer', value: token}, null, 'GET');
    })
}
//update member message
export const putMemberMessage = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupadmin-api/authsec/groupadmin/tenant/${params.groupId}/member/${params.memberId}`;
        return promiseXHR(url, {type: 'bearer', value: token}, params.query, 'PUT');
    })
}
//delete group member 废弃
export const deleteMember = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupadmin-api/authsec/memberprivilege/removemembers`;
        return promiseXHR(url, {type: 'bearer', value: token}, params.query, 'POST');
    })
}

//get tenement tag;

export const getUserTag = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/groupadmin-api/authsec/groupadmin/tenant/grouplabels';
        return promiseXHR(url, {type: 'bearer', value: token}, null, "GET");
    })
}
// get group, from tag
export const getSearchGroup = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/groupadmin-api/authsec/groupadmin/tenant/groups?_page=0';
        return promiseXHR(url, {type: 'bearer', value: token}, params, "POST");
    })
}

//get custom h5 content
export const getCustomH5Content = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/support/file/content?id=' + params.id;
        return promiseXHR(url, {type: 'bearer', value: token}, null, "GET");
    })
}


//post group task list page
export const getGroupTaskList = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/tasks';
        return promiseXHR(url, {type: 'bearer', value: token}, params, "POST");
    })
}

// add new group task
/**
 * force:true，去重保存，false：重新保存
 * @param {*} params
 */
export const addGroupTask = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/task?force=' + params.force;
        return promiseXHR(url, {type: 'bearer', value: token}, params.query, "POST");
    })
}

//update group task
export const updateGroupTask = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/task?force=' + params.force;
        return promiseXHR(url, {type: 'bearer', value: token}, params.query, "PUT");
    })
}

//get group task
export const getGroupTask = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/task?needExcResult=' + params.force + '&id=' + params.id;
        return promiseXHR(url, {type: 'bearer', value: token}, null, "GET");
    })
}

//cancel group task
export const cancelGroupTask = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/publishtask?taskId=' + params.id;
        return promiseXHR(url, {type: 'bearer', value: token}, null, "DELETE");
    })
}
//delete group task
export const deleteGroupTask = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/task';
        return promiseXHR(url, {type: 'bearer', value: token}, params.ids, "DELETE");
    })
}


//inquire group title list
export const inquireGroupTitle = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/task/titles';
        return promiseXHR(url, {type: 'bearer', value: token}, params, "POST");
    })
}

//get tenement's user
export const getTenementUser = () => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/sys/users';
        return promiseXHR(url, {type: 'bearer', value: token}, null, "GET");
    })
}

//export tack execute result
export const getExport = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/task/' + params + '/export';
        return promiseXHR(url, {type: 'bearer', value: token}, null, "GET");
    })
}

//get home page group task;
export const getHomePageTask = () => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/taskadminapi/authsec/v2/index/tasks';
        return promiseXHR(url, {type: 'bearer', value: token}, null, "GET");
    })
}


//get keyword num
export const getKeyWordsNum = () => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + '/groupadmin-api/authsec/groupadmin/tenant/keyword/ruleaction/summary';
        return promiseXHR(url, {type: 'bearer', value: token}, null, "GET")
    })
};

//get keywords list

export const getKeyWordsList = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupadmin-api/authsec/groupadmin/v2/tenant/keyword/rules?page=${params.currentPage}&size=${params.pageSize}`;
        return promiseXHR(url, {type: 'bearer', value: token}, null, "GET")
    })
};

// open/close keyword rule
export const onOffRule = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupadmin-api/authsec/groupadmin/tenant/keyword/rule/${params.id}?_status=${params.status}`;
        return promiseXHR(url, {type: 'bearer', value: token}, null, "DELETE")
    })
};

//get keyword detail
export const getKeyWordDetail = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupadmin-api/authsec/groupadmin/v2/tenant/keyword/rule/${params.id}`;
        if (params.startTime) {
            url = API_PATH + `/groupadmin-api/authsec/groupadmin/v2/tenant/keyword/rule/${params.id}?startTime=${params.startTime}&endTime=${params.endTime}`;
        }
        return promiseXHR(url, {type: 'bearer', value: token}, null, "GET")
    })
};

// see keyword record

export const seeKeywordRecord = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupadmin-api/authsec/groupadmin/tenant/keyword/message/${params.id}?_currentPage=${params.currentPage}&_pageSize=${params.pageSize}`;
        return promiseXHR(url, {type: 'bearer', value: token}, null, "GET")
    })
};

//save keyword rule
export const saveKeywordRule = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupadmin-api/authsec/groupadmin/v2/tenant/keyword/rule`;
        return promiseXHR(url, {type: 'bearer', value: token}, params, "POST")
    })
};
//update keyword rule
export const updateKeywordRule = (params) => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupadmin-api/authsec/groupadmin/tenant/keyword/rule?_id=${params.id}`;
        return promiseXHR(url, {type: 'bearer', value: token}, params.query, "PUT")
    })
};


export const getKeywordRule=(params)=>{
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupadmin-api/authsec/groupadmin/tenant/keyword/rule/${params}`;
        return promiseXHR(url, {type: 'bearer', value: token}, null, "GET")
    })
}

