<!-- AddStory.vue -->
<template>
    <div class="container">

        <div class="d-grid" v-if="message == '新增故事'">
            <button @click="openModal" class="btn btn-primary mb-3"><i class="fa-regular fa-square-plus"></i>
                {{ message }}</button>
        </div>

        <div class="d-grid lh-lg" v-if="message == '修改故事'">
            <button @click="openModal" class="btn btn-secondary mb-4 green" style="height: 100%;"><i
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
                                <textarea class="form-control" id="content" v-model="content" rows="10" required></textarea>
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


interface Chapter {
    ChapterID: number;
    Chapter: number;
    Title: string;
    StoryContent: string;

    // 用於顯示是否要展開
    showContent: boolean;
}


const props = defineProps({
    getData: Function,
    message: String,
    data: Object as PropType<Chapter | undefined>,
})

let message = props.message;



let chapter = ref(props.data?.Chapter || '');
let title = ref(props.data?.Title || '');
let content = ref(props.data?.StoryContent || '');

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
    if (props.message == '新增故事') {
        const data = {
            _chapter: Number(chapter.value),
            _title: title.value,
            _content: content.value
        }
        console.log(data);

        try {
            const result = await axios.post('http://localhost:3000/addStory', data);
            console.log(result.data);
            if (typeof props.getData === 'function') {
                await props.getData();
            }
            chapter.value = '';
            title.value = '';
            content.value = '';
        } catch (error: any) {
            if (error.response.data.loadType == '') {
                alert('此章節已被引用，無法刪除');
            } else {
                console.error('!!Error deleting data:', error.message);
            }
        }
    }
    else {
        const data = {
            _chapterID: Number(props.data?.ChapterID),
            _chapter: Number(chapter.value),
            _title: title.value,
            _content: content.value
        }
        console.log(data);

        try {
            const result = await axios.put('http://localhost:3000/putStory', data);
            console.log(result.data);
            if (typeof props.getData === 'function') {
                await props.getData();
            }
            chapter.value = '';
            title.value = '';
            content.value = '';
        } catch (error: any) {
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
  