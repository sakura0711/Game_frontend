<template>
    <div class="header mb-3">

    </div>

    <div class="mx-auto" style="width: 85vw;" v-if="onClick" @click="addClick()">
        <div class="btn btn-primary mb-3"><i class="fa-regular fa-square-plus">&nbsp;新增故事</i>
        </div>
    </div>
    <!-- 
    <addOperator v-if="addOnClick" :getData="getData" :showModal="true" :message='String("新增故事")' :exit="addOnClick"
        :onExit="addClick"></addOperator> -->


    <div class="container">

        <div v-for="(playerData, index) in players" :key="index" class="d-flex bd-highlight mb-3">

            <div class="player-card position-relative w-100" @click="showClick(playerData)">
                <img src="https://i.imgur.com/DziuEw7.jpeg" alt="">
                <strong class="fs-4 name">{{ playerData.PlayerName }} <i class="lv">lv. &nbsp;{{ playerData.playerLevel
                }}</i></strong>

                <strong class="chapter"> 主線進度 : {{ playerData.MainChapter.chapter }}</strong>
            </div>
        </div>

        <!-- 顯示詳細資訊 -->
        <playerShow v-if="showOnClick" :PlayerData="showData" :exit="showOnClick" :onExit="showClick">
        </playerShow>


        <router-link to="/" class="btn btn-secondary fixed-bottomS">返回首頁</router-link>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import addOperator from '@/components/addOperator.vue';
import putOperator from '@/components/putOperator.vue';
import playerShow from '@/components/playerShow.vue';
import axios from 'axios';

interface Weapon {
    uuid: number,
    name: string,
    type: string,
    description: string,
    damage: number
}
interface Chapter {
    uuid: number,
    chapter: string,
    title: string,
    content: string,
}
interface Skill {
    uuid: number,
    name: string,
    description: string,
    damage: number,
}
interface Player {
    PlayerUUID: string;
    PlayerName: string;
    playerWeapon: Weapon;
    AttackSkill: Skill;
    DefenseSkill: Skill;
    SupportSkill: Skill;
    MainChapter: Chapter;
    playerLevel: number;

    showContent: boolean;
}
const players = ref<Player[]>([]);

const getData = async () => {
    try {
        const res = await axios.get('http://localhost:3000/getAllPlayer');
        console.log('res', res.data);

        players.value = res.data.map((chapter: any) => ({ ...chapter, showContent: false }));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    console.log('data', players.value);
};

// const delChapter = async (item: Chapter) => {
//     const confirmDelete = window.confirm('是否要刪除章節' + (item.Chapter) + '？');
//     if (confirmDelete) {
//         const data = {
//             _chapterID: item.ChapterID,
//         };
//         console.log(data);
//         try {
//             const result = await axios.delete('http://localhost:3000/delStory', { data });
//             console.log(result.data);
//         } catch (error: any) {
//             if (error.response.data.loadType == 'ROW_IS_REFERENCED') {
//                 alert('此章節已被引用，無法刪除');
//             } else {
//                 console.error('!!Error deleting data:', error.message);
//             }
//         }
//         getData();
//     }
// };


let onClick = ref(true);
let showOnClick = ref(false);
let showData = ref<Player>();
const showClick = (_showData: Player) => {
    showOnClick.value = !showOnClick.value;
    showData.value = _showData;
    console.log(showOnClick.value);
};


let addOnClick = ref(false);
const addClick = () => {
    addOnClick.value = !addOnClick.value;
    console.log(addOnClick.value);
};

let putOnClick = ref(false);
let putData = ref<Player>();
const putClick = (_putData: Player) => {
    putOnClick.value = !putOnClick.value;
    putData.value = _putData;
    console.log(putOnClick.value);
}

onMounted(getData);	
</script>
  

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@500&display=swap');

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


.container {
    font-family: Itim, naikaifont, Microsoft JhengHei, sans-serif;
    max-width: 90vw;
    /* 調整 container 寬度，根據需求修改 */
    position: relative;
    /* 使 .fixed-bottom 依附在 .container 上 */
}

.fixed-bottomS {
    width: auto;
    height: auto;
    border-radius: 10px;
    position: fixed;
    top: 10px;
    /* 距離底部的距離，根據需要調整 */
    right: 10px;
    /* 距離右側的距離，根據需要調整 */
}

.btn-primary {
    width: 100%;
}

.player-card {
    display: flex;
    align-items: center;

    height: 70px;
    border: 2px solid #e5e5e5;
    border-radius: 20px;
    padding: 15px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
}

.player-card:hover {
    /* transform: scale(1.01); */
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
    /* 螢光效果的 box-shadow，可以根據需要進行調整 */
}


.position-relative {
    position: relative;
}


.lv {
    font: 500 14px/1.5 Itim;
}

.name {
    width: 40%;
}

.chapter {
    width: 30%;
}

img {
    box-sizing: border-box;
    border-radius: 40px;
    width: 85px;
    height: 45px;
    margin-right: 10px;
    border: #e5e5e5 2px solid;
}

i {
    font-style: normal;
}
</style>