// @flow strict-local
import React from 'react'
import { compose, getContext } from 'recompose'
import PropTypes from 'prop-types'
import AreaSpinner from 'components/AreaSpinner'
import Widget, { type WidgetProps, type WidgetDataProps } from './Widget'
import { buildQuery } from './utils'

export type WidgetAPI = {|
  accountId: number,
|}

type Props = {|
  ...WidgetAPI,
  ...WidgetProps,
  // context
  graphql: (string, Object) => Promise<Object>, // flowlint-line unclear-type:off
|}

type State = {|
  data: ?WidgetDataProps,
  loading: boolean,
|}

class ConnectedWidget extends React.Component<Props, State> {
  state = {
    loading: true,
    data: null,
  }

  componentDidMount() {
    this.loadData(null)
  }

  loadData = (categoryId: ?number) => {
    const { graphql, accountId } = this.props
    this.setState(
      {
        loading: true,
      },
      () =>
        graphql(...buildQuery(accountId, categoryId)).then(
          ({ pieChart, payments, barChart, ...rest }) => {
            console.log('graphql data', rest)
            this.setState({
              loading: false,
              data: {
                pieChart,
                payments,
                barChart,
              },
            })
          }
        )
    )
  }

  render() {
    const {
      // omit
      accountId,
      graphql,
      //
      ...widgetProps
    } = this.props
    const { loading, data } = this.state
    if (loading) {
      return <AreaSpinner />
    }
    return <Widget {...data} {...widgetProps} />
  }
}

export default compose(
  getContext({
    graphql: PropTypes.func.isRequired,
  })
)(ConnectedWidget)
