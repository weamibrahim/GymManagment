<template>
  <div class="grid grid-cols-1 md:grid-cols-6">
    <div class="col-span-1 md:col-span-1 z-40">
      <SideBar />
    </div>
    <div class="col-span-1 md:col-span-5">
      <div class="flex items-center justify-between">
        <div class="p-6">
          <h1>admin</h1>
        </div>

        <div class="p-6">
          <client-only>
            <font-awesome-icon
              @click="logout"
              icon="right-from-bracket"
              class="text-2xl font-bold text-sky-600 inline"
          /></client-only>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const router = useRouter();
const logout = () => {
  cookies.remove("user");
  router.push("/");
};
</script>
