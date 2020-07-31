import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isError from 'lodash/isError'
import queryString from 'query-string'
import QueryTableManager from 'helpers/QueryTableManager'

const GET_CONFIG = () => ({
  idProps: 'fetchDataAPI',
  Component: null,
  API: null,
})

function WithFetchDebounce(options = GET_CONFIG()) {
  const { idProps, Component, API } = {
    ...GET_CONFIG(),
    ...options,
  }

  return class _withFetchDebounce extends React.Component {
    constructor(props) {
      super(props)
      this.lastFetchId = 0
      this.fetchData = debounce(this.fetchData, 800)
      this.state = {
        data: [],
        loading: false,
      }
      this.queryManager = new QueryTableManager()
    }

    fetchData = (paramEncoded) => {
      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      this.setState({ data: [], loading: true })
      API(
        [
          paramEncoded,
          queryString.stringify({
            ...this.queryManager.getStringifyQuery(),
          }),
        ].join('&'),
      )
        .then((res) => {
          if (fetchId !== this.lastFetchId) {
            // for fetch callback order
            return
          }

          return res.data.data
        })
        .catch((err) => {
          return err
        })
        .then((dataOrError) => {
          if (isError(dataOrError)) {
            this.setState({ data: [], loading: false })
          } else if (dataOrError !== undefined) {
            this.setState({
              data: dataOrError,
              loading: false,
            })
          }
        })
    }

    doFilter = (id, value) => {
      this.queryManager.setFilteredValue(id, value, () => {
        this.fetchData()
      })
    }

    render() {
      const { data, loading } = this.state
      const extraProps = {
        [idProps]: {
          data,
          loading,
          fetchData: this.fetchData,
          doFilter: this.doFilter,
        },
      }

      return <Component {...this.props} {...extraProps} />
    }
  }
}

const withFetchDebounce = WithFetchDebounce

export const PropWithFetchDebounce = PropTypes.shape({
  data: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  fetchData: PropTypes.func,
  doFilter: PropTypes.func,
})

export default withFetchDebounce
