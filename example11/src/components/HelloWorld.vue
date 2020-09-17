<template>
  <div class="hello">
    <h1>My name is: {{name}}</h1>

    <input type="text" />

    <button type="text">Speichern</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    name: "",
  }),
};
</script>