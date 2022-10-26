import React, {useEffect, useState} from 'react'

type Props = {
    url: string | null,
    options: any
}

const useFetch = ({url, options}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if(url) {
            setLoading(true);
            fetch(url, options).then(result => {
                if(result.ok) {
                    return result.json();
                } else {
                    let resultStatus = result.status, resultStatusText = result.statusText;
                    throw Error(`Status: ${resultStatus}\nMessage: ${resultStatusText}`);
                }
            })
            .then(result => {
                setResult(result);
                setLoading(false);
                setError(null);
            })
            .catch(error => {
                setResult(null);
                setLoading(false);
                setError(error);
            })
        }
    }, [url]);

    return {loading, error, result};
}

export default useFetch;