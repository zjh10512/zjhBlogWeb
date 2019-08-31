<template>
  <div id="app">
<!--    <div id="nav">
      <router-link to="/">Home</router-link> |
     <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
		body, ul, ol, li, p, h1, h2, h3, h4, h5 ,h6{
			margin: 0;padding: 0;color: #1a1a1a;
		}
		div {
			color: #444;
		}
		button, input, select, textarea {
			margin: 0;font-family: inherit;font-size: 100 %;
		}
		img {
			border: 0
		}
		a {
			text-decoration: none
		}
		a: hover {
			text-decoration: underline
		}
		html.touchevents a: hover {
			text-decoration: none
		}
</style>
