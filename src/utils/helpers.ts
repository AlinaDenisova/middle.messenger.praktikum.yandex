export const isClassDefined = (className: string | undefined) =>
  className && className !== undefined ? className : "";

export const classIfElse = (
    isFirstClass: boolean | undefined,
    firstClassName: string,
    secondClassName: string
) => (isFirstClass ? firstClassName : secondClassName);
