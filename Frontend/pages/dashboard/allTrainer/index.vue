<template>
  <div class="bg-gray-200 h-full p-6">
    <div class="p-5">
      <div class="pb-4 bg-white dark:bg-gray-900 p-5">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
          <div
            class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            class="block pt-2 ps-10 text-sm text-gray-900 border md:w-80 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Trainer"
            v-model="search"
          />
        </div>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr class="text-center">
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Age</th>
              <th scope="col" class="px-6 py-3">Phone</th>
              <th scope="col" class="px-6 py-3">Experience</th>
              <th scope="col" class="px-6 py-3">Join Date</th>
              <th scope="col" class="px-6 py-3">Edit</th>
              <th scope="col" class="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(trainer, index) in filteredTrainers"
              :key="index"
              class="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="px-6 py-4">{{ trainer.name }}</td>
              <td class="px-6 py-4">{{ trainer.age }}</td>
              <td class="px-6 py-4">{{ trainer.phone }}</td>
              <td class="px-6 py-4">{{ trainer.Experience }}</td>
              <td class="px-6 py-4">{{ formatDate(trainer.joinDate) }}</td>
              <td class="px-6 py-4">
                <router-link
                  :to="`/dashboard/updateTrainer/${trainer._id}`"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <client-only>
                    <font-awesome-icon
                      icon="pencil"
                      class="text-2xl font-bold text-sky-600"
                  /></client-only>
                </router-link>
              </td>
              <td class="px-6 py-4">
                <div
                  @click.prevent="deleteTrainer(trainer._id)"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <client-only>
                    <font-awesome-icon
                      icon="trash"
                      class="text-2xl font-bold text-red-600"
                  /></client-only>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
useHead({
  title: "All Trainers",
});
import { useNuxtApp } from "#app";
import { ref, onMounted, computed } from "vue";


const trainers = ref([]);
const search = ref("");
const { $axios, $toast , $formatDate} = useNuxtApp();
// Fetch data from API using useFetch
// const {data} =await useFetch('http://localhost:7000/api/trainer/all', {
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}` ,
//   },
// })

// const trainers = ref(data.value || [])

const getTrainers = async () => {
  try {
    const response = await $axios.get("/trainer/all");
    // console.log(response.data);
    trainers.value = response.data;
  } catch (error) {
    console.error("Error while fetching trainers:", error);
  }
};

onMounted(() => {
  getTrainers();
});

const filteredTrainers = computed(() => {
  return trainers.value.filter((trainer) => {
    return trainer.name.toLowerCase().includes(search.value.toLowerCase());
  });
});
const formatDate = (dateString) => {
 
 return $formatDate(dateString);
};

const deleteTrainer = async (id) => {
  try {
    const response = await $axios.delete(`/trainer/delete/${id}`);
    console.log(response.status);
    if (response.status === 200) {
      trainers.value = trainers.value.filter((trainer) => trainer._id !== id);
      $toast.success(response.data.message);
    } else {
      console.error("Failed to delete trainer");
    }
  } catch (error) {
    console.error("Error while deleting trainer:", error);
  }
};
</script>
