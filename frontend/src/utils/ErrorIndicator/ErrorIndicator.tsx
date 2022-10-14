import React from 'react'
import Alert from 'react-bootstrap/Alert';

type Props = {
  errorObject: any
}

const ErrorIndicator = ({errorObject}:Props) => {
  return (
    <Alert key="danger" variant="danger" style={{width: "100%", height: "100%"}}>
        ERROR: {errorObject.message} <br />
        Please try again after some time
    </Alert>
  )
}

export default ErrorIndicator