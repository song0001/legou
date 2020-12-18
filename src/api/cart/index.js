import request from "../request"

// 删除商品
function deleteAction(data) {
    return request({
        method: "get",
        url: "/cart/deleteAction",
        data,
    })
}
// 购物车列表
function cartList(data) {
    return request({
        method: "get",
        url: "/cart/cartList",
        data,
    })
}
// 添加购物车
function addCart(data) {
    return request({
        method: "post",
        url: "/cart/addCart",
        data,
    })
}
export {
    deleteAction,
    cartList,
    addCart
}