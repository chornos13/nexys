import * as React from 'react'
import Icon, {
  CustomIconComponentProps,
  IconComponentProps,
} from '@ant-design/icons/lib/components/Icon'

type WithCustomIconProps = Omit<IconComponentProps, 'ref'>
type SvgIcon = React.ComponentType<
  CustomIconComponentProps | React.SVGProps<SVGSVGElement>
>

function withCustomIcon(svgIcon: SvgIcon) {
  return (props: WithCustomIconProps) => {
    const { style, ...otherProps } = props
    return (
      <Icon
        component={svgIcon}
        style={{
          ...style,
        }}
        {...otherProps}
      />
    )
  }
}

export default withCustomIcon
