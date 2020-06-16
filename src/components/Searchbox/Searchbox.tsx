import React from 'react'
import { SearchProps } from 'antd/lib/input/Search'
import { Input } from 'antd'
import cx from 'shortcuts/cx'
import { SearchOutlined } from '@ant-design/icons'
import cssSearchbox from './Searchbox.module.scss'

interface SearchboxProps extends SearchProps {
  containerClassName?: string
  isBorderless?: boolean
  isNoContainer?: boolean
}

export function getSbContainerClassName(isBorderless, containerClassName) {
  if (isBorderless) {
    return cx(
      cssSearchbox.containerBorderless,
      cssSearchbox.hideSuffix,
      containerClassName,
    )
  }

  return cx(
    cssSearchbox.containerBorder,
    cssSearchbox.hideSuffix,
    containerClassName,
  )
}

export function getSearchboxProps(className) {
  return {
    className: cx(cssSearchbox.searchbox, className),
    prefix: (
      <SearchOutlined
        style={{ fontSize: 18, marginRight: 13, marginLeft: 5 }}
      />
    ),
  }
}

class Searchbox extends React.Component<SearchboxProps> {
  render() {
    const {
      containerClassName,
      className,
      isBorderless,
      isNoContainer,
      ...props
    } = this.props

    const mSearch = <Input.Search {...getSearchboxProps(className)} {...props}/>

    if (isNoContainer) {
      return mSearch
    }

    if (isBorderless) {
      return (
        <div
          className={getSbContainerClassName(isBorderless, containerClassName)}
        >
          {mSearch}
        </div>
      )
    }

    return (
      <div className={getSbContainerClassName(isBorderless, containerClassName)}>
        {mSearch}
      </div>
    )
  }
}

export default Searchbox
