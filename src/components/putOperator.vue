<template>
    <!-- 模板部分 -->
    <div class="put-container">

        <div v-if="message === '修改故事'" class="put">
            <div class="form">
                <div class="container">

                    <form @submit.prevent="submitData()">
                        <div class="mb-3">
                            <label for="chapter" class="form-label">章節</label>
                            <input type="number" class="form-control" id="chapter" v-model="chapter" required
                                placeholder="請輸入數字">
                        </div>

                        <div class="mb-3">
                            <label for="title" class="form-label">標題</label>
                            <input type="text" class="form-control" id="title" v-model="title" required>
                        </div>

                        <div class="mb-3">
                            <label for="content" class="form-label">故事內容</label>
                            <textarea class="form-control" id="content" v-model="content" rows="11" required></textarea>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">

                            <!-- 拉基搞了我好久 :(((((((((
                                 上面如果使用了  @submit.prevent="" 話
                                 底下 type = "submit" 的動作 就會替換成該函數。
                                 所以不必再用 @click 呼叫函數
                            -->
                            <button type="submit" class="btn btn-primary me-md-2">提交</button>
                            <button @click="exit" class="btn btn-secondary">退出</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>




        <div v-if="message === '修改武器'" class="put">
            <div class="form">
                <div class="container">

                    <form @submit.prevent="submitData()">
                        <div class="mb-3">
                            <label for="chapter" class="form-label">武器名稱</label>
                            <input type="text" class="form-control" id="title" v-model="weaponName" required>
                        </div>

                        <div class="mb-3">
                            <label for="title" class="form-label">武器種類</label>
                            <!-- <input type="text" class="form-control" id="title" v-model="weaponType" required> -->
                            <select class="form-select" aria-label="Default select example" v-model="weaponType" required>
                                <option selected disabled>請選擇武器種類</option>
                                <option value="大劍">大劍</option>
                                <option value="單手劍">單手劍</option>
                                <option value="法杖">法杖</option>
                                <option value="弓">弓</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="content" class="form-label">武器傷害</label>
                            <input type="number" class="form-control" id="chapter" v-model="weaponDamage" required
                                placeholder="請輸入數字">
                        </div>

                        <div class="mb-3">
                            <label for="content" class="form-label">武器描述</label>
                            <textarea class="form-control" id="content" v-model="weaponDescription" rows="5"></textarea>
                        </div>

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary me-md-2">提交</button>
                            <button @click="exit" class="btn btn-secondary">退出</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

  
<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, type PropType } from 'vue';

const props = defineProps({
    getData: Function,
    message: String,
    storyData: Object as PropType<Chapter | undefined>,
    weaponData: Object as PropType<Weapon | undefined>,

    exit: Boolean,
    onExit: Function,
})

let message = props.message;


// 故事章節 變數區域
//#region 
interface Chapter {
    ChapterID: number;
    Chapter: number;
    Title: string;
    StoryContent: string;

    // 用於顯示是否要展開
    showContent: boolean;
}

let chapter = ref(props.storyData?.Chapter || '');
let title = ref(props.storyData?.Title || '');
let content = ref(props.storyData?.StoryContent || '');
//#endregion


// 武器類型 變數區域
//#region
interface Weapon {
    WeaponID: number;
    WeaponName: string;
    WeaponType: string;
    WeaponDescription: string;
    WeaponDamage: number;

    // 用於顯示是否要展開
    showContent: boolean;
}
let weaponName = ref(props.weaponData?.WeaponName || '');
let weaponType = ref(props.weaponData?.WeaponType || '請選擇武器種類');
let weaponDescription = ref(props.weaponData?.WeaponDescription || '');
let weaponDamage = ref(props.weaponData?.WeaponDamage || '');
//#endregion


// 通用函數 
//#region 
const submitData = async () => {
    let data = {};
    let apiPath = '';
    let putINFO = '';
    if (message === '修改故事') {
        apiPath = 'http://localhost:3000/putStory';
        putINFO = '章節 : ' + chapter.value;
        data = {
            _chapterID: Number(props.storyData?.ChapterID),
            _chapter: Number(chapter.value),
            _title: title.value,
            _content: content.value
        }
        console.log(data);
    } else if (message === '修改武器') {
        apiPath = 'http://localhost:3000/putWeapons';
        putINFO = '武器 : ' + weaponName.value;
        data = {
            _weaponID: Number(props.weaponData?.WeaponID),
            _weaponName: weaponName.value,
            _weaponType: weaponType.value,
            _weaponDescription: weaponDescription.value,
            _weaponDamage: Number(weaponDamage.value)
        }
        console.log(data);
    }

    try {
        const result = await axios.put(apiPath, data);
        console.log(result.data);
        if (typeof props.getData === 'function') {
            await props.getData();
        }
        alert('修改' + putINFO + '成功')
    } catch (error: any) {
        alert('修改失敗');
        console.error('!!Error deleting data:', error.message);
    }
    exit();
};


// 視窗退出
const exit = async () => {
    if (props.exit && typeof props.onExit === 'function') {
        await props.onExit();
    }
};

//#endregion


</script>


<style lang="scss" scoped>
.container {}

.form-label {
    font-size: 20px;
    font-weight: 700;
}


.put-container {
    display: flex;
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0px;
    left: 0px;
    justify-content: center;
    align-items: center;

    .put {
        display: flex;
        position: fixed;
        max-width: 1000px;
        // max-height: 600px;
        width: 80%;
        height: auto;

        justify-content: center;
        align-items: center;

        .form {
            overflow-y: auto;
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            box-sizing: border-box;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }
    }
}

textarea {
    resize: none;
}
</style>
  
  