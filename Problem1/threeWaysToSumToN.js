var sum_to_n_a = function (n) {
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  return result;
};

var sum_to_n_b = function (n) {
  return n <= 0 ? 0 : n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
  return ((n + 1) / 2) * n;
};

// -- TEST --
const testNumbers = [-1, 0, 5, 12];
const testFunctions = [sum_to_n_a, sum_to_n_b, sum_to_n_c];

testFunctions.forEach((func) => {
  console.log(`\n${func.name}:\n`);
  testNumbers.forEach((n) => console.info(`Sum to ${n}: ${func(n)}`));
  console.log('\n- - - - - - - -');
});
