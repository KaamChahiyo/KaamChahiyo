import React from 'react'
import { ProvinceMap, ZonalMap, DistrictMap } from 'react-nepal-map'

export default function Location() {
    return (
        <div>
            <div className="container m-auto py-20">
                <DistrictMap
                    hoverColor='blue'
                    stroke='#000'
                    strokeWidth={0.5} />
            </div>
        </div >
    )
}
