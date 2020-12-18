import request from "../request"

//删除收货地址
function deleteAction(data) {
    return request({
        method: "get",
        url: "/address/deleteAction",
        data,
    })
}
// 获取收货地址详情
function detailAction(data) {
    return request({
        method: "get",
        url: "/address/detailAction",
        data,
    })
}
// 保存和跟添加收货地址
function saveAction(data) {
    return request({
        method: "post",
        url: "/address/saveAction",
        data,
    })
}
// 保存和跟添加收货地址
function getListAction(data) {
    return request({
        method: "get",
        url: "/address/getListAction",
        data,
    })
}

export {
    deleteAction,
    detailAction,
    saveAction,
    getListAction
}