<template>
    <div class="header mb-3">

    </div>

    <div class="mx-auto" style="width: 85vw;" v-if="onClick" @click="addClick()">
        <div class="btn btn-primary mb-3"><i class="fa-regular fa-square-plus">&nbsp;新增攻擊技能</i>
        </div>
    </div>

    <addOperator v-if="addOnClick" :getData="getData" :showModal="true" :message='String("新增攻擊技能")' :exit="addOnClick"
        :onExit="addClick"></addOperator>

    <div class="container">

        <div class="container">
            <div class="row row-cols-4">
                <template v-for="(attackSkill, index) in attackSkills" :key="index">
                    <div class="col text-center skill-card m-2 flex-fill" @click="showClick(attackSkill)">
                        <img src="https://i.imgur.com/jBmDoVC.jpeg" alt="" class="img">
                        <p4 class="skill_name">{{ attackSkill.SkillName }}</p4>
                    </div>
                    <button class="delete-btn" @click="delSkill(attackSkill)"></button>
                </template>
            </div>

            <!-- 顯示詳細資訊 -->
            <skillShow v-if="showOnClick" :message="String('攻擊技能')" :SkillData="showData" :exit="showOnClick"
                :onExit="showClick" :Skill="style">
            </skillShow>
        </div>

        <router-link to="/" class="btn btn-secondary fixed-bottomS">返回首頁</router-link>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import addOperator from '@/components/addOperator.vue';
import putOperator from '@/components/putOperator.vue';
import skillShow from '@/components/skillShow.vue';
import axios from 'axios';


const style = ['text-danger', 'asd'];
interface Skills {
    SkillID: number;
    SkillName: string;
    SkillDescription: string;
    SkillDamage: number;

    showContent: boolean;
}

const attackSkills = ref<Skills[]>([]);

const getData = async () => {
    try {
        const res = await axios.get('http://localhost:3000/getAttackSkills');
        console.log('res', res.data);
        attackSkills.value = res.data.map((attackSkill: any) => ({ ...attackSkill, showContent: false }));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    console.log('data', attackSkills.value);
};


const delSkill = async (item: Skills) => {
    const confirmDelete = window.confirm('是否要刪除: ' + (item.SkillName) + '?');
    if (confirmDelete) {
        const data = {
            _skillID: item.SkillID,
        };
        console.log(data);
        try {
            const result = await axios.delete('http://localhost:3000/delAttackSkill', { data });
            console.log(result.data);
        } catch (error: any) {
            if (error.response.data.loadType == 'ROW_IS_REFERENCED') {
                alert('此技能已被引用，無法刪除');
            } else {
                console.error('!!Error deleting data:', error.message);
            }
        }
        getData();
    }
};



let onClick = ref(true);

let showOnClick = ref(false);
let showData = ref<Skills>();
const showClick = (_showData: Skills) => {
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
let putData = ref<Skills>();
const putClick = (_putData: Skills) => {
    putOnClick.value = !putOnClick.value;
    putData.value = _putData;
    console.log(putOnClick.value);
}



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

.btn-primary {
    width: 100%;
}

.skill-card {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 200px;
    border: 2px solid #ff6666;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    -webkit-user-select: none;
}

.skill-card:hover {
    transform: scale(1.01);
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
    /* 螢光效果的 box-shadow，可以根據需要進行調整 */
}

.skill_name {
    margin-left: 10px;
}


.delete-btn {
    float: left;
    position: relative;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    color: transparent;
    border: transparent;
}

.delete-btn::before {
    content: "\2716";
    font-family: "Font Awesome 6 Frees";

    position: absolute;
    z-index: 50;
    left: -20px;
    line-height: 25px;
    width: 25px;
    height: 25px;
    color: #ffffff;
    background: #ff3939;
    border: 50%;
    border-radius: 50%;
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


.img {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 10%;
    border: #929292 3px solid;
}
</style>