import { ref, watch } from "@vue/composition-api";

export default function useFormControlBaseValues(data) {
  function joinErrors(errors) {
    return errors.join(". ");
  }
  function getHasError(errors) {
    return errors.length;
  }
  function getLabelText(label, isRequired) {
    return `${label} ${isRequired ? "*" : ""}`;
  }

  const joinedErrors = ref(joinErrors(data.errors));
  const hasError = ref(getHasError(data.errors));
  const labelText = ref(getLabelText(data.label, data.isRequired));

  watch(data, () => {
    joinedErrors.value = joinErrors(data.errors);
    hasError.value = getHasError(data.errors);
    labelText.value = getLabelText(data.label, data.isRequired);
  });

  return { joinedErrors, hasError, labelText };
}