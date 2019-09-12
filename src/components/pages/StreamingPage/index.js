import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import jsmpeg from 'jsmpeg';
import api from 'services/api'
import { PageTemplate, Header, Button } from 'components'

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.15);
  > .modal {
    display: flex;
    flex-flow: column;
    position: absolute;
    background: #fff;
    padding: 15;
    border: 2px solid #444;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    > button {
      text-align: right;
    }
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .display {
    width: 240px;
    height: 160px;
    margin: auto;
  }
`

class StreamingPage extends Component {
  constructor() {
    super()
    this.canvas = React.createRef();
    this.state = { loading: true, port: null }
  }

  componentDidMount() {
    api.get(`/streaming/${this.props.match.params.id}`)
      .then(({ data: { port, delay = 0 } }) => {
        setTimeout(() => {
          this.setState({ loading: false, port })
        }, delay)
      })
  }

  componentDidUpdate(prevProps, prevState) {
    const { port, loading } = this.state
    if (port && !loading && prevState.loading) {
      this.ws = new WebSocket(`ws://localhost:${port}`);
      this.player = new jsmpeg(this.ws, { canvas: this.canvas.current, autoplay: true, loop: true });
    }
  }

  render() {
    const { history } = this.props
    const { loading } = this.state
    let back = e => {
      e.stopPropagation();
      history.goBack();
    };
    return (
      <Wrap>
        <div className="modal">
          {loading ? <div className="display"><p>Connecting...</p></div> : <canvas className="display" ref={this.canvas} />}
          <Button type="button" onClick={back}>
            Close
          </Button>
        </div>
      </Wrap>
    )
  }
}

export default withRouter(StreamingPage)