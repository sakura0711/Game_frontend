<template>
    <div class="header mb-3">

    </div>


    <div class="mx-auto" style="width: 85vw;" v-if="onClick" @click="addClick()">
        <div class="btn btn-primary mb-3"><i class="fa-regular fa-square-plus">&nbsp;新增武器</i>
        </div>
    </div>

    <addOperator v-if="addOnClick" :getData="getData" :showModal="true" :message='String("新增武器")' :exit="addOnClick"
        :onExit="addClick"></addOperator>


    <div class="container">

        <div v-for="(weaponData, index) in weapons" :key="index" class="d-flex bd-highlight mb-3">
            <div class="chapter-card position-relative w-100 bd-highlight" @click="toggleContent(index)">
                <h4 class="mb-1"><strong>武器名稱 : {{ weaponData.WeaponName }}</strong>
                    <section class="mt-2">
                        <p class="fs-6">攻擊力 : {{ weaponData.WeaponDamage }} [ {{ weaponData.WeaponType }} ]</p>
                        <p class="fs-6"></p>
                    </section>
                </h4>


                <div v-if="weaponData.showContent" class="content-fade-in">
                    <p class="fs-6">描述 : {{ " " + weaponData.WeaponDescription }}</p>
                </div>

                <button @click="delWeapon(weaponData)" class="delete-btn"> <i class="fa-solid fa-xmark">刪除</i> </button>
                <button @click="putClick(weaponData)" class="modify-btn"><i class="fa-solid fa-pen-to-square">
                        修改</i></button>
            </div>

        </div>

        <putOperator v-if="putOnClick" :getData="getData" :showModal="true" :message='String("修改武器")' :weaponData="putData"
            :exit="putOnClick" :onExit="putClick" class="p-2 flex-shrink-1 bd-highlight"
            style="flex-basis: 5%; height: 100%;">
        </putOperator>

        <router-link to="/" class="btn btn-secondary fixed-bottomS">返回首頁</router-link>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';

import addOperator from '@/components/addOperator.vue';
import putOperator from '@/components/putOperator.vue';

import axios from 'axios';


interface Weapon {
    WeaponID: number,
    WeaponName: string,
    WeaponType: string,
    WeaponDescription: string,
    WeaponDamage: number

    // 用於顯示是否要展開
    showContent: boolean;
}
const weapons = ref<Weapon[]>([]);

const getData = async () => {
    try {
        const res = await axios.get('http://localhost:3000/getWeapons');
        console.log('res', res.data);
        weapons.value = res.data.map((weapon: any) => ({ ...weapon, showContent: false }));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    console.log('data', weapons.value);
};



const delWeapon = async (item: Weapon) => {
    const confirmDelete = window.confirm('是否要刪除武器' + (item.WeaponName) + '?');
    if (confirmDelete) {
        const data = {
            _weaponID: item.WeaponID
        };
        console.log(data);
        try {
            const result = await axios.delete('http://localhost:3000/delWeapons', { data });
            console.log(result.data);
        } catch (error: any) {
            if (error.response.data.loadType == 'ROW_IS_REFERENCED') {
                alert('此武器已被引用，無法刪除');
            } else {
                console.error('!!Error deleting data:', error.message);
            }
        }
        getData();
    }
};

const toggleContent = (index: number) => {
    weapons.value = weapons.value.map((weapons, i) => ({
        ...weapons,
        showContent: i === index ? !weapons.showContent : false
    }));
};


let addOnClick = ref(false);
let onClick = ref(true);
const addClick = () => {
    addOnClick.value = !addOnClick.value;
    console.log(addOnClick.value);
};

let putOnClick = ref(false);
let putData = ref<Weapon>();
const putClick = (_putData: Weapon) => {
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
    background: linear-gradient(to bottom, #000000, #ffffff00);
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
    width: auto;
    height: auto;
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
    word-wrap: break-word;
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