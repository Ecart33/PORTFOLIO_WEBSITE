// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react'
import useMeasure from 'react-use-measure'
import "../styles/test.css"
import { useSpring, useSprings, animated } from '@react-spring/web'


export default function Test() {
  /* const [open, toggle] = useState(false)
  const [ref, { width }] = useMeasure()
  const props = useSpring({ fad: open ? width : 0 })

  return (
    <div className={"container"}>
      <div ref={ref} className={"main"} onClick={() => toggle(!open)}>
        <animated.div className={"fill"} style={props} />
        <animated.div className={"content"}>{props.fad.to(x => x.toFixed(0))}</animated.div>
      </div>
    </div>
  ) */
 const [springs, api] = useSprings(
    2,
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
    }),
    []
  )
  api.st

  return (
    <div>
      {springs.map(props => (
        <animated.div key={props} style={props}>Hello World</animated.div>
      ))}
    </div>
  )
}

