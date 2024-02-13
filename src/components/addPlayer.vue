<template>
    <div class="container2">

        <div class="show">
            <button @click="exit" class="btn btn-exit"><i class="fa-solid fa-xmark"></i></button>
            <!-- <strong class="mb-6 text-center header">新增玩家</strong> -->

            <div class="form-2 mb-3">
                <div class="mb-3">
                    <label for="playerName" class="form-label">玩家名稱 &nbsp; 等級 lv. 1 (默認)</label>
                    <input type="text" class="form-control" id="playerName" v-model="player.PlayerName">
                </div>

                <div v-if="player.PlayerName !== ''" class="mb-3">
                    <label for="weapon" class="form-label">武器(請選擇)</label>
                    <select class="form-select" id="weapon" v-model="player.playerWeaponID">
                        <option v-for="(weapon, index) in ResWeaponsData" :key="index" :value="weapon.WeaponID">
                            {{ weapon.WeaponName }} [{{ weapon.WeaponType }}]
                        </option>
                    </select>
                </div>

                <div v-if="player.playerWeaponID !== 0" class="mb-3">
                    <label for="attackSkill" class="form-label"> <i
                            class="fa-solid fa-bolt text-danger">&nbsp;攻擊技能&nbsp;</i>
                        <i class="fa-solid fa-bolt text-danger"></i></label>
                    <select class="form-select" id="attackSkill" v-model="player.AttackSkillID">
                        <option v-for="(skill, index) in ResAttackSkillData" :key="index" :value="skill.SkillID">
                            {{ skill.SkillName }} [{{ skill.SkillDamage }}]
                        </option>
                    </select>
                </div>

                <div v-if="player.AttackSkillID != 0" class="defense-skill mb-3">
                    <label for="attackSkill" class="form-label"> <i
                            class="fa-solid fa-shield-halved text-primary">&nbsp;防禦技能&nbsp;</i>
                        <i class="fa-solid fa-shield-halved text-primary"></i></label>
                    <select class="form-select" id="attackSkill" v-model="player.DefenseSkillID">
                        <option v-for="(skill, index) in ResDefenseSkillData" :key="index" :value=skill.SkillID>
                            {{ skill.SkillName }} [{{ skill.SkillDamage }}]</option>
                    </select>
                </div>

                <div v-if="player.DefenseSkillID != 0" class="support-skill mb-3">
                    <label for="attackSkill" class="form-label"><i
                            class="fa-solid fa-hands-holding-circle text-success">&nbsp;輔助技能&nbsp;</i>
                        <i class="fa-solid fa-hands-holding-circle text-success"> </i></label>
                    <select class="form-select" id="attackSkill" v-model="player.SupportSkillID">
                        <option v-for="(skill, index) in ResSupportSkillData" :key="index" :value=skill.SkillID>
                            {{ skill.SkillName }} [{{ skill.SkillDamage }}]</option>
                    </select>
                </div>

                <!-- <div v-if="player.SupportSkillID != 0" class="player-lv mb-3">
                    等級 lv. 1 (你無法更改此選項 :D)
                </div> -->

                <div v-if="player.SupportSkillID != 0" class="chapter mb-3">
                    <label for="attackSkill" class="form-label">主線進度</label>
                    <select class="form-select" id="attackSkill" v-model="player.MainChapterID">
                        <option v-for="(chapter, index) in ResChapterData" :key="index" :value=chapter.ChapterID>
                            {{ chapter.Chapter }} [{{ chapter.Title }}]</option>
                    </select>
                </div>

                <div v-if="player.MainChapterID != 0" class="mb-3">
                    <label for="comment" class="form-label">輸入自我介紹吧 :D</label>
                    <textarea class="form-control" id="comment" v-model="player.playerComment"></textarea>
                </div>

            </div>


            <div v-if="player.playerComment != '' && player.MainChapterID != 0 && player.PlayerName !== ''"
                class="create-btn">
                <button @click="CreateNewPlayer" class="create-btn">創建角色</button>
            </div>

        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed, type Ref, onMounted } from 'vue';
import axios from 'axios';

// 向父組件發射 emit 訊號 讓父元件去向後端請求資料 以刷新頁面(拿到最新資料)
const emit = defineEmits(['submit'])
function submitClick() {
    emit('submit')
}

const props = defineProps({
    exit: Boolean,
    onExit: Function,
})

interface Weapon {
    WeaponID: number,
    WeaponName: string,
    WeaponType: string,
    WeaponDescription: string,
    WeaponDamage: number
}

interface Chapter {
    ChapterID: number;
    Chapter: number;
    Title: string;
    StoryContent: string;
}

interface Skills {
    SkillID: number;
    SkillName: string;
    SkillDescription: string;
    SkillDamage: number;
}
interface Player {
    [x: string]: any;
    PlayerUUID: string;
    PlayerName: string;
    playerWeaponID: number;
    AttackSkillID: number;
    DefenseSkillID: number;
    SupportSkillID: number;
    MainChapterID: number;
    playerLevel: number;
    playerComment: string;

}

const player: Ref<Player> = ref({
    PlayerUUID: '',
    PlayerName: '',
    playerWeaponID: 0,
    AttackSkillID: 0,
    DefenseSkillID: 0,
    SupportSkillID: 0,
    MainChapterID: 0,
    playerLevel: 1,
    playerComment: '',
});


