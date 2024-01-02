<template>
    <div class="container2">
        <div class="show">
            <div class="form mb-3">
                <button @click="exit" class="btn btn-exit"><i class="fa-solid fa-xmark"></i></button>
                <div class="skill_info-block">
                    <div class="header mb-3">
                        <img :src="imagePath" alt="" class="img">
                        <p v-if="!putClick" class="name m-3">{{ skill.SkillName }}</p>
                        <input v-if="putClick" type="text" v-model="skill.SkillName">
                    </div>

                    <div class="damage" :class="textStyle">
                        <i :class="iconStyle">&nbsp;{{ text }}&nbsp;</i>
                        <i :class="iconStyle"></i>
                        <p v-if="!putClick"><strong :class="textStyle">&nbsp; {{ skill.SkillDamage }} </strong></p>
                        <input v-if="putClick" type="number" v-model="skill.SkillDamage">
                    </div>

                    <div class="description text-success">
                        <i class="fa-solid fa-book mb-2">&nbsp;技能描述&nbsp;</i>
                        <i class="fa-solid fa-book mb-2"></i>
                        <h6 v-if="!putClick" class="text-body text-break">{{ skill.SkillDescription }}</h6>
                        <br><textarea v-if="putClick" type="text" v-model="skill.SkillDescription"></textarea>

                    </div>
                </div>
            </div>


            <button v-if="!putClick" class="btn-put" @click="putOnClick"><i
                    class="fa-solid fa-pen-to-square">&nbsp;修改技能</i></button>
            <button v-if="putClick" class="btn-put" @click="submitPutData"><i
                    class="fa-solid fa-pen-to-square">&nbsp;完成修改</i></button>
        </div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { defineProps, ref, type PropType, type Ref } from 'vue';
import { onMounted } from 'vue'

// 向父組件發射 emit 訊號 讓父元件去向後端請求資料 以刷新頁面(拿到最新資料)
const emit = defineEmits(['submit'])
function submitClick() {
    emit('submit')
}

const props = defineProps({
    message: String,
    SkillData: Object as PropType<Skill>,

    exit: Boolean,
    onExit: Function,
})

let textStyle = ref('');
let iconStyle = ref('');
let text = ref('');
let imagePath = ref('');
const judgeStyle = () => {
    if (props.message == '攻擊技能') {
        text.value = '技能傷害';
        textStyle.value = 'text-danger';
        iconStyle.value = 'fa-solid fa-bolt';
        imagePath.value = 'https://i.imgur.com/jBmDoVC.jpeg'
    }
    else if (props.message == '防禦技能') {
        text.value = '護甲能量';
        textStyle.value = 'text-primary';
        iconStyle.value = 'fa-solid fa-shield-halved';
        imagePath.value = 'https://i.imgur.com/uCDQUZN.jpeg'
    }
    else if (props.message == '輔助技能') {
        text.value = '治療量';
        textStyle.value = 'text-success';
        iconStyle.value = 'fa-solid fa-hands-holding-circle';
        imagePath.value = 'https://i.imgur.com/dWGVJDK.png'
    }
}
onMounted(judgeStyle);

const skill: Ref<Skill> = ref({
    SkillID: props.SkillData?.SkillID ?? 0,
    SkillName: props.SkillData?.SkillName ?? '',
    SkillDescription: props.SkillData?.SkillDescription ?? '',
    SkillDamage: props.SkillData?.SkillDamage ?? 0,
});

interface Skill {
    SkillID: number;
    SkillName: string;
    SkillDescription: string;
    SkillDamage: number;
}
const exit = async () => {
    if (props.exit && typeof props.onExit === 'function') {
        await props.onExit();
    }
};

const submitPutData = async () => {
    let data = {
        _skillID: Number(skill.value.SkillID),
        _skillName: skill.value.SkillName,
        _skillDescription: skill.value.SkillDescription,
        _skillDamage: Number(skill.value.SkillDamage)
    }
    let apiPath = '';
    let putINFO = '';

    if (props.message === '攻擊技能') {
        apiPath = 'http://localhost:3000/putAttackSkill';
        putINFO = '攻擊技能 : ' + skill.value.SkillName;
        console.log(skill.value);
    } else if (props.message === '防禦技能') {
        apiPath = 'http://localhost:3000/putDefenseSkill';
        putINFO = '防禦技能 : ' + skill.value.SkillName;
        console.log(skill.value);
    } else if (props.message === '輔助技能') {
        apiPath = 'http://localhost:3000/putSupportSkill';
        putINFO = '輔助技能 : ' + skill.value.SkillName;
        console.log(skill.value);
    }

    try {
        const result = await axios.put(apiPath, data);
        console.log(result.data);
        putOnClick();
        submitClick();
        alert('修改' + putINFO + '成功')
        // exit();
    } catch (error: any) {
        alert('修改失敗');
        console.error('!!Error deleting data:', error.message);
    }

};

const putClick = ref(false);
const putOnClick = () => {
    putClick.value = !putClick.value;
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@500&display=swap');

.container2 {
    font-family: Itim, naikaifont, Microsoft JhengHei, sans-serif;

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
        width: 400px;
        height: auto;
        justify-content: center;
        align-items: center;

        flex-direction: column;

        .form {
            overflow-x: hidden;
            overflow-y: auto;
            position: relative;
            display: flex;
            flex-direction: column;

            width: 100%;
            height: 100%;

            background-color: #fff;
            padding: 20px;

            border: pink 2px solid;
            border-radius: 10px;
            box-sizing: border-box;
            /* box-shadow: 0px 0px 20px 0px rgba(122, 71, 71, 0.616); */
        }
    }
}

.btn-put {
    -webkit-user-select: none;

    width: 100%;
    border-radius: 10px;
    height: 40px;
    color: #fff;
    background-color: pink;
}

.btn-exit {
    color: pink;

    width: 40px;
    height: 40px;
    position: absolute;
    border-radius: 10px;
    border: pink 3px solid;

    z-index: 100;
    top: 5px;
    right: 5px;

    transition: all 0.5s ease;
}

.btn-exit:hover {
    color: rgb(255, 255, 255);
    background: #e27777;
}

.img {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 10%;
    border: #929292 3px solid;
}


.skill_info-block {
    -webkit-user-select: none;

    .name {
        display: inline-block;
        font: 600 20px/15px Itim, 'Microsoft YaHei';
    }

    .description {
        .text-body {
            width: 100%;
            height: 310px;
            font: 400 14px/25px Itim, 'Kaisei Decol', serif;
            letter-spacing: 2px;
            border: pink dashed 2px;
            border-radius: 10px;
            padding: 5px 10px;
        }
    }


    p {
        display: inline-block;
    }
}

i {
    font-style: normal;
}
</style>