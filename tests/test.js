import parser from "../src/index";

test("Runs without crashing", () => {
  parser();
});

test("eval is work", () => {
  expect(parser("1*3")).toBe(3);
  expect(parser("1*3+2")).toBe(5);
  expect(parser("5/5+4*2")).toBe(9);
});

test("base sum", () => {
  expect(parser("1+3+2")).toBe(6);
  expect(parser("1+3+2+5")).toBe(11);
  expect(parser("1 + 3+  5")).toBe(9);
});

test("decimals and fractions together", () => {
  expect(parser(`1⁄2 + 1 + 0.66`)).toBe(2.16);
});

test("decimals and fractions together feet", () => {
  expect(parser(`1⁄2 + 1 + 0.66ft`)).toBe(9.42);
  expect(parser(`0.66ft*2-1`)).toBe(14.84);
});

test("check result", () => {
  expect(parser(`1⁄2 + 1`)).toBe(1.5);
  expect(parser(`(2 1⁄4)÷(2 1⁄2)`)).toBe(0.9);
  expect(parser(`2 1⁄4÷2 1⁄2`)).toBe(0.9);
  expect(parser(`3ft+ 2 1⁄4÷2 1⁄2`)).toBe(36.9);
  expect(parser(`-5ft*2`)).toBe(-120);
  expect(parser(`-5ft*2+10`)).toBe(-110);
  expect(parser(`-5ft*2+3ft`)).toBe(-84);
  expect(parser(`-5ft*2+3ft+4 1⁄2`)).toBe(-79.5);
  expect(parser(`2.5ft`)).toBe(30);
});
