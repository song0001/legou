### 1. 组件复用跳转问题

在商品详情页面, 点击其他商品,还是跳转到当前页面,只是改变了商品id ,但是页面没有刷新,要使页面跳转顶部可以给 `app.vue`文件 的 <router-view />标签里面加上`:key="$route.query.id" ` 

### 2.响应路由参数的变化

当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。



复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用 2.2 中引入的 `beforeRouteUpdate` [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)：

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

### 3. 修改购物车删除bug

全选反选用的组件,之前删除绑定的下标,如果选中商品再删除商品,会造成checkbox选中下移,后改为绑定id的形式

*绑定name值切记不要绑定下标*

```
    <van-checkbox
       :name="item.goods_id">
       </van-checkbox>
```

### 4.遗留bug (后期有时间会修复)

**地址信息回显问题**

点击修改地址信息,地址栏不能回显之前的地址信息,待修复

