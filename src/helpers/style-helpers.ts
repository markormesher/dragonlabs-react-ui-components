function combine(...classNames: Array<string | boolean | undefined>): string {
  return classNames.filter((cn) => typeof cn === typeof "").join(" ");
}

export { combine };
