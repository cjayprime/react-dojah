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
    let { uri } = Dojah.config
    if (window.dojah && window.dojah.uri) {
      uri = window.dojah.uri
    }
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
    const { appID, publicKey, type, response, config, metadata, userData } =
      this.props
    const options = {
      app_id: appID,
      p_key: publicKey,
      type,
      config,
      metadata,
      user_data: userData,
      _getLocation: function () {
        return new Promise(function (resolve) {
          navigator.geolocation.getCurrentPosition(function (location) {
            resolve({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              accuracy: location.coords.accuracy
            })
          })
        })
      },
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
  uri: 'https://widget.dojah.io/widget.js'
}

Dojah.propTypes = {
  appID: PropTypes.string.isRequired,
  publicKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  response: PropTypes.func.isRequired
}

export default Dojah
