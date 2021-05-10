// import Vue from 'vue'
//
// Vue.config.productionTip = false
//
// new Vue({
//   render: h => h(App),
// }).$mount('#app')

import App from './App.vue'
import StudentService from "@/services/StudentService";
import { createApp } from 'vue'

let app = createApp(App);

app.config.globalProperties.$student_api = StudentService

app.mount('#app')