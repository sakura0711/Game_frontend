<template>
	<div class="home-page">
		<div class="home-header">
			<h1>test</h1>
		</div>
		<ul class="navbar-nav">
			<RouterLink to="/story" class="nav-item">
				<div class='nav-button'>about</div>
			</RouterLink>
			<RouterLink to="/test" class="nav-item">
				<div class='nav-button'>test</div>
			</RouterLink>
		</ul>
	</div>
</template>

  
<script setup lang="ts">
</script>
  
<style lang="scss">
.home-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 500;

	.home-header {
		text-align: center;
		font-size: 64px;
	}

	.navbar-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		.nav-item {
			width: 538px;
			height: 126px;
			border: 2px solid black;
			border-radius: 20px;
			margin: 0 10px 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			text-decoration: none;
			transition: background-color 0.3s;

			&:hover {
				background-color: #a2b4a6;
			}

			.nav-button {
				font-size: 50px;
			}
		}
	}
}
</style>
