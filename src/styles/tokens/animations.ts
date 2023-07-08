import { keyframes } from 'styled-components'
import { transitions } from './transitions'

export const animations = {
  skeleton: keyframes`
  0% {
    border-color: rgb(237,242,247);
    background: rgb(237,242,247);
  }
  100% {
    border-color: rgb(160,174,192);
    background: rgb(160,174,192);
  }
  `,
  loading: keyframes`
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  `,
  show: keyframes`
    0% { opacity: 0 }
    100% { opacity: 1 }
  `,
  slideUpAndFade: keyframes`
    0% { opacity: 0, transform: translateY(2px) },
    100% { opacity: 1, transform: translateY(0) },
  `,
  slideRightAndFade: keyframes`
    0% { opacity: 0, transform: translateX(-2px) },
    100% { opacity: 1, transform: translateX(0) },
  `,
  slideDownAndFade: keyframes`
    0% { opacity: 0, transform: translateY(-2px) },
    100% { opacity: 1, transform: translateY(0) },
  `,
  slideLeftAndFade: keyframes`
    0% { opacity: 0, transform: translateX(2px) },
    100% { opacity: 1, transform: translateX(0) },
  `,
  scaleUp: keyframes`
    0% { opacity: 0;transform: scale(0) },
    100% { opacity: 1; transform: scale(0.5) },
  `,
  translate: (x: string, y: string) => keyframes`
    0% {
      transform: translate(${x},${y});
      opacity: 0;
    }
    100% { opacity: 1; }
  `,
} as const

export const animationTimings = {
  transition: {
    default: `${transitions.duration[300]} ${transitions.timing['ease-in-out']}`,
    fast: `${transitions.duration[150]} ${transitions.timing['ease-in-out']}`,
    infinite: `${transitions.duration[300]} ${transitions.timing['infinite']}`,
    slow: `${transitions.duration[500]} ${transitions.timing['ease-in-out']}`,
    'very-slow': `${transitions.duration[1000]} ${transitions.timing['ease-in-out']}`,
  },
} as const
