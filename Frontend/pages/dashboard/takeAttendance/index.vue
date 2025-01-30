<template>
  <div class="bg-gray-200 h-screen">
    <div class="flex justify-center items-center pt-20">
      <div>
        <input
          type="text"
          v-model="Attendance"
          ref="barcodeInput"
          :disabled="isProcessing"
          placeholder="Scan or Enter Barcode"
          @input="debouncedHandleInput"
          class="p-2 border rounded"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Take Attendance",
});
import { ref, onMounted, nextTick } from "vue";

import { useNuxtApp } from "#app";
import { useRouter } from "vue-router";
import debounce from "lodash.debounce";

let successSound, errorSound;

if (import.meta.client) {
  successSound = new Audio("/success.wav");
  errorSound = new Audio("/error.wav");
}

const router = useRouter();
const { $axios, $toast } = useNuxtApp();

const barcodeInput = ref(null);
const Attendance = ref("");
const isProcessing = ref(false); // Flag to prevent multiple scans

onMounted(() => {
  barcodeInput.value.focus();
});

const handleInput = async () => {
  if (isProcessing.value || !Attendance.value.trim()) return; // Prevent processing if already scanning or empty input
  isProcessing.value = true;

  try {
    const response = await $axios.post("/attendance/add", {
      barcode: Attendance.value,
    });
    console.log(response);

    if (response.status === 200) {
      if (import.meta.client) successSound.play();
      $toast.success(response.data.message);
    } else if (response.status === 201) {
      if (import.meta.client) successSound.play();
      $toast.warning(response.data.message);
    }
  } catch (error) {
    console.error(error);
    if (import.meta.client) errorSound.play();
    $toast.error(error.response.data.message);
  } finally {
   
    Attendance.value = "";
    nextTick(() => {
      barcodeInput.value.focus();
    });
    isProcessing.value = false;
  }
};


const debouncedHandleInput = debounce(handleInput, 500); // Adjust the debounce delay as needed to write all scan in one time (500ms here)
</script>
