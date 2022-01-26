import React from 'react'
import Dojah from 'react-dojah'

const App = () => {
  /**
   *  This is your app ID
   * (go to your dashboard at
   * https://dojah.io/dashboard
   * to create an app and retrieve it)
   */
  const appID = "5f772c87d30341003e0c8523";

  /**
   *  This is your account public key
   *  (go to your dashboard at
   *  https://dojah.io/dashboard to
   *  retrieve it. You can also regenerate one)
   */
  const publicKey = "test_pk_OvAQ5aAhwATSKPzOX5vB1Fbv8";

  /**
   *  This is the widget type you'd like to load
   *  (go to your dashboard at
   *  https://dojah.io/dashboard to enable different
   *  widget types)
   */
  const type = "link";

  /**
   *  These are the configuration options
   *  available to you possible options are:
   *  {debug: BOOL, otp: BOOL, selfie: BOOL}
   * 
   *  NOTE: The otp and selfie options are only
   *  available to the `verification` widget
   */
  const config = {
    debug: true,
    otp: type === 'verification',
    selfie: type === 'verification',
  };

  /**
   * @param {String} type
   * This method receives the type
   * The type can only be one of:
   * loading, begin, success, error, close
   * @param {String} data
   * This is the data from doja
   */
  const response = (type, data) => {
    console.log(type, data);
    if(type === 'success'){
    }else if(type === 'error'){
    }else if(type === 'close'){
    }else if(type === 'begin'){
    }else if(type === 'loading'){
    }
  }

  // The Doja library accepts 3 props and
  // initiliazes the doja widget and connect process
  return (
    <Dojah
      response={response}
      appID={appID}
      type={type}
      publicKey={publicKey}
      config={config}
    />
  );
}

export default App
