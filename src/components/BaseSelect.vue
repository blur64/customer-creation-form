<template>
  <div class="select-wrapper">
    <label class="select-label" v-if="label" :for="id">{{
      `${label} ${isRequired ? "*" : ""}`
    }}</label>
    <select
      class="select"
      :class="{ 'select-with-error': errors.length }"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
      :id="id"
    >
      <option v-for="(opt, idx) of options" :key="idx" :value="opt.value">
        {{ opt.text }}
      </option>
    </select>
    <div class="select-error" v-if="errors.length">
      {{ joinedErrors }}
    </div>
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
    id: String,
    options: {
      type: Array,
      validator(value) {
        return value.every(
          (opt) => typeof opt.value === "string" && typeof opt.text === "string"
        );
      },
      required: true,
    },
    isRequired: Boolean,
  },
  computed: {
    joinedErrors() {
      return this.errors.join(". ");
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/_variables"

.select-label
  font-size: $fs-small
  color: $text-secondary

.select
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

.select-error
  color: $error
  font-size: 14px
  margin-top: 4px
</style>