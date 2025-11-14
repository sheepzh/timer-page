/// <reference types="vite/client" />
/// <reference path="./typings/vue.d.ts" />

declare module '*.css' {
  const content: string
  export default content
}
