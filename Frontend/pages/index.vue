<template>
  <div
    class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 px-10"
  >
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-sky-200 shadow-lg transform   rotate-6 rounded-3xl"
      ></div>
      <div
        class="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20"
      >
        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-2xl font-semibold">Login</h1>
          </div>
          <div class="divide-y divide-gray-200">
            <form @submit.prevent="submitForm">
              <div
                class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div class="mb-2">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Your email</label
                  >
                  <input
                    type="email"
                    v-model="user.email"
                    placeholder="Enter your email"
                    id="email"
                    class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                    required
                  />
                </div>
                <div class="mb-2">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Your password</label
                  >
                  <input
                    type="password"
                    v-model="user.password"
                    placeholder="Enter your password"
                    id="password"
                    class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                    required
                  />
                </div>

                <div class="w-full flex justify-center">
                  <button class="bg-cyan-500 text-white rounded-md px-2 py-1">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Login",
})
import { useNuxtApp } from "#app";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import Cookies from "universal-cookie";

const { $axios, $toast } = useNuxtApp();
const router = useRouter();
const cookies = new Cookies();

const user = reactive({
  email: "",
  password: "",
});

const submitForm = async () => {
  try {
    const response = await $axios.post("/user/login", user);

    if (response.status === 200) {
      //cookies.set("token", response.data.token);
      cookies.set("user", JSON.stringify(response.data.user));

     // console.log("Token stored:", cookies.get("token"));
      router.push("/dashboard");
      $toast.success(response.data.message);
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>

<style></style>
