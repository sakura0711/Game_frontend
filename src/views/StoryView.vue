<template>
	<div class="header mb-3">

	</div>


	<div class="content">
		<storyOperator :getData="getData" :showModal="true" :message='String("新增故事")'></storyOperator>
	</div>


	<div class="container">

		<div v-for="(chapterData, index) in chapters" :key="index" class="d-flex bd-highlight mb-3">
			<div class="chapter-card position-relative p-3 w-100 bd-highlight" @click="toggleContent(index)">
				<h4 class="mb-3"><strong>章節. {{ chapterData.Chapter }}</strong></h4>
				<h6 class="mb-3"> 《 {{ chapterData.Title }} 》</h6>
				<div v-if="chapterData.showContent" class="content-fade-in">
					<p class="fs-6">{{ " " + chapterData.StoryContent }}</p>
				</div>
				<button @click="delChapter(chapterData)" class="delete-btn"> <i class="fa-solid fa-xmark">刪除</i> </button>

			</div>
			<storyOperator :getData="getData" :showModal="true" :message='String("修改故事")' :data="chapterData"
				class="p-2 flex-shrink-1 bd-highlight" style="flex-basis: 5%; height: 100%;">
			</storyOperator>
		</div>

		<router-link to="/" class="btn btn-secondary fixed-bottomS">返回首頁</router-link>
	</div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import storyOperator from '@/components/storyOperator.vue';
import axios from 'axios';


interface Chapter {
	ChapterID: number;
	Chapter: number;
	Title: string;
	StoryContent: string;
	showContent: boolean;
}

const chapters = ref<Chapter[]>([]);

const getData = async () => {
	try {
		const res = await axios.get('http://localhost:3000/getStory');
		console.log('res', res.data);
		chapters.value = res.data.map((chapter: any) => ({ ...chapter, showContent: false }));
	} catch (error) {
		console.error('Error fetching data:', error);
	}
	console.log('data', chapters.value);
};

const toggleContent = (index: number) => {
	chapters.value = chapters.value.map((chapter, i) => ({
		...chapter,
		showContent: i === index ? !chapter.showContent : false
	}));
};

const adding = ref(false);
const addMOD = () => {
	adding.value = !adding.value;
}

const delChapter = async (item: Chapter) => {
	const confirmDelete = window.confirm('是否要刪除章節' + (item.Chapter) + '？');
	if (confirmDelete) {
		const data = {
			_chapterID: item.ChapterID,
		};
		console.log(data);
		try {
			const result = await axios.delete('http://localhost:3000/delStory', { data });
			console.log(result.data);
		} catch (error: any) {
			if (error.response.data.loadType == 'ROW_IS_REFERENCED') {
				alert('此章節已被引用，無法刪除');
			} else {
				console.error('!!Error deleting data:', error.message);
			}
		}
		getData();
	}
};


onMounted(getData);	
</script>
  

<style scoped>
.flex_test {
	display: flex;
}

.header {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	background: linear-gradient(to bottom, #ffcece, #ffffff00);
	/* 由上到下的漸變色 */
	color: #fff;
	border-radius: 0 0 10px 10px;
}

.fs-6 {
	font: 600 16px/1.5 'Noto Sans TC', sans-serif;
}

.container {
	max-width: 90vw;
	/* 調整 container 寬度，根據需求修改 */
	position: relative;
	/* 使 .fixed-bottom 依附在 .container 上 */
}

.fixed-bottomS {
	width: 150px;
	height: 50px;
	border-radius: 10px;
	position: fixed;
	top: 10px;
	/* 距離底部的距離，根據需要調整 */
	right: 10px;
	/* 距離右側的距離，根據需要調整 */
}

.btn-add {
	max-width: 1000px;
}

.chapter-card {
	border: 2px solid #e5e5e5;
	border-radius: 20px;
	padding: 15px;
	cursor: pointer;
	transition: transform 0.3s ease-in-out;
}

.chapter-card:hover {
	transform: scale(1.01);
	box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
	/* 螢光效果的 box-shadow，可以根據需要進行調整 */
}

.content-fade-in {
	opacity: 0;
	animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}



/* asdad */
.position-relative {
	position: relative;
}

.delete-btn {
	line-height: 20px;
	position: absolute;
	top: 10px;
	/* 根據需要調整距離上側的距離 */
	right: 10px;
	/* 根據需要調整距離右側的距離 */
	background-color: #dc3545;
	/* 刪除按鈕的背景顏色，可以根據需要進行調整 */
	color: white;
	border: none;
	padding: 5px 10px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease-in-out;
}

.modify-btn {
	line-height: 20px;
	position: absolute;
	top: 10px;
	/* 根據需要調整距離上側的距離 */
	right: 80px;
	/* 根據需要調整距離右側的距離 */
	background-color: #009628;
	/* 刪除按鈕的背景顏色，可以根據需要進行調整 */
	color: white;
	border: none;
	padding: 5px 10px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease-in-out;
}

.delete-btn:hover {
	background-color: #c82333;
	/* 刪除按鈕的 hover 背景顏色，可以根據需要進行調整 */
}
</style>