<template>
	<div class="home-page">
		<div class="home-header">
			<h1>ㄟ黑 :D</h1>
		</div>

		<div class="navbar-nav">

			<RouterLink to="/player" class="nav-item">
				Player 玩家
			</RouterLink>

			<RouterLink to="/story" class="nav-item">
				Story 故事
			</RouterLink>

			<RouterLink to="/Weapons" class="nav-item">
				Weapons 武器
			</RouterLink>

			<div class="nav-container">
				<RouterLink to="/attackSkill" class="nav-item sm1">
					攻擊技能
				</RouterLink>
				<RouterLink to="/defendSkill" class="nav-item sm1">
					防禦技能
				</RouterLink>
				<RouterLink to="/supportSkill" class="nav-item sm1">
					輔助技能
				</RouterLink>
			</div>
		</div>
	</div>
</template>
  
<style>
.home-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 500;
}

.home-header {
	width: 100%;
	height: 100px;
	background-color: #2c3e50;
	text-align: center;
	font-size: 32px;
	margin-bottom: 20px;
	color: #ecf0f1;
	padding: 20px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.navbar-nav {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}

.nav-item {
	width: 80vw;
	max-width: 100%;
	height: 80px;
	background-color: #3498db;
	border-radius: 10px;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	justify-content: center;
	text-align: center;
	text-decoration: none;
	transition: background-color 0.3s, color 0.3s;
	color: #ecf0f1;
	font-size: 18px;
}

.sm1 {
	max-width: 32%;
}

.nav-item:hover {
	background-color: #2980b9;
}

.nav-container {
	display: flex;
	justify-content: space-between;
	width: 80vw;
}
</style>
  