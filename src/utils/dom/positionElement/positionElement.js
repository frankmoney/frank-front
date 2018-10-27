import { getPlacementStyle, getPlacementCandidates } from './placements'

const isElementVisibleInViewport = el => {
  const rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export default function positionElement(config) {
  const {
    element,
    anchorElement,
    arrowElement,
    preferredPlacement,
    distance,
    alignmentOffset,
    // autoReposition,
  } = config

  // if (autoReposition === false) {
  const placementStyle = getPlacementStyle({
    placement: preferredPlacement,
    element,
    anchorElement,
    arrowElement,
    distance,
    alignmentOffset,
  })

  return placementStyle
  // }

  // const placements = getPlacementCandidates(preferredPlacement)
  // const found = [...placements, preferredPlacement].find(placement => {
  //   const placementStyle = getPlacementStyle({
  //     placement,
  //     element,
  //     anchorElement,
  //     distance,
  //     alignmentOffset,
  //   })
  //
  //   styleElement(element, placementStyle)
  //   return isElementVisibleInViewport(element)
  // })
  //
  // return found || preferredPlacement
}
