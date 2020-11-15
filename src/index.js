import "./index.css";

/**
 * regex rules sequence
 */
const replacesRegex = {
  keepFractionSpaces: {
    regex: /(\s+)(?!(\d\⁄))/gim,
    subst: ``,
  },
  feetAndInchesAndFraction: {
    regex: /(\-?\.?\d+\.?\d*?)ft(\d+)\s(\d+)\⁄(\d+)/gim,
    subst: `(($1 * 12) + ($2 + $3/$4))`,
  },
  feetAndInches: {
    regex: /(\-?\.?\d+\.?\d*?)ft(\d+\.?\d+|\.?\d+)/gim,
    subst: `(($1 * 12) + $2)`,
  },
  feetAndFractions: {
    regex: /(\-?\.?\d+\.?\d*?)ft\s(\d+)\⁄(\d+)/gim,
    subst: `(($1 * 12) + $2/$3)`,
  },
  feet: {
    regex: /(\-?\.?\d+\.?\d*?)ft/gim,
    subst: `($1 * 12)`,
  },
  inchesAndFractions: {
    regex: /(\-*?\d+)\s(\d+)\⁄(\d+)/gim,
    subst: `($1 + $2/$3)`,
  },
  fractions: {
    regex: /(\d+)\⁄(\d+)/gim,
    subst: `($1/$2)`,
  },
  divide: {
    regex: /÷/gim,
    subst: `/`,
  },
  multiply: {
    regex: /×/gim,
    subst: `*`,
  },
};

function parser(expression = "") {
  let temp = expression;
  let steps = {};
  Object.keys(replacesRegex).forEach((stepName) => {
    let { regex, subst } = replacesRegex[stepName];
    temp = temp.replace(regex, subst);
    if (expression != temp)
      steps[stepName] = { expression: temp, regex, subst };
  });

  let result;
  try {
    result = eval(temp);
  } catch (error) {
    return `str: ${temp} err: ${error} steps:${JSON.stringify(steps, null, 2)}`;
  }
  return result;
}

export default parser;
