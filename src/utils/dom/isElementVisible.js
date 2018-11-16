// @flow strict

type Side = 'left' | 'top' | 'right' | 'bottom'

export default (
  el: Element,
  container: any, // flowlint-line: unclear-type:warn
  sides: Array<Side> = ['left', 'top', 'right', 'bottom']
) => {
  const rect = el.getBoundingClientRect()

  const isWindow = !container || container === window
  if (isWindow) {
    const docEl = document.documentElement
    const viewportHeight = window.innerHeight || (docEl && docEl.clientHeight)
    const viewportWidth = window.innerWidth || (docEl && docEl.clientWidth)

    return (
      (!sides.includes('top') || rect.top >= 0) &&
      (!sides.includes('left') || rect.left >= 0) &&
      (!sides.includes('bottom') || rect.bottom <= viewportHeight) &&
      (!sides.includes('right') || rect.right <= viewportWidth)
    )
  }

  const containerRect = container.getBoundingClientRect()
  return (
    (!sides.includes('top') || rect.top >= containerRect.top) &&
    (!sides.includes('left') || rect.left >= containerRect.left) &&
    (!sides.includes('bottom') || rect.bottom <= containerRect.bottom) &&
    (!sides.includes('right') || rect.right <= containerRect.right)
  )
}
