import request from "@/api/request"

// 请求首页相关数据
function detailaction(data) {
    return request({
        method: "get",
        url: "/goods/detailaction",
        data: data
    })
}
export {
    detailaction
}