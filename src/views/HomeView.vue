<template>
	<div class="home-page">
		<div class="home-header">
			<h1></h1>
		</div>

		<ul class="navbar-nav">
			<RouterLink to="/story" class="nav-item">
				<div class='nav-button'>Story 故事</div>
			</RouterLink>
			<RouterLink to="/Weapons" class="nav-item">
				<div class='nav-button'>Weapons 武器</div>
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
		width: 100%;
		height: 100px;
		background: linear-gradient(to bottom, #5197ff, #ffffff00);
		text-align: center;
		font-size: 64px;
		margin-bottom: 50px;
	}

	.navbar-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		.nav-item {
			width: 80vw;
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
				background-color: #a1a1a1;
			}

			.nav-button {
				width: 100%;

				font-size: 50px;
				color: rgb(0, 0, 0);

				&:hover {
					color: rgb(255, 255, 255);
				}
			}
		}
	}
}
</style>
