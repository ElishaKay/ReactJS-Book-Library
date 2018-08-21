import React, { Component } from "react";
import { map, is, contains, curry, reduce, toPairs, __, prop, equals, pipe, find, ifElse, F, identity } from 'ramda';

export const cloneChildren = (children, props) => React.Children.map(children, child => <child.type {...child.props} {...props} />)
export const Head = ({ children, ...props }) => cloneChildren(children, props)
export const Content = ({ children, ...props }) => cloneChildren(children, props)

export const easingFunctions = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < .5 ? 2 * t * t : - 1 + (4 - 2 * t) * t,
  easeInCubic: t => t * t * t,
  easeOutCubic: t => (--t) * t * t + 1,
  easeInOutCubic: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - (--t) * t * t * t,
  easeInOutQuart: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInQuint: t => t * t * t * t * t,
  easeOutQuint: t => 1 + (--t) * t * t * t * t,
  easeInOutQuint: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  easeOutElastic: t => .04 * t / (--t) * Math.sin(25 * t),
  easeInElastic: t => (.04 - .04 / t) * Math.sin(25 * t) + 1,
  easeInSin: t => 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2),
  easeOutSin : t => Math.sin(Math.PI / 2 * t),
  easeInOutSin: t => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2
}

export const getElapsedTime = start => performance.now() - start
export const calcProgressVal = (x1, x2, progress) => x1 + (x2 - x1) * progress
export const callFn = (fn, ...args) => is(Function, fn) && fn(...args)

export const getNewStyles = ({
  el: [ el1, el2 ],
  progress,
  timingfunction
}) => {
  const progressFn = easingFunctions[timingfunction](progress)
  const x = calcProgressVal(el1.x, el2.x, progressFn)
  const y = calcProgressVal(el1.y, el2.y, progressFn)

  return {
    maxwidth: calcProgressVal(el1.width, el2.width, progressFn),
    height: calcProgressVal(el1.height, el2.height, progressFn),
    transform: `translate3d(${x}px, ${y}px, 0)`
  }
}

export const setStyleToElement = curry((acc, item) => `${acc} ${item[0]}: ${item[1]};`)
export const setStylesToElement = curry((styles, element) => {
  const textStyles = reduce(setStyleToElement, '', toPairs(styles))
  element.style.cssText = textStyles
})

export const pickFromRect = rect => {
  const { width, height, top, left } = rect
  return { width, height, x: left, y: top }
}

export const _findChildren = curry((component, children) => find(
  pipe(
    prop('type'),
    equals(component)
  )
)(children))
export const findChildrenOr = curry((val, component, children) => 
  ifElse(
    is(Array),
    _findChildren(component),
    val
  )(children))
export const findChildren = findChildrenOr(F)
export const findChildrenOrIdentity = findChildrenOr(identity)

export const getLastPositionStyles = ({ maxwidth, maxheight }) => {
  const mW = maxwidth > window.innerWidth ? window.innerWidth : maxwidth
  const mH = maxheight > window.innerHeight ? window.innerHeight : maxheight

  return{
    width: mW,
    height: mH,
    x: window.innerWidth / 2 - mW / 2,
    y: window.innerHeight / 2 - mH / 2
  }
}

export const states = {
  IDLE: 'IDLE',
  OPEN: 'OPEN',
  OPENED: 'OPENED',
  CLOSE: 'CLOSE',
  IMMEDIATELY_CLOSE: 'IMMEDIATELY_CLOSE'
}

export const openState = [ states.OPEN, states.OPENED, states.CLOSE, states.IMMEDIATELY_CLOSE ]
export const afterOpenState = [ states.OPENED, states.CLOSE ]
export const closingState = [ states.CLOSE, states.IMMEDIATELY_CLOSE ]
export const isActiveState = contains(__, openState)
export const isAfterOpenState = contains(__, afterOpenState)
export const isClosingState = contains(__, closingState)
export const isOpenedState = equals(states.OPENED)