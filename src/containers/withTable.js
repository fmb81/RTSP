import React from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import api from 'services/api';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default (WrappedComponent, { url }) => {
  class WithTable extends React.Component {
    constructor(props) {
      super(props)
      const { limit = 10, offset = 0 } = queryString.parse(props.location.search)
      this.state = {
        list: [],
        limit,
        offset,
        total: 0,
        loading: false,
      }
      this.url = url
    }
    componentDidMount() {
      this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
      const { limit, offset } = this.state
      if ((prevState.limit !== limit) || (prevState.offset !== offset)) {
        this.props.history.push({
          ...this.props.location,
          search: queryString.stringify({ limit, offset })
        })
        this.fetchData();
      }
    }

    handlePagination = ({ limit = this.state.limit, offset = this.state.offset }) => {
      this.setState({ limit, offset: offset < 0 ? 0 : offset })
    }

    fetchData = () => {
      const { limit, offset } = this.state
      api.get(`${this.url}?${queryString.stringify({ limit, offset })}`)
        .then(({ data, meta = {} }) => this.setState({ list: data, loading: false, ...meta }))
        .catch((e) => this.setState({ failed: true, loading: false }))
      this.setState({ loading: true })
    }

    render() {
      return <WrappedComponent {...this.state} handlePagination={this.handlePagination} />
    }
  }
  WithTable.displayName = `WithTable(${getDisplayName(WrappedComponent)})`;
  return withRouter(WithTable)
}