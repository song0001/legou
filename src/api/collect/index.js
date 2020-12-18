import request from "@/api/request"

//获取收藏列表
function listAction(data) {
    return request({
        method: "get",
        url: "/collect/listAction",
        data: data
    })
};
// 添加收藏
function addcollect(data) {
    return request({
        method: "post",
        url: "/collect/addcollect",
        data: data
    })
};
export {
    listAction,
    addcollect
}