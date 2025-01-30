<template>
  <div>
   
    <button
      @click="toggleSidebar"
      aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>

    <aside
      id="default-sidebar"
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
        'fixed top-0 left-0  w-64   h-screen transition-transform sm:block sm:translate-x-0': true,
      }"
      aria-label="Sidebar"
      @click.stop
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-black dark:bg-gray-800">
        <ul class="space-y-2 font-medium flex-1">
          <li>
            <span class="ms-3 text-white">Gym Management System</span>
          </li>
          <div class="pt-5 px-8 grid grid-rows-3 gap-5">
            <div>
              <RouterLink
                to="/dashboard"
                class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100/20 dark:hover:bg-gray-700 group"
              >
                <client-only>
                  <font-awesome-icon
                    icon="house"
                    class="font-bold text-white pe-4"
                  />
                </client-only>
                Dashboard
              </RouterLink>
            </div>
            <div>
              <RouterLink
                to="/dashboard/attendance"
                class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100/20 dark:hover:bg-gray-700 group"
              >
                <client-only>
                  <font-awesome-icon
                    icon="clipboard-check"
                    class="font-bold text-white pe-4"
                /></client-only>
                Attendance
              </RouterLink>
            </div>
            <div>
              <RouterLink
                to="/dashboard/trainers"
                class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100/20 dark:hover:bg-gray-700 group"
              >
                <client-only>
                  <font-awesome-icon
                    icon="weight-hanging"
                    class="font-bold text-white pe-4"
                  />
                </client-only>
                Trainers
              </RouterLink>
            </div>
            <div>
              <RouterLink
                to="/dashboard/trainees"
                class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100/20 dark:hover:bg-gray-700 group"
              >
                <client-only>
                  <font-awesome-icon
                    icon="user"
                    class="font-bold text-white pe-4"
                  /> </client-only
                >Trainees
              </RouterLink>
            </div>
          </div>
        </ul>
      </div>
    </aside>

   
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30 bg-black opacity-50 sm:hidden ml-64"
      @click="closeSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const routes = router.options.routes;

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
const closeSidebar = () => {
  isSidebarOpen.value = false;
};

onMounted(() => {
  // console.log(routes);
});
</script>
