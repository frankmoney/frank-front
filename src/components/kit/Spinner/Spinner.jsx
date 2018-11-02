// @flow
import React from 'react'

type SpinnerSize = 18 | 20 | 25 | 45

type Props = {|
  className?: string,
  size: SpinnerSize,
|}

const largeProps = {
  x: 21.1,
  ry: 1.5,
  width: 3.5,
  height: 12.7,
}

const smallProps = {
  x: 20.8,
  ry: 2.5,
  width: 4.7,
  height: 11.4,
}

const Spinner = ({ className, size }: Props) => {
  const y = 0
  const { x, ry, height, width } = size === 45 ? largeProps : smallProps
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 46 46"
      preserveAspectRatio="xMidYMid"
      color="#606874"
    >
      <g transform="rotate(0 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="-0.9166666666666666s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(30 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="-0.8333333333333334s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(60 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="-0.75s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(90 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="-0.6666666666666666s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(120 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="-0.5833333333333334s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(150 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="-0.5s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(180 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="-0.4166666666666667s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(210 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="-0.3333333333333333s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(240 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="-0.25s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(270 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="-0.16666666666666666s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(300 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="-0.08333333333333333s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(330 23 23)">
        <rect
          x={x}
          y={y}
          ry={ry}
          width={width}
          height={height}
          fill="currentColor"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            times="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  )
}

Spinner.defaultProps = {
  size: 20,
}

export default Spinner
