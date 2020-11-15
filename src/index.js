import "./index.css";
import Fraction from "fraction.js";

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

class Parser {
  constructor() {
    this.value;
    this.steps;
  }

  prepareExpression(expression = "") {
    let temp = expression;
    this.steps = {};
    /**
     * execute the rules in sequence
     */
    Object.keys(replacesRegex).forEach((stepName) => {
      let { regex, subst } = replacesRegex[stepName];
      temp = temp.replace(regex, subst);

      /**
       * save the step if it change the expression
       */
      if (expression != temp)
        this.steps[stepName] = { expression: temp, regex, subst };
    });
    return temp;
  }

  parse(expression = "") {
    let temp = this.prepareExpression(expression);
    this.value = undefined;
    try {
      this.value = eval(temp);
      return this;
    } catch (error) {
      throw new Error("Bad expression");
    }
  }

  toFoot() {
    let yd, ft, inch, fraction;
    let toCalc = this.value;

    if (toCalc / 36 >= 1) {
      yd = parseInt(toCalc / 36);
      toCalc -= yd * 36;
    }

    if (toCalc / 12 >= 1) {
      ft = parseInt(toCalc / 12);
      toCalc -= ft * 12;
    }

    inch = parseInt(toCalc);
    fraction = new Fraction(toCalc % 1).toFraction();

    let imperialString = ``;
    imperialString += yd ? `${yd}yd ` : ``;
    imperialString += ft ? `${ft}ft ` : ``;
    imperialString += inch ? `${inch}` : ``;
    imperialString += inch ? ` ${fraction}` : ``;

    return imperialString;
  }

  toImperial() {
    let yd, ft, inch, fraction;
    let toCalc = this.value;

    if (toCalc / 36 >= 1) {
      yd = parseInt(toCalc / 36);
      toCalc -= yd * 36;
    }

    if (toCalc / 12 >= 1) {
      ft = parseInt(toCalc / 12);
      toCalc -= ft * 12;
    }

    inch = parseInt(toCalc);
    fraction = new Fraction(toCalc % 1).toFraction();
    return {
      yd,
      ft,
      inch,
      fraction,
    };
  }

  toFootString() {
    const { yd, ft, inch, fraction } = this.toImperial();
    let extraft = yd * 3 + ft;
    let imperialString = ``;
    imperialString += extraft ? `${extraft}ft ` : ``;
    imperialString += inch > "0" ? `${inch}` : ``;
    imperialString += fraction > "0" ? ` ${fraction}` : ``;
    return imperialString;
  }

  toImperialString() {
    const { yd, ft, inch, fraction } = this.toImperial();
    let imperialString = ``;
    imperialString += yd ? `${yd}yd ` : ``;
    imperialString += ft ? `${ft}ft ` : ``;
    imperialString += inch ? `${inch}` : ``;
    imperialString += fraction ? ` ${fraction}` : ``;
    return imperialString;
  }

  gcd(a, b) {
    if (!a) return b;
    if (!b) return a;

    while (1) {
      a %= b;
      if (!a) return b;
      b %= a;
      if (!b) return a;
    }
  }

  decimalLength(number) {
    let value = number.toString().split(".")[1];
    return value ? value.length : 0;
  }

  getStepsNames() {
    return Object.keys(this.steps);
  }
}

export default Parser;
