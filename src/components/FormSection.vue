<template>
  <fieldset class="fieldset">
    <legend class="legend">
      <h2 class="form-section-title">{{ title }}</h2>
    </legend>
    <slot></slot>
  </fieldset>
</template>

<script>
export default {
  name: "FormSection",
  props: { title: String },
};
</script>

<style lang="sass" scoped>
@import "../styles/variables"

.fieldset
  border: 1px solid $border-main
  border-radius: 8px
  background-color: $background-main

.form-section-title
  font-weight: $fw-medium
  font-size: $fs-medium
</style>