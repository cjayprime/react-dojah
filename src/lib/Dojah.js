import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Dojah extends Component {
  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    this.stop()
  }

  load = () => {
    const { response } = this.props
    response('start')
    this.open()
  }

  error = () => {
    const { response } = this.props
    response('error')
    document.head.removeChild(this.script)
  }

  start = () => {
    const { response } = this.props
    const { uri } = Dojah.config
    response('loading')
    this.script = document.createElement('script')
    this.script.addEventListener('load', this.load)
    this.script.addEventListener('complete', this.load)
    this.script.addEventListener('error', this.error)
    this.script.src = uri
    this.script.async = true
    document.head.appendChild(this.script)
  }

  stop = () => {
    this.script.removeEventListener('load', this.load)
    this.script.removeEventListener('error', this.error)
    document.head.removeChild(this.script)
  }

  open = () => {
    const { appID, publicKey, response } = this.props
    const options = {
      app_id: appID,
      p_key: publicKey,
      onSuccess: (data) => {
        response('success', data)
      },
      onError: (err) => {
        response('error', err)
        this.script.remove()
      },
      onClose: (err) => {
        response('close', err)
        this.script.remove()
      }
    }
    var connect = new window.Connect(options)
    connect.setup()
    connect.open()
  }

  render() {
    return <React.Fragment />
  }
}

Dojah.config = {
  uri: 'https://services.elta.com.ng/doja/connect.js'
}

Dojah.propTypes = {
  appID: PropTypes.string.isRequired,
  publicKey: PropTypes.string.isRequired,
  response: PropTypes.func.isRequired
}

export default Dojah
