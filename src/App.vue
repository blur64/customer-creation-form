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

*
  box-sizing: border-box

.container
  max-width: 792px
  margin: 0 auto
</style>
