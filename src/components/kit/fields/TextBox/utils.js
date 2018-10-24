export const adjustTextareaSize = (element, { minLines = 0 }) => {
  /* eslint-disable no-param-reassign */
  const scrollTop = element.scrollTop
  const minHeight =
    minLines * parseInt(getComputedStyle(element).lineHeight, 10)
  try {
    element.style.height = '0px'
    element.style.height = `${element.scrollHeight}px`

    // fix the "border adding pixels" issue
    element.scrollTop = 100000
    element.style.height = `${Math.max(
      element.scrollHeight + element.scrollTop,
      minHeight
    )}px`
  } finally {
    element.scrollTop = scrollTop
  }
  /* eslint-enable no-param-reassign */
}
