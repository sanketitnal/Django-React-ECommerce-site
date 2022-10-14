import React from 'react'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import { JsxElement } from 'typescript';

type Props = {
    loading: boolean,
    error: any,
    children: any
}

const LoadingErrorOrChild = ({loading, error, children}:Props) => {
    if(loading)
        return <LoadingIndicator />
    else if(error)
        return <ErrorIndicator errorObject={error} />
    else
        return <>{children}</>
}

export default LoadingErrorOrChild;