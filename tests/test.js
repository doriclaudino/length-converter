import Parse from "../src/index";

const parser = new Parse();

test("Runs without crashing", () => {
  new Parse();
});

test("eval is work", () => {
  expect(parser.parse("1×3").value).toBe(3);
  expect(parser.parse("1×3+2").value).toBe(5);
  expect(parser.parse("5/5+4×2").value).toBe(9);
});

test("base sum", () => {
  expect(parser.parse("1+3+2").value).toBe(6);
  expect(parser.parse("1+3+2+5").value).toBe(11);
  expect(parser.parse("1 + 3+  5").value).toBe(9);
});

test("decimals", () => {
  expect(parser.parse(`1⁄2`).value).toBe(0.5);
  expect(parser.parse(`.6`).value).toBe(0.6);
  expect(parser.parse(`1+.6`).value).toBe(1.6);
});

test("decimals and fractions together", () => {
  expect(parser.parse(`1⁄2 + 1 + .66`).value).toBe(2.16);
  expect(parser.parse(`1⁄2 + 1 + 0.66`).value).toBe(2.16);
});

test("decimals and fractions together feet", () => {
  expect(parser.parse(`.5ft`).value).toBe(6);
  expect(parser.parse(`.5ft2`).value).toBe(8);
  expect(parser.parse(`1⁄2 + 1 + 0.66ft`).value).toBe(9.42);
  expect(parser.parse(`0.66ft×2-1`).value).toBe(14.84);
});

test("check result", () => {
  expect(parser.parse(`1⁄2 + 1`).value).toBe(1.5);
  expect(parser.parse(`(2 1⁄4)÷(2 1⁄2)`).value).toBe(0.9);
  expect(parser.parse(`2 1⁄4÷2 1⁄2`).value).toBe(0.9);
  expect(parser.parse(`3ft+ 2 1⁄4÷2 1⁄2`).value).toBe(36.9);
  expect(parser.parse(`-5ft×2`).value).toBe(-120);
  expect(parser.parse(`-5ft×2+10`).value).toBe(-110);
  expect(parser.parse(`-5ft×2+3ft`).value).toBe(-84);
  expect(parser.parse(`-5ft×2+3ft+4 1⁄2`).value).toBe(-79.5);
  expect(parser.parse(`2.5ft`).value).toBe(30);
});

test("check result full length", () => {
  expect(parser.parse(`.5ft3 1⁄4`).value).toBe(9.25);
  expect(parser.parse(`2.5ft 3 1⁄4 + 15⁄16`).value).toBe(34.1875);
  expect(parser.parse(`2.5ft 3`).value).toBe(33);
  expect(parser.parse(`(2.5ft 3 1⁄4 + 15⁄16)   ×   2`).value).toBe(68.375);
});

test("check result toImperialString", () => {
  expect(parser.parse(`3+2+4 1⁄8`).toImperialString()).toBe("9 1/8");
  expect(parser.parse(`4+1⁄8`).toImperialString()).toBe("4 1/8");
  expect(parser.parse(`445+1⁄8`).toImperialString()).toBe("12yd 1ft 1 1/8");
});

test("check result toFoot", () => {
  expect(parser.parse(`445`).toFootString()).toBe("37ft 1");
  expect(parser.parse(`4+1⁄8`).toFootString()).toBe("4 1/8");
  expect(parser.parse(`445+1⁄8`).toFootString()).toBe("37ft 1 1/8");
});
