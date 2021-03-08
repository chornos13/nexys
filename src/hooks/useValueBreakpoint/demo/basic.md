Current API
##useBreakpoint

```jsx
function UseBreakpointDemo() {
  const screens = useBreakpoint()
  return (
    <>
      Current break point:{' '}
      {Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => (
          <Tag color="blue" key={screen[0]}>
            {screen[0]}
          </Tag>
        ))}
    </>
  )
}
```

Propose API
##useValueBreakpoint
![image of demo1](https://raw.githubusercontent.com/chornos13/image/main/image1.png)

```jsx
import React from 'react'
import useValueBreakpoint from 'hooks/useValueBreakpoint'
import { Tag } from 'antd'
import Content from 'components/Content/Content'

function UseValueBreakpointDemo() {
  const { value } = useValueBreakpoint({
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    xxl: 'xxl',
  })
  return (
    <div>
      Current Breakpoint:
      <Tag color="blue">{value}</Tag>
    </div>
  )
}

export default UseValueBreakpointDemo
```

for real world implementation we can use like this

```jsx
function Demo() {
  const breakpointColumn = useValueBreakpoint({
    xs: width >= 428 ? 2 : 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  })

  return (
    <List
      grid={{
        column: breakpointColumn.value,
      }}
      ...
    />
  )
}
```

furthermore
![image of demo1](https://raw.githubusercontent.com/chornos13/image/main/image2.png)

```jsx
function UseValueBreakpointDemo() {
  const { value } = useValueBreakpoint({
    xs: {
      divStyle: {
        background: 'blue',
      },
      style: {
        color: 'blue',
        fontSize: 14,
      },
      label: 'XS',
    },
    sm: {
      divStyle: {
        background: 'red',
      },
      style: {
        color: 'red',
        fontSize: 21,
      },
      label: 'moreThanXS',
    },
  })
  return (
    <div
      style={{
        ...value.divStyle,
      }}
    >
      Current Breakpoint:
      <Tag
        color="blue"
        style={{
          ...value.style,
        }}
      >
        {value.label}
      </Tag>
    </div>
  )
}
```
