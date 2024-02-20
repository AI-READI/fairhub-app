export {}
declare global {

}
// for vue template auto import
import { UnwrapRef } from 'vue'
declare module 'vue' {
  interface ComponentCustomProperties {

  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {

  }
}
