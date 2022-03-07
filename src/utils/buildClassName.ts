/**
 * Returns string with all posible classnames, that you pass as arguments
 *
 * Enter only logical expressions that can be classname or false
 *
 * `boolean && boolean && boolean && string`
 */
export default function buildClassName(
  ...classes: (string | false | undefined)[]
) {
  return classes.filter((c) => c).join(" ");
}
