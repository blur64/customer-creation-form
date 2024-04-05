<template>
  <div class="input-wrapper">
    <label class="input-label" v-if="label" :for="id">{{ label }}</label>
    <input
      class="input"
      :class="{ 'input-with-error': errors.length }"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
      :id="id"
    />
    <div class="input-error" v-if="errors.length">
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
  computed: {
    joinedErrors() {
      return this.errors.join(". ");
    },
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
  font-size: $fs-small
  margin-top: 4px
</style>