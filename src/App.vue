<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import router from './router';


/**
 * 使用生命週期函數，重新掛載(mount)後執行。
 * 重新整理頁面 = 重新掛載
 * 
 * @event router-push-to-home(/)
*/
onMounted(() => {
  console.debug(`onMounted`);
  router.push('/');
});

</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
