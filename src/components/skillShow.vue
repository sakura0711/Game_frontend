<template>
    <div class="container2">
        <div class="show">
            <div class="form">
                <button @click="exit" class="btn btn-exit"><i class="fa-solid fa-xmark"></i></button>


                <div class="skill_info-block">
                    <div class="header mb-3">
                        <img :src="imagePath" alt="" class="img">
                        <p class="name m-3">{{ skill.SkillName }}</p>
                    </div>

                    <div class="damage" :class="textStyle">
                        <i :class="iconStyle">&nbsp;{{ text }}&nbsp;</i>
                        <i :class="iconStyle"></i>
                        <p><strong :class="textStyle">&nbsp; {{ skill.SkillDamage }} </strong></p>
                    </div>

                    <div class="description text-success">
                        <i class="fa-solid fa-book mb-2">&nbsp;技能描述&nbsp;</i>
                        <i class="fa-solid fa-book mb-2"></i>
                        <h6 class="text-body text-break">{{ skill.SkillDescription }}</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, ref, type PropType } from 'vue';
import { onMounted } from 'vue'

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

const skill: Skill = {
    SkillID: props.SkillData?.SkillID ?? 0,
    SkillName: props.SkillData?.SkillName ?? '',
    SkillDescription: props.SkillData?.SkillDescription ?? '',
    SkillDamage: props.SkillData?.SkillDamage ?? 0,
    showContent: props.SkillData?.showContent ?? true,
};

interface Skill {
    SkillID: number;
    SkillName: string;
    SkillDescription: string;
    SkillDamage: number;

    showContent: boolean;
}
const exit = async () => {
    if (props.exit && typeof props.onExit === 'function') {
        await props.onExit();
    }
};

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
        height: 500px;
        justify-content: center;
        align-items: center;

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