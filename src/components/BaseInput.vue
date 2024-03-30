<template>
  <div>
    <label :for="$attrs.id">{{ label }}</label>
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
    />
    <div>{{ errors.join(". ") }}</div>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  inheritAttrs: false,
  props: ["value", "label", "errors"],
};
</script>