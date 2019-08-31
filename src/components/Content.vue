<template>
	<div class="content">
		<van-tabs v-model="active">
		  <van-tab title="生活">
			  <!-- 博客文章ajax异步请求 -->
			<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
				<div v-for="item in postsListItem">
				  <router-link class="content1  clearfix" :to="{path:'news',query:{id:item._id}}">  <!--  -->
						<van-image
						  round
						  width="5rem"
						  height="5rem"
						  lazy-load
						  src="https://img.yzcdn.cn/vant/cat.jpeg"
						  class="content1-img"
						/>
						<div class="content1-text infoItem"  :style="{width:c1width}">
							<h3 class="infoItemHead">{{item.title}}</h3>
							<div class="infoItemContent">{{item.content}}</div>
							<div class="infoItemContent">{{item.created_time}}</div>
							<div class="infoItemFooter">
								<span class="infoItemAnswer">{{item.author}}</span>
								的回答
								<span>
									<span class="infoItemPoint">·</span>
									<span class="infoItemAnswer">26</span>赞同
								</span>
							</div>					
						</div>
				  </router-link>
				</div>			  
			</van-pull-refresh>  

		  </van-tab>
		  <van-tab title="科技">敬请期待，开发中</van-tab>
		  <van-tab title="哲学">
			  <div class="content1 clearfix" >
					<van-image
					  round
					  width="5rem"
					  height="5rem"
					  lazy-load
					  src="https://img.yzcdn.cn/vant/cat.jpeg"
					  class="content1-img"
					/>
					<div class="content1-text"  :style="{width:c1width}">
						<span>猫咪可爱</span>
						<div>猫咪不可描述的信息猫咪不可描述的信息猫咪不可描述的信息猫咪不可描述的信息猫咪不可描述的信息猫咪不可描述的信息猫咪不可描述的信息猫咪不可描述的信息猫咪不可描述的信息</div>
					</div>
			  </div>																		
		  </van-tab>
		  <van-tab title="未知">敬请期待，开发中</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import Tab from 'vant/lib/tab'
import 'vant/lib/tab/style'
import Tabs from 'vant/lib/tabs'
import 'vant/lib/tabs/style'
import Skeleton from 'vant/lib/skeleton'
import 'vant/lib/skeleton/style'
import Image from 'vant/lib/image'
import 'vant/lib/image/style'
import Lazyload from 'vant/lib/lazyload'
import 'vant/lib/lazyload/style'
import Cell from 'vant/lib/cell'
import 'vant/lib/cell/style'
import CellGroup from 'vant/lib/cell-group'
import 'vant/lib/cell-group/style'
import PullRefresh from 'vant/lib/pull-refresh'
import 'vant/lib/pull-refresh/style'

import axios from 'axios'
	export default {
		data() {
			return {
				active: 0,
				loading: true,
				title:"wuguo",
				c1width:"",
				postsListItem:[],
				isLoading: false,
				count: 0
			};
		},
		methods: {
			//content1-text元素自适应宽度计算，105为常量
			getTextWidth(){
				let bo=window.document.body.offsetWidth;
				let content1Text=bo-105;
				////console.log("c:"+content1Text);
				this.c1width = content1Text+"px";
			},
			//content1-text元素自适应宽度计算，105为常量
			handleResize(){
				this.docuWidth = document.documentElement.clientWidth;
				let content1Text=this.docuWidth-105;
				this.c1width = content1Text+"px";
			},
			//请求首页博客内容
			postsList(){
			    axios.get("/api/postsList",{params:{value:this.count}}).then((response)=>{
					//console.log("response");
					//console.log(response);
			        let res = response.data;
					if(res== ''){
						alert("已经到底了，敬请期待下次更新！")
					}
					//...es6新语法
					this.postsListItem.push(...res);
// 					console.log(res);
// 					console.log(this.postsListItem)
			    });
			},
			onRefresh() {
			  setTimeout(() => {
				// this.$toast('刷新成功');
				this.isLoading = false;
				this.count++;
				this.postsList();
				// console.log(this.count);
			  }, 500);
			}
		},
		mounted: function() {
			this.loading = false;
			// window.addEventListener('scroll',this.screenScroll);	
			  this.$nextTick(function () {
				this.postsList();
			  })
			
		},
		computed:{
			
		},
		created(){
			//首次加载content，计算过text宽度
			this.getTextWidth();
			//当视口大小改变时，计算text宽度
			window.addEventListener('resize',this.handleResize);
		}
	}
</script>

<style>
.content{
/* 	background: url(../assets/bigBang.jpg); */
	width: 100%;
	height: 100%;
	position: relative;
	text-align: center;
}
.content1-img{
	float: left;
	margin-left: 5px;
	margin-top: 10px;
}
.content1-text{
	/* width: ; 动态传textwidth值*/
	float: left;
	margin-left: 15px;
	text-align: left;
}
.clearfix {
	*zoom: 1
}
.clearfix:after {
	content: "";
	display: block;
	clear: both;
}
.infoItemHead {
	padding: 5px 0;
}
.infoItemContent {
	max-height: 60px;
	overflow: hidden;
}
.infoItemFooter {
	padding: 5px 0;
}
</style>
