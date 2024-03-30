import { helpers } from "@vuelidate/validators";

function equalsLength(lengthToBe) {
  return (value) => !helpers.req(value) || value.length === lengthToBe;
}

function startsWith(startSymbol) {
  return (value) => !helpers.req(value) || value.startsWith(startSymbol);
}

export { equalsLength, startsWith };