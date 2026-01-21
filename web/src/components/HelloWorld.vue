<script setup>
import { onMounted, ref } from 'vue'
import { asyncRun } from "../utils/worker_api.js";
import { useDataStore } from '../stores/DataStore.js';

const dataStore = useDataStore();

const script = `
import pandas as pd
import statistics as st
import js
print("Standard Deviation:", st.stdev(A_rank))

print("data:", data.name)

df = pd.DataFrame(data.to_py())

print(df.describe())

str(df.describe().to_json())
`;

const context = {
  A_rank: [0.8, 0.4, 1.2, 3.7, 2.6, 5.8],
  data: {
    name: ["Alice", "Bob", "Charlie"],
    age: [25, 30, 35],
    score: [85.5, 90.0, 78.5],
    city: ["New York", "Los Angeles", "Chicago"],
    comments: ["Good", "Excellent", "Average"]
  }
};

async function runPython() {
  output.value = "Running...";
  console.log("DataStore: ", dataStore.xlsx_data);
  const { result, error } = await asyncRun(script, context);
  if (result) {
    console.log("pyodideWorker result:", result);
  } else if (error) {
    console.log("pyodideWorker error:", error);
  }
  output.value = result || error;
}


defineProps({
  msg: String,
})

const output = ref("");

// async function runPython() {
//   let pyodide = await loadPyodide();
//   console.log(pyodide.runPython("1 + 2"));
// }

onMounted(() => {
  // runPython();
  // initPython();
});
</script>

<template>
  <h1>{{ msg }}</h1>

  <button @click="runPython()">Run Python</button>

  <div>
    Output: 
    {{ output }}
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
