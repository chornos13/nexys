import React from 'react'
import { Card as CurCard } from 'antd'
import { CardProps } from 'antd/lib/card'
import cssCard from 'components/Card/Card.module.scss'
import cx from 'shortcuts/cx'

class Card extends React.Component<CardProps> {
  render() {
    const { className, ...extraProps } = this.props

    return <CurCard className={cx(cssCard.card, className)} {...extraProps} />
  }
}

export default Card
