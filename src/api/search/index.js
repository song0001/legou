import request from "@/api/request"

//清空搜索历史
function clearhistoryAction(data) {
    return request({
        method: "post",
        url: "/search/clearhistoryAction",
        data: data
    })
};
// 搜索的关键词添加到数据库
function addhistoryaction(data) {
    return request({
        method: "post",
        url: "/search/addhistoryaction",
        data: data
    })
};
// 搜索提示接口
function helperaction(data) {
    return request({
        method: "get",
        url: "/search/helperaction",
        data: data
    })
};
// 关键词和搜索历史接口
function indexaction(data) {
    return request({
        method: "get",
        url: "/search/indexaction",
        data: data
    })
};
export {
    clearhistoryAction,
    addhistoryaction,
    helperaction,
    indexaction
}