<template>
  <div class="home">
		<Header></Header>
		<Content></Content>
		<Footer></Footer>
		<div class="divFixed" v-on:click="scrollTop">返回顶部</div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Content from "@/components/Content.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
		Header,
		Content,
		Footer
  },
  mounted() {
  	window.addEventListener('scroll',this.screenScroll);
  },
  methods:{
	screenScroll(){
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
</style>
