<template>
  <div class="bg-gray-200 h-screen">
    <div class="flex justify-center items-center py-10">
      <div class="bg-white w-4/5 h-4/5 p-5">
        <div class="flex items-center justify-center mb-6">
          <client-only
            ><font-awesome-icon
              icon="user"
              class="text-2xl font-bold text-sky-600"
          /></client-only>
          <div class="text-2xl font-bold ml-2">Trainee details</div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div class="text-lg font-bold">Name:</div>
            <div class="text-lg">{{ trainee.name }}</div>
          </div>

          <div>
            <div class="text-lg font-bold">Phone:</div>
            <div class="text-lg">{{ trainee.phone }}</div>
          </div>

          <div>
            <div class="text-lg font-bold">Age:</div>
            <div class="text-lg">{{ trainee.age }}</div>
          </div>

          <div>
            <div class="text-lg font-bold">Status:</div>
            <div class="text-lg">{{ trainee.subscriptionStatus }}</div>
          </div>

          <div>
            <div class="text-lg font-bold">Subscription Start Date:</div>
            <div class="text-lg">
              {{ formatDate(trainee.subscriptionStartDate) }}
            </div>
          </div>

          <div>
            <div class="text-lg font-bold">Subscription End Date:</div>
            <div class="text-lg">
              {{ formatDate(trainee.subscriptionEndDate) }}
            </div>
          </div>
        </div>

        
        <div class="mt-6 flex justify-center items-center">
          <img
            id="barcode"
            :src="getBarcodeUrl(trainee.barcode)"
            alt="Barcode"
          />
        </div>

       
        <div class="flex justify-center items-center mt-4">
          <button
            @click="downloadBarcodeImage"
            class="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            Download Barcode
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Trainee Details",
})
import { useRouter, useRoute } from "vue-router";

import { useNuxtApp } from "#app";
import { ref, onMounted } from "vue";

const trainee = ref({});

const router = useRouter();
const route = useRoute();
const id = route.params.id;

// const { data: trainee } = await useFetch(`http://localhost:7000/api/trainee/${id}`);

const { $axios, $formatDate } = useNuxtApp();

const getTrainee = async () => {
  try {
    const response = await $axios.get(`/trainee/${id}`);
    trainee.value = response.data;
    console.log('Start Date:', trainee.value.subscriptionStartDate); // Log the date
    console.log('End Date:', trainee.value.subscriptionEndDate);  
    console.log(trainee.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getTrainee();
});
const formatDate = (dateString) => {

  //console.log(dateString);
  return $formatDate(dateString);
};

const getBarcodeUrl = (barcode) => {
  console.log(barcode);
  return `http://localhost:7000/api/trainee/barcode/${barcode}`;
};

const downloadBarcodeImage = () => {
  const barcode = useNuxtApp().$barcode;
  barcode.downloadBarcodeImage(); 
};
</script>

<style scoped>
img {
  margin-top: 10px;
  width: 700px;
  height: 150px;
}
</style>
