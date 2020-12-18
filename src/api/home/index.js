import request from "@/api/request"

// 请求首页相关数据
function home(data) {
    return request({
        method: "get",
        url: "/index/index",
        data: data
    })
}
// 首页新品首发与人气推荐
function goods(data) {
    return request({
        method: "get",
        url: "/goods/goodsList",
        data: data
    })
}
// 首页品牌制造商直供的详情数据
function brand(data) {
    return request({
        method: "get",
        url: "/brand/detailaction",
        data: data
    })
}
// 首页品牌制造商直供的详情内的列表数据
function brandList(data) {
    return request({
        method: "get",
        url: "/brand/listaction",
        data: data
    })
}
export {
    home,
    goods,
    brand,
    brandList
}