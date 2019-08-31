<template>
	<div>
		<div class="inputBtn" @click="inputControl" v-text="inputText"  v-if="inputControlShow">{{}}</div>
		<transition  name="commentAnimation">
			<div class="comment" v-show="inputShow">
				昵称:<input type="text" class="comment-input" v-model="nickname">
				<textarea value="评论" placeholder="请输入评论" class="comment-text" v-model="commentText" rows="3"/>
				<van-button type="info" @click="postComment" >评论提交</van-button>				
			</div>
		</transition>		
	</div>

</template>

<script>
	import axios from "axios"
	export default {
		props:{
			postId: {
			  type: String,
			  default: 'hello world'
			},
			token:{
			  type: String,
			  default: 'hello world'				
			},
		},
		data() {
			return {
				nickname: '',
				commentText:'',
				time:'',
				inputShow: false,
				inputText:"写评论",
				inputControlShow: true
			};
		},
		mounted(){
// 			axios.get("/api/").then(response => (
// 				//拿到服务端csrf给的cookies中的值，再赋值给token，再传给服务端验证
// 				this.token = response.request.response
// 			));
		},		
		methods: {
			postComment() {
				//拿到提交的本地时间
				//console.log(this.token);
				let myDate = new Date();
				this.time=myDate.toLocaleString();
				//console.log(this.time);
				//console.log(this.postId);
				//发post上传到服务器的数据库
				axios({
					method: 'post',
					url: '/api/updateComment',
					headers: {'x-csrf-token': this.token },
					data:{
					  name:this.nickname || '匿名用户',
					  time:this.time,
					  text:this.commentText,
					  postId:this.postId					
					}
				}).then((respone)=>{
					// console.log(respone);
					
				})	
				this.inputShow = false;
				this.inputControlShow =  false;
				this.$emit('triggerCommet',true);
			},
			inputControl(){
				//控制评论栏显示隐藏
				if(!this.inputShow){
					this.inputShow = true;
					this.inputText = "隐藏评论";
				}else if(this.inputShow){
					this.inputShow = false;
					this.inputText = "发表评论";					
				}
			}	
		},

	}
</script>

<style>
.comment {
	display: ;
	margin: 10px;
	padding: 10px;
	text-align: left;	
}
.comment-input {
	margin-bottom: 5px;
	
}
.comment-text {
	width: 100%;
	height: 50%;	
}
.inputBtn {
	width: 100%;
	background-color: #1989FA;
}
/* 评论出入场动画效果 */
.commentAnimation-enter-active {
  animation: commentAnimation-in .5s;
}
.commentAnimation-leave-active {
  animation: commentAnimation-in .5s reverse;
}
@keyframes commentAnimation-in {
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
