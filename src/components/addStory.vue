<!-- AddStory.vue -->
<template>
    <div class="container">


        <div class="d-grid">
            <button @click="openModal" class="btn btn-primary mb-3"><i class="fa-regular fa-square-plus"></i> 新增故事</button>
        </div>

        <!-- Modal -->
        <div ref="myModal" class="modal fade" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">新增故事</h5>
                        <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Form inside the modal -->
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
                                <textarea class="form-control" id="content" v-model="content" rows="4" required></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary">新增</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

const chapter = ref('');
const title = ref('');
const content = ref('');
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

const submitStory = () => {
    // Handle story submission logic here
    console.log('Chapter:', chapter.value);
    console.log('Title:', title.value);
    console.log('Content:', content.value);

    // Close the modal after submission
    closeModal();
};
</script>
  
<style scoped>
.container {
    max-width: 600px;
    margin: auto;
}

.form-label {
    font-weight: bold;
}
</style>
  