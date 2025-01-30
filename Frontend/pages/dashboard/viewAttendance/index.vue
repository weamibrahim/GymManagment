<template>
    <div class="bg-gray-200 h-screen p-6">
     
      <div class="p-5">
        <div class="pb-4 bg-white dark:bg-gray-900 p-5">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1">
              <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="text" id="table-search"
              v-model="search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Trainee">
            </div>
          </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Phone</th>
                <th scope="col" class="px-6 py-3">Status</th>
                <th scope="col" class="px-6 py-3">Date</th>

              </tr>
            </thead>
            <tbody>
             
              <tr v-for="attendance in filteredAttendances" :key="attendance._id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">{{ attendance.traineeId.name }}</td>
                <td class="px-6 py-4">{{ attendance.traineeId.phone }}</td>
                <td class="px-6 py-4">{{ attendance.traineeId.subscriptionStatus }}</td>
                <td class="px-6 py-4">{{ formatTime(attendance.time) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  useHead({
  title: "View Attendance",
});
  import { ref, onMounted , computed} from 'vue';
  import { useNuxtApp } from "#app";
 
  
  const { $axios, $formatDate } = useNuxtApp();
  const attendances = ref([]);
  const search = ref('');
  
  // // Fetch data from API using useFetch
  // const { data } =await  useFetch('http://localhost:7000/api/attendance/all', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: token ? `Bearer ${token}` : '',
  //   },
  // });
  
  // // Set the attendance data
  // attendances.value = data.value || [];
  const getAttendances = async () => {
    try {
      const response = await $axios.get('/attendance/all');
     
      attendances.value = response.data;
      console.log(attendances.value);
    } catch (error) {
      console.error(error);
    }
  }
  
  onMounted(() => {
    getAttendances();
  });
  const filteredAttendances = computed(() => {
    return attendances.value.filter((attendance) => {
      return attendance.traineeId.name.toLowerCase().includes(search.value.toLowerCase());
    });
  })
  // Function to format the time
  const formatTime = (timeArray) => {
  if (timeArray && timeArray.length > 0) {
    
    const latestTime = new Date(timeArray[timeArray.length - 1]);
  
    return $formatDate(latestTime); // Customize format as needed
  }
  return '';
};
  
 // console.log(attendances.value);
  </script>
  