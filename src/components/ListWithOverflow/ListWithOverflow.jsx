import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import * as R from 'ramda'

const styles = {
  listRoot: {
    display: 'flex',
    flexFlow: 'row wrap',
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
  listItem: {
    paddingRight: 10,
  },
  listOverflowItem: {
    color: 'rgba(0,0,0,0.4)',
    minWidth: ({ overflowComponentWidth }) => overflowComponentWidth,
  },
}

const List = ({
  classes,
  list,
  listComponent: Component,
  onComponentClick,
  hiddenNodesCounter,
}) =>
  list.map(
    component =>
      component.isMoreNodesIndicator ? (
        <div key="moreNodes" className={classes.listOverflowItem}>
          +{hiddenNodesCounter} more
        </div>
      ) : (
        <Component
          className={classes.listItem}
          onClick={onComponentClick}
          {...component}
        />
      )
  )

const getWidth = node => node.getBoundingClientRect().width
const getBottom = node => node.getBoundingClientRect().bottom
const getTop = node => node.getBoundingClientRect().top

const getBottomNodes = (nodes, containerBottom) =>
  nodes.filter(node => getBottom(node) === containerBottom)

const getCalculatedNodes = (nodes, positionCheck) =>
  nodes.reduce(
    (acc, node) =>
      getTop(node) >= positionCheck
        ? {
            ...acc,
            hiddenNodes: [...acc.hiddenNodes, node],
          }
        : {
            ...acc,
            shownNodes: [...acc.shownNodes, node],
          },
    { hiddenNodes: [], shownNodes: [] }
  )

const insertIndicator = (idx, list) => {
  const indicator = { isMoreNodesIndicator: true }
  return R.insert(idx, indicator, list)
}

const getInsertPosition = (
  occupied,
  required,
  threshold,
  nodes,
  lastShownIndex
) =>
  R.reverse(nodes).reduce(
    (acc, node) => {
      if (acc.occupiedWidth + required <= threshold) {
        return {
          ...acc,
          iterationNeeded: false,
        }
      }
      if (acc.iterationNeeded) {
        const nodeWidth = getWidth(node)
        return {
          ...acc,
          insertionIndex: acc.insertionIndex - 1,
          movedToHidden: acc.movedToHidden + 1,
          occupiedWidth: acc.occupiedWidth - nodeWidth,
        }
      }
      return acc
    },
    {
      insertionIndex: lastShownIndex + 1,
      movedToHidden: 0,
      occupiedWidth: occupied,
      iterationNeeded: true,
    }
  )

class ListWithOverflow extends React.PureComponent {
  state = {
    list: [...this.props.list],
    hiddenNodesCount: 0,
  }

  componentDidMount() {
    this.calculateList()
  }

  componentDidUpdate(prevProps) {
    if (!R.equals(prevProps.list, this.props.list)) {
      this.calculateList()
    }
  }

  calculateList = () => {
    const { list } = this.state
    const { overflowComponentWidth } = this.props
    const containerRect = this.containerRef.getBoundingClientRect()
    const containerBottom = containerRect.bottom
    const containerWidth = containerRect.width
    const listNodes = [...this.containerRef.querySelectorAll('div')]

    const { shownNodes, hiddenNodes } = getCalculatedNodes(
      listNodes,
      containerBottom
    )

    const hiddenNodesExist = hiddenNodes.length

    if (hiddenNodesExist) {
      const bottomNodes = getBottomNodes(shownNodes, containerBottom)
      const occupiedWidth = bottomNodes.reduce(
        (acc, node) => acc + getWidth(node),
        0
      )

      const lastShownIndex = shownNodes.length - 1

      const { insertionIndex, movedToHidden } = getInsertPosition(
        occupiedWidth,
        overflowComponentWidth,
        containerWidth,
        shownNodes,
        lastShownIndex
      )

      const nodesWithIndicator = insertIndicator(insertionIndex, list)

      this.setState({
        hiddenNodesCount: hiddenNodes.length + movedToHidden,
        list: nodesWithIndicator,
      })
    }
  }

  containerRef = null

  render() {
    const { classes, className } = this.props
    const { hiddenNodesCount, list } = this.state
    return (
      <div
        ref={element => {
          this.containerRef = element
        }}
        className={cx(classes.listRoot, className)}
      >
        <List
          {...this.props}
          hiddenNodesCounter={hiddenNodesCount}
          list={list}
        />
      </div>
    )
  }
}

export default injectStyles(styles)(ListWithOverflow)
