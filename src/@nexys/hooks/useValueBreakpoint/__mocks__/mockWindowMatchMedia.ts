import { Breakpoint } from 'antd/lib/_util/responsiveObserve'
import { breakpoints } from '@nexys/hooks/useValueBreakpoint/useValueBreakpoint'

function mockWindowMatchMedia(breakpoint: Breakpoint | string) {
  const mapQueryIndex = breakpoints.reduce((acc, curVal, index) => {
    acc[curVal] = index
    return acc
  }, {})
  // By jsdom mock, actual jsdom not implemented matchMedia
  // https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => {
      return {
        // mock matches to match screen, xs, sm, md, lg, xl and xxl
        matches: [
          '(max-width: 575px)',
          '(min-width: 576px)',
          '(min-width: 768px)',
          '(min-width: 992px)',
          '(min-width: 1200px)',
          '(min-width: 1600px)',
        ]
          .filter((value, index) => index <= mapQueryIndex[breakpoint])
          .includes(query),
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }
    }),
  })
}

export default mockWindowMatchMedia
