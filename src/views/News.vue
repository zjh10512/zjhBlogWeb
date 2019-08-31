<template>
  <div >
		<Header></Header>
		<div v-for="item in postsItemOne">
			<div class="newsHeader" >
				<span v-on:click="goBack">
					<van-icon name="arrow-left" />
				</span>
				<span>{{item.title}}</span>
			</div>
			<div class="newscontent ">
				<div class="contentItem-meta clearfix">
					<van-image
					  width="2rem"
					  height="2rem"
					  lazy-load
					  src="https://img.yzcdn.cn/vant/cat.jpeg"
					  class="contentItem-meta-img"
					/>					
					<div class="contentItem-meta-name">{{item.author}}</div>
				</div>
				<div class="newscontent-inner ">
					<span class="newsText" >
						<p>{{item.content}}</p>
					</span>
				</div>
				<div class="contentItem-time">
					<span>发布于 {{item.created_time}}</span>
				</div>
				<div class="contentItem-actions ">
					<span class="contentItem-actions-btn">
						<van-button type="primary" >
							<span>
								171
							</span>赞同 
						</van-button>						
					</span>
					<span class="contentItem-actions-btn">
						<van-button type="primary">
							<span>
								57
							</span>反对
						</van-button>						
					</span>
					<span class="contentItem-actions-btn">
						<van-button plain type="primary" @click="initComment">
							查看<span>89</span>评论
						</van-button>						
					</span>
				</div>
			</div>
		</div>
		<Comment v-bind:postId="newsId" v-bind:token="token" ref="refComment" v-on:triggerCommet="triggerCommet"></Comment>
		
		<ListComment v-bind:commentShow="commentShow" ref="refListComment" ></ListComment>
		<Footer></Footer>
		<div class="divFixed" v-on:click="scrollTop">返回顶部</div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import Comment from "@/components/Comment.vue"
import ListComment from "@/components/ListComment.vue"
import Button from 'vant/lib/button'
import 'vant/lib/button/style'
import Icon from 'vant/lib/icon'
import 'vant/lib/icon/style'
import axios from "axios"
export default {
	data() {  	
		return {
			postsItemOne:{},
			newsId:'',
			token:'',
			commentShow: false
		}
  },
  components: {
		Header,
		Footer,
		Comment,
		ListComment
  },
  mounted(){
  	window.addEventListener("scroll",this.screenScroll);
	window.addEventListener("beforeunload",function(e){
		e = e || window.event;
		if(e){
			this.init();
		}else{
			alert("请使用chomre等现代浏览器");
		}
	})
		axios.get("/api/").then((response)=>(
			//拿到服务端csrf给的cookies中的值，再赋值给token，再传给服务端验证
			this.token = response.request.response
		));	
	this.$nextTick(function () {
		this.init();
	})
  },
  methods:{
	//获取url中传来文章id参数，再去查询文章信息
	init(){		
		this.newsId = this.$route.query.id;
		////console.log(this.newsId);
		axios.get("/api/postsListOne",{
			params:{
				id:this.newsId
			}
		}).then((response)=>{
		    let res = response.data;
			this.postsItemOne=res;
			//console.log(res);			
		})	
			
	},
	goBack(){
		//console.log('goBack');
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },  
	screenScroll(){
		//console.log("===Token===");
		//console.log(this.token);
	  	let doc=document.documentElement.scrollTop;
	  	let footer=document.querySelector(".footer");
		let divFixed=document.querySelector(".divFixed");
	  	//console.log(doc);
		//底部footer组件随scroll显示隐藏
	  	if(doc>5){
	  		footer.style.visibility = "hidden";
	  	}else if(doc<=5){
	  		footer.style.visibility = "visible";
	  	}
		//底部footer组件随scroll悬停,添加class
		if(doc>=45){
			divFixed.style.display = "block";
		}else{
			divFixed.style.display = "none";
		}
	},
	scrollTop(){
		document.documentElement.scrollTo(0,0);
	},
	//显示和隐藏评论信息
	initComment(){
		this.commentShow = true;
		this.$refs.refListComment.commentsList();
		
	},
	triggerCommet(){
		this.initComment();
	}
  }
};
</script>
<style>
	.divFixed{
		display: none;
		position: fixed;
		width: 50px;
		height: 50px;
		background: #1989FA;
		right: 10px;
		bottom: 10px;
		opacity: 0.9;
		color: #FFFFFF;
		border-radius: 10px;
		box-sizing: border-box;
		padding: 5px;
	}
	.clearfix {
		*zoom: 1
	}
	.clearfix:after {
		content: "";
		display: block;
		clear: both;
	}
	.newsHeader {
		padding: 10px;
		font-size: 24px;
		position: relative;
	}
	.newsHeader>span:nth-child(1){
		position: absolute;
		left: 10px;
		padding-top: 5px;
		padding-left: 10px;
		padding-right: 10px;
	}
	.contentItem-meta{
		position: relative;
		margin-bottom: 5px;
	}
	.contentItem-meta-img {
		float: left;
		margin-left: 10px;		
	}
	.contentItem-meta-name {
		float: left;
		text-indent: 2em;
		line-height: 32px;
	}
	.newscontent-inner {
		padding: 0 5px;			
	}
	.newscontent-inner>.newsText>p {
		text-align: left;
		text-indent: 2em;
	}		
	.contentItem-time {
		color: #8590a6;
		text-align: left;
		padding: 5px 10px;
	}
	.contentItem-actions-btn {
		padding: 0 10px;
	}
</style>
