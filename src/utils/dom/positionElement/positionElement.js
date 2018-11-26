import { getPlacementStyle } from './placements'

const isElementVisibleInViewport = rect => {
  const docEl = document.documentElement
  const viewportHeight = window.innerHeight || (docEl && docEl.clientHeight)
  const viewportWidth = window.innerWidth || (docEl && docEl.clientWidth)

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= viewportHeight &&
    rect.right <= viewportWidth
  )
}

// Выбирает проптивоположное направление с сохранением align
const getDropdownPlacementCandidates = placement => {
  if (placement.startsWith('down')) {
    return [placement.replace('down-', 'up-')]
  }
  if (placement.startsWith('up')) {
    return [placement.replace('up-', 'down-')]
  }
  if (placement.startsWith('left')) {
    return [placement.replace('left-', 'right-')]
  }
  if (placement.startsWith('right')) {
    return [placement.replace('right-', 'left-')]
  }
  return []
}

const getAutoPlacement = config => {
  const {
    element,
    anchorElement,
    arrowElement,
    preferredPlacement,
    distance,
    alignmentOffset,
  } = config

  const placements = getDropdownPlacementCandidates(preferredPlacement)
  const elemRectBase = element.getBoundingClientRect()

  const found = [preferredPlacement, ...placements].reduce(
    (correctPlacement, placement) => {
      if (correctPlacement) {
        return correctPlacement
      }

      const placementStyle = getPlacementStyle({
        placement,
        element,
        anchorElement,
        arrowElement,
        distance,
        alignmentOffset,
      })

      const elemRect = {
        top: placementStyle.top || elemRectBase.top,
        left: placementStyle.left || elemRectBase.left,
      }

      elemRect.right = elemRect.left + elemRectBase.width
      elemRect.bottom = elemRect.top + elemRectBase.height

      return isElementVisibleInViewport(elemRect) && placement
    },
    null
  )

  return found || preferredPlacement
}

export default function positionElement(config) {
  const {
    element,
    anchorElement,
    arrowElement,
    preferredPlacement,
    distance,
    alignmentOffset,
    autoReposition,
  } = config

  if (!autoReposition) {
    const placementStyle = getPlacementStyle({
      placement: preferredPlacement,
      element,
      anchorElement,
      arrowElement,
      distance,
      alignmentOffset,
    })

    return [preferredPlacement, placementStyle]
  }

  const resultPlacement = getAutoPlacement(config)

  return [
    resultPlacement,
    getPlacementStyle({
      placement: resultPlacement,
      element,
      anchorElement,
      arrowElement,
      distance,
      alignmentOffset,
    }),
  ]
}
