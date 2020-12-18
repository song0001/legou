import request from "../request"

//意见反馈
function submitAction(data) {
    return request({
        method: "post",
        url: "/feedback/submitAction",
        data,
    })
}


export {
    submitAction
}