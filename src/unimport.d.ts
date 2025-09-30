export {};
declare global {}
// for vue template auto import
declare module "vue" {
  interface ComponentCustomProperties {}
}
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {}
}
