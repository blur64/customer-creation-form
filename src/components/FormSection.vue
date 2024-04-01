<template>
  <fieldset class="fieldset">
    <legend class="legend">
      <h2 class="form-section-title">{{ title }}</h2>
    </legend>
    <div class="form-controls-wrapper">
      <slot></slot>
    </div>
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
  margin: 0
  padding: 0 12px 12px 12px
  margin-top: 8px

.form-section-title
  font-weight: $fw-medium
  font-size: $fs-medium

.form-controls-wrapper
  display: grid
  grid-template-columns: repeat(12, 1fr)
  row-gap: 10px
  column-gap: 20px

.cols-9
  grid-column: 9 span
.cols-4
  grid-column: 4 span
.cols-3
  grid-column: 3 span
.cols-2
  grid-column: 2 span
.cols-1
  grid-column: 1 span

@media (max-width: 648px)
  .form-controls-wrapper
    grid-template-columns: repeat(8, 1fr)

  .cols-9
    grid-column: 8 span

@media (max-width: 428px)
  .form-controls-wrapper
    grid-template-columns: repeat(4, 1fr)

  .cols-9
    grid-column: 4 span
</style>