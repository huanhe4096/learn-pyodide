import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.mount('#app')

// create a store instance
import { useDataStore } from './stores/DataStore.js';
const dataStore = useDataStore();
// load data
import * as XLSX from 'xlsx';

fetch('/sample.xlsx').then(function(res) {
  /* get the data as a Blob */
  if(!res.ok) throw new Error("fetch failed");
  return res.arrayBuffer();
}).then(function(ab) {
  /* parse the data when it is received */
  var data = new Uint8Array(ab);
  var workbook = XLSX.read(data, {type:"array"});
  console.log(workbook);

  /* DO SOMETHING WITH workbook HERE */
  dataStore.xlsx_data = workbook;
});