<template>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <div class="container2">
        <div class="show">
            <div class="form-2" style="color: azure;">
                empty :D
            </div>
            <div class="form">
                <button @click="exit" class="btn btn-exit"><i class="fa-solid fa-xmark"></i></button>
                <div class="player_header d-flex mb-1">
                    <img src="https://i.imgur.com/DziuEw7.jpeg" alt="">
                    <p class="name fs-5 fw-bold">{{ PlayerData?.PlayerName }} <i class="lv fs-6">&nbsp;lv. &nbsp;{{
                        PlayerData?.playerLevel
                    }}</i></p>
                </div>

                <p class="chapter"><i class="fa-solid fa-book-bookmark">&nbsp;主線進度&nbsp;</i>
                    <i class="fa-solid fa-book-bookmark"></i>&nbsp;&nbsp;{{ PlayerData?.MainChapter.chapter }}
                </p>

                <div class="equipment mb-4">
                    <i class="fa-solid fa-gun"><i>&nbsp;
                            {{ PlayerData?.playerWeapon.name }}
                            ({{ PlayerData?.playerWeapon.type }}) </i>
                    </i>

                    <br>
                    <i class="fa-solid fa-shirt">&nbsp; 暫無身體裝備</i>
                </div>

                <div class="skill mb-4">
                    <i class="fa-solid fa-bolt text-danger">&nbsp;攻擊技能&nbsp;</i>
                    <i class="fa-solid fa-bolt text-danger"></i>
                    <i v-if="!PlayerData?.AttackSkill.name" class="text-muted">&nbsp; no skill </i>
                    <i v-else class="text-muted">&nbsp; {{ PlayerData?.AttackSkill.name }}</i>

                    <br>


                    <i class="fa-solid fa-shield-halved text-primary">&nbsp;防禦技能&nbsp;</i>
                    <i class="fa-solid fa-shield-halved text-primary"></i>
                    <i v-if="!PlayerData?.DefenseSkill.name" class="fs-6">&nbsp; no skill</i>
                    <i v-else class="fs-6">&nbsp; {{ PlayerData?.DefenseSkill.name }}</i>

                    <br>

                    <i class="fa-solid fa-hands-holding-circle text-success">&nbsp;輔助技能&nbsp;</i>
                    <i class="fa-solid fa-hands-holding-circle text-success"> </i>
                    <i v-if="!PlayerData?.SupportSkill.name" class="text-muted">&nbsp; no skill</i>
                    <i v-else class="fs-6">&nbsp; {{ PlayerData?.SupportSkill.name }}</i>

                </div>

                <div class="message_board text-break ">
                    {{ PlayerData?.playerComment }}
                </div>

                <div class="uuid text-end">UUID: {{ PlayerData?.PlayerUUID }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, ref, type PropType } from 'vue';
import { onMounted } from 'vue'

const props = defineProps({
    PlayerData: Object as PropType<Player>,

    exit: Boolean,
    onExit: Function,
})



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
    playerComment: string;
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
        height: 550px;
        justify-content: center;
        align-items: center;

        .form,
        .form-2 {
            overflow-x: hidden;
            overflow-y: auto;
            position: relative;
            display: flex;
            flex-direction: column;

            width: 100%;
            height: 100%;

            background-color: #fff;
            padding: 10px 10px 5px 10px;
            margin: 0 2px;

            border: pink 2px solid;
            border-radius: 10px;
            box-sizing: border-box;
            /* box-shadow: 0px 0px 20px 0px rgba(122, 71, 71, 0.616); */
        }

        .form-2 {
            background: rgba(0, 0, 0, 0.5);
        }
    }
}

.btn-exit {
    color: pink;

    width: 35px;
    height: 35px;
    position: absolute;
    border-radius: 10px;
    border: pink 3px solid;

    z-index: 100;
    top: 5px;
    right: 5px;
    padding: 4px;
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



.player_header {
    .name {
        padding: 0;
        margin-top: 10px;

    }
}

.equipment,
.skill {
    position: relative;
    font-size: 14px;
    border: #ffb1b1 2px solid;
    padding: 15px 5px 5px 10px;
    border-radius: 10px;
}

.equipment::after,
.skill::after {
    content: "裝備";
    position: absolute;
    width: 50px;
    height: 20px;
    text-align: center;
    left: 10px;
    top: -10px;
    background: #ff7575;

    color: #ffffff;
    font: 700 14px/20px Roboto;
    border-radius: 10px;
}

.skill::after {
    content: '技能';
}


.message_board {
    position: relative;
    font-size: 14px;
    border: #ffb1b1 2px solid;
    padding: 15px 5px 5px 10px;
    border-radius: 10px;
    font: 700 14px/20px 'Segoe UI';
    letter-spacing: 2px;
    height: 100%;
}

.message_board::after {
    content: "玩家留言板";
    position: absolute;
    width: 100px;
    height: 20px;
    text-align: center;
    left: 10px;
    top: -10px;
    background: #ff7575;

    color: #ffffff;

    border-radius: 10px;
}

.uuid {
    font-size: 14px;
}

i {
    font-style: normal;
}

img {
    box-sizing: border-box;
    border-radius: 40px;
    width: 85px;
    height: 45px;
    margin-right: 10px;
    border: #e5e5e5 2px solid;
}
</style>