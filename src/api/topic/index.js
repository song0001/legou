import request from "../request"

// 对接口的封装
// 专题接口列表
function listaction(data) {
    return request({
        url: "/topic/listaction",
        data,
    })
}
// 详情加下方四个专题推荐
function detailaction(data) {
    return request({
        url: "/topic/detailaction",
        data,
    })
}



export {
    listaction,
    detailaction
}