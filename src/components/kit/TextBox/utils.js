// @flow

export type TextareaProps = {
  +minLines?: number,
}

type TextArea = any // FIXME: HTMLTextAreaElement?

// eslint-disable-next-line import/prefer-default-export
export const adjustTextareaSize = (
  element: TextArea,
  { minLines = 0 }: TextareaProps
) => {
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
