<template>
	<div class="listComment" v-show="commentShow">
		  <div v-for="item in commentsListItem" >
			  <div class="listCommentContent clearfix" >
					<van-image
					  round
					  width="2rem"
					  height="2rem"
					  lazy-load
					  src="https://img.yzcdn.cn/vant/cat.jpeg"
					  class="listComment-img"
					/>
					<div class="listComment-text"  :style="{width:c1width}">
						<span>{{item.nickName}}</span>
						<div class="listComment-text-content">游客评论:{{ item.content }}</div>
						<div>{{item.created_time}}</div>
					</div>
			  </div>			
		  </div>
		  <transition name="bounce">
			<div v-show="sofaShow">还没有评论，赶紧来抢沙发!!!</div>  
		  </transition>
		  
	</div>
</template>

<script>

import Image from 'vant/lib/image'
import 'vant/lib/image/style'
import Lazyload from 'vant/lib/lazyload'
import 'vant/lib/lazyload/style'
import axios from "axios"
import {mapState,mapGetters,mapActions} from 'vuex'
	export default {
		props: {
			commentShow:'',
		},
		data() {
			return {
				commentsListItem: null,
				newsId:'',
				sofaShow:false,
				test:''
			};
		},
		watch: {
			commentsListItem: function(){
				// console.log(this.commentsListItem);
				if(this.commentsListItem != ''){
					this.sofaShow=false
				}else if(this.commentsListItem == ''){
					this.sofaShow=true
				}
			},
			
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
			//根据文章id，查询评论内容			
			commentsList(){
				axios.get("/api/commentsList",{params:{parentId:this.newsId}})
				.then((response)=>{
					let res = response.data;
					this.commentsListItem=res;
				})
				.catch(function (error) {
					console.log(error);
				});				
			},
			//针对于无评论，作出提示动画效果
			alert(){
				this.sofaShow = true;
				//this.$store.state.sofaShow = true;
				//this.$store.commit("updateListComment",this.sofaShow);
			}

		},
		mounted() {
			this.loading = false;
			// window.addEventListener('scroll',this.screenScroll);	
			this.newsId = this.$route.query.id;
			//请求评论
			// this.commentsList();
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
	
.listComment {
	border-top: 1px solid #1989FA;
}
.listCommentContent{
	border-bottom: 1px solid #1989FA;
}	
.listComment-img{
	float: left;
	margin-left: 5px;
	margin-top: 10px;
}
.listComment-text{
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
.listComment-text-content {
	margin: 10px 0px;
}
	
.listComment-text-content + div {
	font-size:12px;
}
/* 空评论时动画效果 */
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
