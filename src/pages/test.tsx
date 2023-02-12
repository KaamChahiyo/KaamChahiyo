import { useState, useEffect } from 'react';


export default function Test() {
    const [jobs, setData] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/api/jobs')
            .then((res) => res.json())
            .then((jobs) => {
                setData(jobs)
            })
    }, [])


    return (
        <>

        </>
    );

}