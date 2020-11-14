import "./index.css";

let replacesRegex = {
  keepFractionSpaces: {
    regex: /(\s+)(?!(\d\⁄))/gim,
    subst: ``,
  },
  feetAndInchesAndFraction: {
    regex: /(\-*?\d+\.?\d*?)\s*?ft\s*?(\d+\s*?(?!\d+\⁄))\s*?(\d+?)\⁄(\d+?)/gim,
    subst: `(($1*12) + ($2 + $3/$4))`,
  },
  feetAndInches: {
    regex: /(\-*?\d+\.?\d*?)\s*?ft\s*?(\d+)/gim,
    subst: `(($1*12) + $2)`,
  },
  feetAndFractions: {
    regex: /(\-*?\d+\.?\d*?)\s*?ft\s*?(\d+)\⁄(\d+)/gim,
    subst: `(($1*12) + $2/$3)`,
  },
  feet: {
    regex: /(\-*?\d+\.?\d*?)\s*?ft/gim,
    subst: `($1 * 12)`,
  },
  inchesAndFractions: {
    regex: /(\-*?\d+\s*?)\s*?(\d+)\⁄(\d+)/gim,
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

  Object.values(replacesRegex).forEach(({ regex, subst }) => {
    temp = temp.replace(regex, subst);
  });
  const result = eval(temp);
  return result;
}

export default parser;
