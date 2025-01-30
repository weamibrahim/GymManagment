<template>
  <div class="bg-gray-200 py-12">
    <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold mb-4 text-center">Add Trainer</h1>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="trainer.name"
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
            v-model="trainer.age"
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
            v-model="trainer.phone"
            type="text"
            id="phone"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter trainee's phone number"
            required
          />
        </div>

        <div>
          <label
            for="experience"
            class="block text-sm font-medium text-gray-700"
            >Experience</label
          >
          <input
            v-model="trainer.Experience"
            type="number"
            id="experience"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter trainee's experience"
            required
          />
        </div>

        <div>
          <label for="joinDate" class="block text-sm font-medium text-gray-700"
            >Join Date</label
          >
          <input
            v-model="trainer.joinDate"
            type="date"
            id="joinDate"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
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
  title: "Add Trainer",
});
import { reactive } from "vue";
import { useNuxtApp } from "#app";
import { useRouter } from "vue-router";

const trainer = reactive({
  name: "",
  age: "",
  phone: "",
  Experience: "",
  joinDate: "",
});
const router = useRouter();
const { $axios, $toast } = useNuxtApp();
const submitForm = async () => {
  try {
    const response = await $axios.post("/trainer/add", trainer);
    $toast.success(response.data.message);
    router.push("/dashboard/allTrainer");
  } catch (error) {
    alert("Failed to add trainer. Please try again.");
    console.error(error);
  }
};
</script>
