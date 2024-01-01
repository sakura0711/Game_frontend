<template>
    <div class="container2">
        <div class="show">
            <div class="form">
                <button @click="exit" class="btn btn-exit"><i class="fa-solid fa-xmark"></i></button>


                <div class="skill_info-block">
                    <div class="header mb-3">
                        <img src="https://i.imgur.com/uCDQUZN.jpeg" alt="" class="img">
                        <p class="name m-3">{{ skill.SkillName }}</p>
                    </div>

                    <div class="damage text-danger">
                        <i class="fa-solid fa-bolt"> 技能傷害&nbsp;</i>
                        <i class="fa-solid fa-bolt"></i>
                        <p><strong class="text-danger">&nbsp; {{ skill.SkillDamage }} </strong></p>
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

const props = defineProps({
    message: String,
    SkillData: Object as PropType<Skill>,

    exit: Boolean,
    onExit: Function,
})



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
.container2 {
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
        font: 600 20px/15px 'Microsoft YaHei';
    }

    .description {
        .text-body {
            width: 100%;
            height: 200px;
            font: 400 15px/25px 'Microsoft YaHei';

            letter-spacing: 2px;
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