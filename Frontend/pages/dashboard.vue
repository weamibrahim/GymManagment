<template>
  <div>
   
    <NuxtLayout name="dashboard">
      <NuxtPage />
    </NuxtLayout>

  
    <div class="bg-gray-200 h-screen " v-if="$route.path === '/dashboard'">
      <div class="p-5 grid md:grid-cols-2 sm:grid-cols-1 gap-7" >
        
        <div class="flex justify-center">
          
            <div class="bg-white w-56 h-36 p-10 text-center">
              <client-only>
              <font-awesome-icon
                icon="weight-hanging"
                class="text-2xl font-bold text-sky-600"
              />
            </client-only>
              Trainers
            
              <div class="text-xl">
                <CountTrainer />
              </div>
            </div>
         
        </div>

       
        <div class="flex justify-center">
          
            <div class="bg-white w-56 h-36 p-10 text-center">
             <client-only>
              <font-awesome-icon
                icon="user"
                class="text-2xl font-bold text-red-600"
              />
              </client-only>
              Trainees
             
              <div class="text-xl" >
                <CountTrainee />
              </div>
            </div>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Dashboard",
})
</script>



