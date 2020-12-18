import request from "../request"

// 对接口的封装

// 分类导航数据获取
function indexaction(data) {
    return request({
        url: "/category/indexaction",
        data,
    })
}
// 获取分类商品列表
function goodsList(data) {
    return request({
        url: "/goods/goodsList",
        data,
    })
}
// 获取导航数据
function categoryNav(data) {
    return request({
        url: "/category/categoryNav",
        data,
    })
}
// 通过分类的id来查询分类列表数据
function currentaction(data) {
    return request({
        url: "/category/currentaction",
        data,
    })
}
export {
    indexaction,
    goodsList,
    categoryNav,
    currentaction
}