<template>
  <div>
		<div class="comment">
			昵称1:<input type="text" class="comment-input" v-model="nameInput">
			<br/>
			标题1：<input type="text" class="comment-input" v-model="titleInput">
			<textarea value="评论1" placeholder="请输入评论1" class="comment-text" rows="3" v-model="textInput"/>
			
			<van-button type="info" @click="postInput">评论提交1</van-button>
		</div>
    <Comment></Comment>
  </div>
</template>
<script>
	import Comment from "@/components/Comment.vue"
	import axios from "axios"
	export default {
		data() {
			return {
				nameInput:'',
				textInput:'',
				titleInput:'',
				time:'',
				token:''
			}
		},
		components: {
			Comment
		},
		mounted(){
			axios.get("/api/").then(response => (
				//拿到服务端csrf给的cookies中的值，再赋值给token，再传给服务端验证
				this.token = response.request.response
			));
			
		},
		methods: {
			postInput() {
				//拿到提交的本地时间
				// this.time = Vue.getNowFormatDate();
				let myDate = new Date();
				this.time=myDate.toLocaleString();
				//console.log(this.time);

				//发post上传到服务器的数据库
				axios({
					method: 'post',
					url: '/api/updateInput',
					headers: {'x-csrf-token': this.token },
					data:{
					  name:this.nameInput || '匿名用户',
					  time:this.time,
					  text:this.textInput,
					  title:this.titleInput						  
					}
				}).then()
			
			}
		},
	}
</script>