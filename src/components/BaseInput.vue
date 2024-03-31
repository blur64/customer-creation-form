<template>
  <div>
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
      :id="id"
    />
    <div v-if="errors.length">{{ errors.join(". ") }}</div>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  inheritAttrs: false,
  props: {
    value: {},
    label: String,
    errors: {
      type: Array,
      validator(value) {
        if (!value) {
          return true;
        }
        return value.every((err) => typeof err === "string");
      },
      default() {
        return [];
      },
    },
    id: String,
  },
};
</script>