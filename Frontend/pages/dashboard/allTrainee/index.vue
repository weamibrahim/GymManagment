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
            v-model="search"
            id="table-search"
            class="block pt-2 ps-10 md:w-80 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Trainee"
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
            <tr>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Age</th>
              <th scope="col" class="px-6 py-3">Phone</th>
              <th scope="col" class="px-6 py-3">Subscription Start Date</th>
              <th scope="col" class="px-6 py-3">Subscription End Date</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">View</th>
              <th scope="col" class="px-6 py-3">Edit</th>
              <th scope="col" class="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(trainee, index) in filteredTrainees"
              :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="px-6 py-4">{{ trainee.name }}</td>
              <td class="px-6 py-4">{{ trainee.age }}</td>
              <td class="px-6 py-4">{{ trainee.phone }}</td>
              <td class="px-6 py-4">
                {{ formatDate(trainee.subscriptionStartDate) }}
              </td>
              <td class="px-6 py-4">
                {{ formatDate(trainee.subscriptionEndDate) }}
              </td>
              <td class="px-6 py-4">{{ trainee.subscriptionStatus }}</td>
              <td class="px-6 py-4">
                <router-link
                  :to="`/dashboard/viewTrainee/${trainee._id}`"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <client-only
                    ><font-awesome-icon
                      icon="eye"
                      class="text-2xl font-bold text-sky-600"
                  /></client-only>
                </router-link>
              </td>
              <td class="px-6 py-4">
                <router-link
                  :to="`/dashboard/updateTrainee/${trainee._id}`"
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
                <a
                  href="#"
                  @click.prevent="deleteTrainee(trainee._id)"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <client-only>
                    <font-awesome-icon
                      icon="trash"
                      class="text-2xl font-bold text-red-600"
                  /></client-only>
                </a>
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
  title: "All Trainees",
});
import { ref, onMounted, computed } from "vue";
import { useNuxtApp } from "#app";


const trainees = ref([]);
const { $axios, $toast, $formatDate } = useNuxtApp();
const search = ref("");
// const { data } = await useFetch('http://localhost:7000/api/trainee/all', {
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: token ? `Bearer ${token}` : '',
//   },
// })
// console.log(data) 
const getTrainees = async () => {
  try {
    const response = await $axios.get("/trainee/all");
    trainees.value = response.data;
    console.log(trainees.value);
  } catch (error) {
    console.error("Error while fetching trainees:", error);
  }
};
onMounted(() => {
  getTrainees();
});

const formatDate = (dateString) => {
 
  return $formatDate(dateString);
};


const filteredTrainees = computed(() => {
  return trainees.value.filter((trainee) => {
    return trainee.name.toLowerCase().includes(search.value.toLowerCase());
  });
});



const deleteTrainee = async (id) => {
  try {
    const response = await $axios.delete(`/trainee/delete/${id}`);
    if (response.status == "200") {
      trainees.value = trainees.value.filter((trainee) => trainee._id !== id);
      $toast.success(response.data.message);
    } else {
      console.error("Failed to delete trainee");
      $toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error while deleting trainee:", error);
  }
};
</script>
