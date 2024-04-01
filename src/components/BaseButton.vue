<template>
  <button class="button" :type="type">{{ text }}</button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    text: String,
    type: String,
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/variables"

.button
  background-color: $accent
  border: none
  cursor: pointer
  padding: 12px 16px
  border-radius: 4px
  font-size: $fs-small

  &:hover
    opacity: 0.8
</style>