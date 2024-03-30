<template>
  <div class="container">
    <app-form />
  </div>
</template>

<script>
import AppForm from "./components/AppForm";

export default {
  name: "App",
  components: { AppForm },
};
</script>

<style lang="sass">
.container
  max-width: 792px
  margin: 0 auto

input, select
  margin-right: 12px
  margin-bottom: 8px

label
  margin-right: 4px

p
  color: red
</style>
