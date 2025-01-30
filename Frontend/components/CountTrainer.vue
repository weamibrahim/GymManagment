<template>
  <div class="bg-white text-center">
    {{ countTrainer }}
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useNuxtApp } from "#app";

const { $axios } = useNuxtApp();

const countTrainer = ref(0);

onMounted(async () => {
  try {
    const response = await $axios.get("/trainer/sumOfTrainer");
    countTrainer.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style></style>
