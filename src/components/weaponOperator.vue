<!-- AddStory.vue -->
<template>
    <div class="container">

        <div class="d-grid" v-if="message == '新增武器'">
            <button @click="openModal" class="btn btn-primary mb-3"><i class="fa-regular fa-square-plus"></i>
                {{ message }}</button>
        </div>

        <div class="d-grid lh-lg" v-if="message == '修改武器'">
            <button @click="openModal" class="btn btn-secondary mb-4" style="height: 100%;"><i
                    class="fa-solid fa-pen-to-square"> 修改</i>
            </button>
        </div>


        <!-- Modal -->
        <div ref="myModal" class="modal fade" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ message }}</h5>
                        <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <!-- @submit.prevent 是 vue 為了替代表單的默認提交行為 
                             submitStory 是我們自定義的方法，用於處理表單提交-->
                        <form @submit.prevent="submitStory">
                            <div class="mb-3">
                                <label for="chapter" class="form-label">武器名稱</label>
                                <input type="text" class="form-control" id="chapter" v-model="weaponName" required>
                            </div>

                            <div class="mb-3">
                                <label for="title" class="form-label">武器種類</label>
                                <!-- <input type="text" class="form-control" id="title" v-model="weaponType" required> -->
                                <select class="form-select" aria-label="Default select example" v-model="weaponType"
                                    required>
                                    <option selected disabled>請選擇武器種類</option>
                                    <option value="大劍">大劍</option>
                                    <option value="單手劍">單手劍</option>
                                    <option value="法杖">法杖</option>
                                    <option value="弓">弓</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="content" class="form-label">武器描述</label>
                                <textarea class="form-control" id="content" v-model="weaponDescription"
                                    rows="10"></textarea>
                            </div>

                            <div class="mb-3">
                                <label for="content" class="form-label">武器傷害</label>
                                <input type="number" class="form-control" id="title" v-model="weaponDamage" required>
                            </div>

                            <button type="submit" class="btn btn-primary">送出</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import axios from 'axios';

import { ref, onMounted, type PropType } from 'vue';

interface Weapon {
    WeaponID: number,
    WeaponName: string,
    WeaponType: string,
    WeaponDescription: string,
    WeaponDamage: number

    // 用於顯示是否要展開
    showContent: boolean;
}


const props = defineProps({
    getData: Function,
    message: String,
    data: Object as PropType<Weapon | undefined>,
})

let message = props.message;

let weaponName = ref(props.data?.WeaponName || '');
let weaponType = ref(props.data?.WeaponType || '');
let weaponDescription = ref(props.data?.WeaponDescription || '');
let weaponDamage = ref(props.data?.WeaponDamage || '');

const myModal = ref<HTMLElement | null>(null);

const openModal = () => {
    if (myModal.value) {
        // Open the modal
        myModal.value.classList.add('show');
        myModal.value.style.display = 'block';
        document.body.classList.add('modal-open');
    }
};

const closeModal = () => {
    if (myModal.value) {
        // Close the modal
        myModal.value.classList.remove('show');
        myModal.value.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
};

const submitStory = async () => {
    if (props.message == '新增武器') {
        const data = {
            _weaponName: weaponName.value,
            _weaponType: weaponType.value,
            _weaponDescription: weaponDescription.value,
            _weaponDamage: Number(weaponDamage.value)
        }
        console.log(data);

        try {
            const result = await axios.post('http://localhost:3000/addWeapons', data);
            console.log(result.data);
            if (typeof props.getData === 'function') {
                await props.getData();
            }
            weaponName.value = '';
            weaponType.value = '';
            weaponDescription.value = '';
            weaponDamage.value = '';

        } catch (error: any) {
            console.error('!!Error deleting data:', error.message);
        }
    }
    else {
        const data = {
            _weaponID: Number(props.data?.WeaponID),
            _weaponName: weaponName.value,
            _weaponType: weaponType.value,
            _weaponDescription: weaponDescription.value,
            _weaponDamage: Number(weaponDamage.value)
        }
        console.log(data);
        try {
            const result = await axios.put('http://localhost:3000/putWeapons', data);
            console.log(result.data);
            if (typeof props.getData === 'function') {
                await props.getData();
            }
            weaponName.value = '';
            weaponType.value = '';
            weaponDescription.value = '';
            weaponDamage.value = '';
        }
        catch (error: any) {
            console.error('!!Error deleting data:', error.message);
        }
    }

    closeModal();
};

console.log(props.data);

</script>
  
<style scoped>
.container {
    max-width: 600px;
    margin: auto;
}

.form-label {
    font-weight: bold;
}

.btn-secondary {
    background-color: rgb(12, 148, 0);
}
</style>
  