const ResWeaponsData = ref<Weapon[]>([]);
const getWeapons = async () => {
    try {
        const Res = await axios.get('http://localhost:3000/getWeapons');
        ResWeaponsData.value = Res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    console.log("data", ResWeaponsData.value);
};


const ResAttackSkillData = ref<Skills[]>([]);
const getAttackSkill = async () => {
    try {
        const Res = await axios.get('http://localhost:3000/getAttackSkills');
        ResAttackSkillData.value = Res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    console.log("data", ResAttackSkillData.value);
};


const ResDefenseSkillData = ref<Skills[]>([]);
const getDefenseSkill = async () => {
    try {
        const Res = await axios.get('http://localhost:3000/getDefenseSkill');
        ResDefenseSkillData.value = Res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    console.log("data", ResDefenseSkillData.value);
};

const ResSupportSkillData = ref<Skills[]>([]);
const getSupportSkill = async () => {
    try {
        const Res = await axios.get('http://localhost:3000/getSupportSkill');
        ResSupportSkillData.value = Res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    console.log("data", ResSupportSkillData.value);

};

const ResChapterData = ref<Chapter[]>([]);
const getChapter = async () => {
    try {
        const Res = await axios.get('http://localhost:3000/getStory');
        ResChapterData.value = Res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    console.log("data", ResChapterData.value);
};


const CreateNewPlayer = async () => {
    const randomString: string = generateRandomNumber();
    let apiPath = 'http://localhost:3000/addPlayer';
    let data = {
        // 玩家 UUID 由電腦自動產生
        _playerUUID: randomString,
        _playerName: player.value.PlayerName,
        _weaponUUID: player.value.playerWeaponID,
        _attackSkillID: player.value.AttackSkillID,
        _defenseSkillID: player.value.DefenseSkillID,
        _supportSkillID: player.value.SupportSkillID,
        _mainChapterID: player.value.MainChapterID,
        _playerLevel: 1, // 默認 1 等 :D
        _playerComment: player.value.playerComment,
    }
    console.log("data", data);
    try {
        const result = await axios.post(apiPath, data);
        console.log(result.data);
        alert('新增成功');
        submitClick();
        exit();
    } catch (error: any) {
        alert('新增失敗');
        console.error('!!Error deleting data:', error.message);

    }
}

function generateRandomNumber(): string {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return randomNumber.toString();
}

const exit = async () => {
    if (props.exit && typeof props.onExit === 'function') {
        await props.onExit();
    }
};

onMounted(() => {
    getAttackSkill();
    getWeapons();
    getDefenseSkill();
    getSupportSkill();
    getChapter();
});

</script>
  
<style scoped>
.container2 {

    font-family: Itim, sans-serif;

    display: flex;
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(66, 66, 66, 0.836);
    top: 0px;
    left: 0px;
    justify-content: center;
    align-items: center;

    .show {
        display: flex;
        position: fixed;
        width: 700px;
        /* height: 550px; */
        height: auto;
        justify-content: center;
        align-items: center;

        flex-direction: column;

        .form,
        .form-2 {
            /* overflow-x: hidden; */
            overflow-y: auto;
            position: relative;
            display: flex;
            flex-direction: column;
            color: black;
            width: 100%;
            /* height: 100%; */

            background-color: #fff;
            padding: 10px 10px 5px 10px;
            margin: 0 2px;

            border: pink 2px solid;
            /* border-radius: 0 0 10px 10px; */
            border-radius: 10px;
            box-sizing: border-box;
            /* box-shadow: 0px 0px 20px 0px rgba(122, 71, 71, 0.616); */
        }

        .form-2 {
            font: 800 16px/1.5 'Itim', sans-serif;
            color: #ffffff;
            background: rgba(0, 0, 0, 0.644);
        }
    }
}

.header {
    border: #fff 2px solid;
    border-bottom: 0;

    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px 10px 0 0;
    background-color: rgb(255, 139, 158);
    color: #fff;
    font: 700 20px/50px Roboto;
}

.create-btn {
    -webkit-user-select: none;

    font: 700 18px/40px Roboto;
    width: 100%;
    border-radius: 10px;
    height: 40px;
    color: #fff;
    background-color: rgb(255, 139, 158);
    transition: all 1s;

}

.btn-exit {
    color: rgb(255, 255, 255);

    width: 30px;
    height: 30px;
    position: absolute;
    border-radius: 10px;
    border: rgb(255, 178, 178) 2px solid;

    z-index: 100;
    top: 7px;
    right: 7px;
    padding: 2px;
    transition: all 0.5s ease;
}

.btn-exit:hover {
    color: rgb(255, 178, 178);
    border: rgb(255, 255, 255) 2px solid;
    background: #fff;
}


/* 將旁邊滾動條 設為隱藏 */
body {
    scrollbar-width: thin;
    /* for Firefox */
    scrollbar-color: transparent transparent;
    /* for Firefox */
    overflow-y: scroll;
    /* for Chrome, Safari, and Edge */
}

/* 隱藏滾動條上下箭頭，如果需要的話 */
::-webkit-scrollbar {
    width: 12px;
    /* for Chrome, Safari, and Edge */
}

::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* for Chrome, Safari, and Edge */
}

::-webkit-scrollbar-track {
    background-color: transparent;
    /* for Chrome, Safari, and Edge */
}
</style>
  