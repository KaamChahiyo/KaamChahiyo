import React, { useContext } from 'react'
import { DistrictMap } from 'react-nepal-map'
import { LocationContext } from './_app'
import {useRouter} from 'next/router'

export default function Location() {
    const router=useRouter();
    const {selectLocation}=useContext(LocationContext)
    const handleLocationClick=(location)=>{
        selectLocation(location)
        router.push(`/jobs/?q=${location}`)
    }
    return (
        <div>
            <div className="container m-auto py-20">
                <DistrictMap
                    hoverColor='blue'
                    stroke='#000'
                    strokeWidth={0.5} onMapClick={({name})=>handleLocationClick(name)}/>
            </div>
        </div >
    )
    }
