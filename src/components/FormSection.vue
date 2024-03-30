<template>
  <fieldset>
    <legend>
      <h2>{{ title }}</h2>
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