// middleware/auth.global.js
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie("user").value;

  // console.log("token", token);

  if (!user && to.path !== "/") {
    return navigateTo("/");
  }

  if (user && to.path === "/") {
    return navigateTo("/dashboard");
  }
});
