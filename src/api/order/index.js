import request from "../request"

// 订单确认界面数据获取
function detailAction(data) {
    return request({
        method: "get",
        url: "/order/detailAction",
        data,
    })
}
// 提交订单
function submitAction(data) {
    return request({
        method: "post",
        url: "/order/submitAction",
        data,
    })
}
export {
    detailAction,
    submitAction
}