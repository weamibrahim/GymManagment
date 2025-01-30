<template>
  <div class="bg-gray-200 h-screen py-12">
    <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold mb-4 text-center">Edit Trainee</h1>
      <form @submit.prevent="submitForm" class="space-y-4">
       
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="trainee.name"
            type="text"
            id="name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter trainee's name"
            required
          />
        </div>

        <div>
          <label for="age" class="block text-sm font-medium text-gray-700"
            >Age</label
          >
          <input
            v-model="trainee.age"
            type="number"
            id="age"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter trainee's age"
            required
          />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700"
            >Phone</label
          >
          <input
            v-model="trainee.phone"
            type="text"
            id="phone"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter trainee's phone number"
            required
          />
        </div>

    
        <div>
          <label
            for="subscriptionStartDate"
            class="block text-sm font-medium text-gray-700"
            >Subscription Start Date</label
          >
          <input
            v-model="trainee.subscriptionStartDate"
            type="date"
            id="subscriptionStartDate"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>


        <div>
          <label
            for="subscriptionEndDate"
            class="block text-sm font-medium text-gray-700"
            >Subscription End Date</label
          >
          <input
            v-model="trainee.subscriptionEndDate"
            type="date"
            id="subscriptionEndDate"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            for="subscriptionStatus"
            class="block text-sm font-medium text-gray-700"
            >Subscription Status</label
          >
          <select
            v-model="trainee.subscriptionStatus"
            id="subscriptionStatus"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="active">Active</option>
            <option value="warning">Warning</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label
            for="regenerateBarcode"
            class="block text-sm font-medium text-gray-700"
            >Regenerate Barcode</label
          >
          <input
            class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="checkbox"
            id="regenerateBarcode"
            v-model="trainee.regenerateBarcode"
          />
        </div>
     
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Update Trainee",
});
import { reactive, onMounted } from "vue";
import { useNuxtApp } from "#app";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const { $axios, $toast } = useNuxtApp();
// Reactive state to store trainee data
const trainee = reactive({
  name: "",
  age: "",
  phone: "",
  subscriptionStartDate: "",
  subscriptionEndDate: "",
  subscriptionStatus: "",
  regenerateBarcode: "false",
});

// // Fetch trainee data using useFetch
// const { data } = useFetch(`http://localhost:7000/api/trainee/${id}`);

// watchEffect(() => {
//   if (data.value) {
//     Object.assign(trainee, data.value); // Update trainee data after fetching
//   }
// });

// Fetch trainee data using Axios
const getTrainee = async () => {
  try {
    const response = await $axios.get(`/trainee/${id}`);

    Object.assign(trainee, response.data);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getTrainee();
});
const submitForm = async () => {
  try {
    const response = await $axios.put(`/trainee/update/${id}`, trainee);
    $toast.success(response.data.message);
    router.push("/dashboard/allTrainee");
  } catch (error) {
    alert("Failed to update trainee. Please try again.");
    console.error(error);
  }
};
</script>
