<template>
    <div>
        <!-- 顶部导航 -->
        <van-nav-bar 
        :title="activeTitle"
        />
        <!-- 中间内容显示 -->
        <router-view></router-view>
        <!-- 底部tab切换 -->
        <van-tabbar route>
            <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTitle: this.$route.meta.title
        }
    },
    watch: {
    $route() {
      this.activeTitle = this.$route.meta.title; // 提取切换后路由信息对象里的title显示
    },
  },
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>