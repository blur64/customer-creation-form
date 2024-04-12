<template>
  <div class="input-wrapper">
    <label class="input-label" v-if="label" :for="id">{{ labelText }}</label>
    <input
      class="input"
      :class="{ 'input-with-error': hasError }"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
      :id="id"
    />
    <div class="input-error" v-if="hasError">
      {{ joinedErrors }}
    </div>
  </div>
</template>

<script>
import useFormControlBaseValues from "../useFormControlBaseValues.js";

export default {
  name: "BaseInput",
  inheritAttrs: false,
  setup(props) {
    const { joinedErrors, hasError, labelText } =
      useFormControlBaseValues(props);
    return { joinedErrors, hasError, labelText };
  },
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
    isRequired: Boolean,
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/_variables"

.input-label
  font-size: $fs-small
  color: $text-secondary

.input
  border: 1px solid $border-main
  border-radius: $border-raduis-main
  width: 100%
  padding: 10px 8px
  margin-top: 4px
  color: $text-main
  font-weight: $fw-regular
  font-size: $fs-small

  &-with-error
    border: 1px solid $error

  &[type="checkbox"]
    width: initial
    float: left
    margin-right: 4px

.input-error
  color: $error
  font-size: 14px
  margin-top: 4px
</style>