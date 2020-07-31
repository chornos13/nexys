import React, { useState } from 'react'
import { Button, Col, Divider, Input, Row, Spin } from 'antd'
import cssFont from 'css/cssFont.scss'
import cx from 'shortcuts/cx'
import cssCSelect from 'fields/CCreateSelect/CCreateSelect.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import CSelect from 'fields/CSelect/CSelect'

interface CCreateSelectProps {
  loading?: boolean
  onCreate?: (str: string) => void | Promise<any>
}

function ComField(props: CCreateSelectProps) {
  const { loading: propLoading, onCreate } = props
  const [state, setState] = useState({
    nama: '',
    loading: false,
  })
  return (
    <CSelect
      {...props}
      dropdownRender={(menu) => (
        <div>
          <Spin spinning={state.loading} tip={'Creating...'}>
            <Row className={cx(cssCSelect.inputSelectContainer)}>
              <Col flex={1}>
                <Input
                  onChange={(e) => {
                    const { value } = e.target
                    setState((prev) => {
                      return {
                        ...prev,
                        nama: value,
                      }
                    })
                  }}
                  value={state.nama}
                  placeholder={'Input Name'}
                />
              </Col>
              <Col>
                <Button
                  type="link"
                  onClick={async () => {
                    if (onCreate) {
                      setState((prev) => {
                        return {
                          ...prev,
                          loading: false,
                        }
                      })
                      await onCreate(state.nama)
                      setState((prev) => {
                        return {
                          ...prev,
                          nama: '',
                          loading: false,
                        }
                      })
                    }
                  }}
                  className={cx(cssFont.normal)}
                >
                  <PlusOutlined />
                  Buat Baru
                </Button>
              </Col>
            </Row>
            <Divider style={{ margin: '4px 0' }} />
            {propLoading ? (
              <Spin spinning={propLoading} tip={'Loading data...'}>
                {menu}
              </Spin>
            ) : (
              menu
            )}
          </Spin>
        </div>
      )}
    />
  )
}

export default ComField
