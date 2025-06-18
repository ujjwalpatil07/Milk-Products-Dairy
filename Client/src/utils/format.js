export const formatNumberWithCommas = (num) => {
  return new Intl.NumberFormat("en-IN").format(num);
}
