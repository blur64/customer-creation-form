function equalsLength(lengthToBe) {
  return (value) => value.length === lengthToBe;
}

function startsWith(startSymbol) {
  return (value) => value.startsWith(startSymbol);
}

export { equalsLength, startsWith };