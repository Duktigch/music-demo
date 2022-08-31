<template>
    <div>
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" @input="inputFn"/>
      <!-- 搜索下容器 -->
      <div class="search_wrap">
        <!-- 标题 -->
        <p class="hot_title">热门搜索</p>
        <!-- 热搜关键词容器 -->
        <div class="hot_name_wrap">
          <!-- 每个搜索关键词 -->
          <span class="hot_item" @click="hotFn(item.first)" v-for="(item, index) in hotArr" :key="index">
            {{item.first}}
          </span>
        </div>
      </div>
      <!-- 搜索结果 -->
      <div class="search_wrap">
        <!-- 标题 -->
        <p class="hot_title">最佳匹配</p>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
        <SongItem
            v-for="obj in resultList"
            :key="obj.id"
            :name="obj.name"
            :author="obj.ar[0].name"
            :id="obj.id"
        ></SongItem>
        </van-list>
      </div>
    </div>
</template>

<script>
import SongItem from '@/components/SongItem.vue'
import { hotSearchAPI, searchResultAPI } from "@/api"
export default {
   components: {
    SongItem
   },
    data() {
        return {
          value: '',
          hotArr: [], // 热搜关键词
          resultList: [], // 搜索词结果列表
          loading: false, // 加载中 (状态) - 只有为false, 才能触底后自动触发onload方法
          finished: false, // 未加载全部 (如果设置为true, 底部就不会再次执行onload, 代表全部加载完成)
          page: 1, // 当前搜索结果的页码
        };
    },
    methods: {
    // 搜索框改变时-触发
    async inputFn() {
      this.page = 1
      // 防抖优化
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async ()=>{
        this.finished = false;
        if(this.value.length === 0) {
          this.resultList = 0
          return
        }
        const res = await this.getListFn()
        console.log(res)
        // 如果搜索结果响应数据没有songs字段-无数据
        if (res.data.result.songs === undefined) {
          this.resultList = [];
          return;
        }
        this.resultList = res.data.result.songs
        this.loading = false;
      },900)
    },
    // 定义获取歌曲列表函数
    async getListFn() {
      return await searchResultAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20, // 固定公式
      })
    },
    async onLoad() {
        // 触底事件(要加载下一页的数据咯), 内部会自动把loading改为true
        console.log('进来了onload')
        this.page++;
        const res = await this.getListFn();
        this.resultList = [...this.resultList, ...res.data.result.songs];
        this.loading = false; // 数据加载完毕-保证下一次还能触发onload
    },
    // 点击热搜词 1.绑定搜索框 2.调用接口
    async hotFn(val) {
      this.page = 1
      this.value = val
      const res = await this.getListFn()
      this.resultList = res.data.result.songs
    },
  },
    // 进入页面，获取热搜词推荐
    async created() {
      const res = await hotSearchAPI()
      console.log('刚进入页面',res)
      this.hotArr = res.data.result.hots
    }
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>