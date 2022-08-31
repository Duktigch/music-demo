// 统一封装网络请求方法

// 文件名-尽量和模块页面文件名统一(方便查找)
import request from "@/utils/request"

// 首页-推荐歌单
export const recommendMusic = params => request({
    url: '/personalized',
    params //将来可能会传值 {limit：20}
})

// 首页-最新音乐
export const newMusic = params => request({
    url: '/personalized/newsong',
    params 
})