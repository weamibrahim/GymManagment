<template>
  <div class="bg-gray-200 h-screen">
    <div class="p-5 grid md:grid-cols-2 sm:grid-cols-1 gap-7">
      <div class="flex justify-center">
        <router-link to="/dashboard/addTrainee">
          <div class="bg-white w-56 h-36 p-10">
            <client-only>
              <font-awesome-icon
                icon="plus"
                class="text-2xl font-bold text-sky-600"
            /></client-only>
            <div class="text-xl">Add trainee</div>
          </div>
        </router-link>
      </div>
      <div class="flex justify-center">
        <router-link to="/dashboard/allTrainee">
          <div class="bg-white w-56 h-36 p-10">
            <client-only>
              <font-awesome-icon
                icon="eye"
                class="text-2xl font-bold text-red-600"
            /></client-only>
            <div class="text-xl">View trainee</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
useHead({
  title: "Trainees",
})
</script>