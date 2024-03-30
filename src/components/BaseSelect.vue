<template>
  <div>
    <label v-if="label" :for="$attrs.id">{{ label }}</label>
    <select
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
    >
      <option v-for="(opt, idx) of options" :key="idx" :value="opt.value">
        {{ opt.text }}
      </option>
    </select>
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
        return value.every((err) => typeof err === "string");
      },
      default() {
        return [];
      },
    },
    options: {
      type: Array,
      validator(value) {
        return value.every(
          (opt) => typeof opt.value === "string" && typeof opt.text === "string"
        );
      },
      required: true,
    },
  },
};
</script>