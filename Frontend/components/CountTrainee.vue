<template>
  <div class="bg-white text-center">
    {{ countTrainee }}
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp } from "#app";

const { $axios } = useNuxtApp();
const countTrainee = ref(0);

onMounted(async () => {
  try {
    const response = await $axios.get("/trainee/sumOfTrainee");
    countTrainee.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style></style>
