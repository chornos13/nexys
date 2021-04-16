import React, { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import cssHamburgerMenu from '@nexys/components/HamburgerButton/HamburgerButton.module.scss'
import { Dropdown } from 'antd'

interface HamburgerButtonProps {
  menu: React.ReactElement
}

function HamburgerButton(props: HamburgerButtonProps) {
  const { menu } = props
  const [isOpen, setIsOpen] = useState(false)
  const refButton = useRef()

  useEffect(() => {
    const element = refButton.current as HTMLButtonElement

    if (element) {
      const curIsOpen = element.classList.contains(cssHamburgerMenu.opened)
      element.setAttribute('aria-expanded', curIsOpen ? 'true' : 'false')
    }
  }, [isOpen])

  return (
    <React.Fragment>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement={'bottomRight'}
        onVisibleChange={(visible) => {
          setIsOpen(visible)
        }}
        overlayStyle={{
          width: '100%',
          maxWidth: 300,
        }}
      >
        <button
          type={'button'}
          className={cx(
            cssHamburgerMenu.menu,
            isOpen && cssHamburgerMenu.opened,
          )}
          aria-label="Main Menu"
        >
          <svg width="24" height="24" viewBox="0 0 100 100">
            <path
              className={cx(cssHamburgerMenu.line, cssHamburgerMenu.line1)}
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path
              className={cx(cssHamburgerMenu.line, cssHamburgerMenu.line2)}
              d="M 20,50 H 80"
            />
            <path
              className={cx(cssHamburgerMenu.line, cssHamburgerMenu.line3)}
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
      </Dropdown>
    </React.Fragment>
  )
}

export default HamburgerButton
