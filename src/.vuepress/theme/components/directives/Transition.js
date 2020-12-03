const transitions = new Map([
  [
    'fade',
    {
      setup: ['transition-opacity', 'ease-in-out'],
      hidden: ['opacity-0'],
      visible: ['opacity-100', 'duration-700'],
      threshold: 0.25,
      rootMargin: '0px 0px 0px 0px',
    },
  ],
  [
    'transformX',
    {
      setup: ['transition', 'transform', 'ease-in-out'],
      hidden: ['opacity-0', 'translate-x-32'],
      visible: ['opacity-100', 'translate-x-0', 'duration-700'],
      threshold: 0.25,
      rootMargin: '0px 0px 200px 0px',
    },
  ],
  [
    'transformY',
    {
      setup: ['transition', 'transform', 'ease-in-out'],
      hidden: ['opacity-0', 'translate-y-32'],
      visible: ['opacity-100', 'translate-y-0', 'duration-700'],
      threshold: 0.25,
      rootMargin: '0px 0px 200px 0px',
    },
  ],
])

function fetchTransitionClasses(transitionName, type) {
  const validTransitionType =
    typeof transitionName === 'string' && transitions.has(transitionName)

  if (validTransitionType) {
    return transitions.get(transitionName)[type]
  }

  return []
}

function reduceMotion() {
  return window.matchMedia('prefers-reduced-motion: reduce)').matches
}

const Observer = {
  bind: function (el, binding, vnode) {
    if (reduceMotion()) {
      return
    }

    const { value } = binding

    const validCallback =
      value && value.callback && typeof value.callback === 'function'

    const transitionName = value && value.transition ? value.transition : 'fade'
    const initialClasses = fetchTransitionClasses(transitionName, 'setup')
    el.classList.add(...initialClasses)

    const transitionDelay =
      value && value.delay && typeof value.delay === 'string' ? value.delay : ''
    el.style.transitionDelay = transitionDelay

    const threshold = transitions.get(transitionName).threshold
    const rootMargin = transitions.get(transitionName).rootMargin

    vnode.tracker = new IntersectionObserver(
      (entries) => {
        const ratio = entries[0].intersectionRatio

        if (ratio === 0.0 && !vnode.data.isVisible) {
          vnode.data.isVisible = false

          const visibleClasses = fetchTransitionClasses(
            transitionName,
            'visible'
          )
          const hiddenClasses = fetchTransitionClasses(transitionName, 'hidden')

          el.classList.remove(...visibleClasses)
          el.classList.add(...hiddenClasses)
        } else if (ratio >= threshold) {
          vnode.data.isVisible = true

          const visibleClasses = fetchTransitionClasses(
            transitionName,
            'visible'
          )
          const hiddenClasses = fetchTransitionClasses(transitionName, 'hidden')

          el.classList.remove(...hiddenClasses)
          el.classList.add(...visibleClasses)
        }

        if (validCallback) {
          value.callback({ isIntersecting: vnode.data.isVisible })
        }
      },
      { rootMargin: rootMargin, threshold: [0, threshold] }
    )
  },
  inserted: function (el, binding, vnode) {
    if (el && window.IntersectionObserver && !reduceMotion()) {
      vnode.tracker.observe(el)
    }
  },
  unbind: function (el, binding, vnode) {
    if (el && vnode.tracker) {
      vnode.tracker.disconnect()
      vnode.tracker = null
    }
  },
}

export default {
  name: 'Transition',
  directive: Observer,
}
