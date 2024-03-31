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
@import "styles/variables"

html
  font-family: "Roboto", sans-serif
  color: $text-main
  font-weight: $fw-regular

*
  box-sizing: border-box

body
  background-color: $background-secondary

.container
  max-width: 792px
  margin: 0 auto
</style>
