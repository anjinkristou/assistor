import React from "react";
import { 
    ComposableMap, 
    Geographies, 
    Geography, 
    ZoomableGroup,
    Marker,
    Annotation,
} from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { max } from 'd3-array';
import { geoCentroid } from "d3-geo";
import {
    FilterList,
    FilterLiveSearch,
    FilterListItem,
    useGetIdentity,
    useGetList,
} from 'react-admin';

import { Country } from '../types';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


export const CompaniesMap = () => {
    const { data, ids, loaded } = useGetList<Country>(
        'countries',
        { perPage: 1000, page: 1 }
    );
    if (!loaded) return null;

    const colorScale = scaleQuantile<string>()
        .domain([0, max(ids.map(id => data[id].nb_companies))])
        .range([
            "#e1f5fe",
            "#b3e5fc",
            "#81d4fa",
            "#4fc3f7",
            "#29b6f6",
            "#03a9f4",
            "#039be5",
            "#0288d1",
            "#0277bd"
        ]);

    return (
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
                rotate: [-25.0, -50.0, 0],
                scale: 750
            }}
        >
             <ZoomableGroup
                center={[0, 0]}
                zoom={1}
             >
                <Geographies geography={geoUrl}>
                    {({ geographies }) => (
                        <>
                            {geographies
                            .map(geo => {
                                const cur = ids.find(id => data[id].iso3 === geo.properties.ISO_A3);
                                return (
                                    <Geography 
                                            key={geo.rsmKey} 
                                            geography={geo} 
                                            fill={cur ? colorScale(data[cur].nb_companies) : "#D6D6DA"}
                                            stroke="#EAEAEC"
                                        />
                                );
                            })}
                            {geographies.map(geo => {
                                const centroid = geoCentroid(geo);
                                const cur = ids.find(id => data[id].iso3 === geo.properties.ISO_A3);
                                return (
                                    <g key={geo.rsmKey + "-name"}>
                                        {cur &&
                                            <Marker coordinates={centroid}>
                                                <text y="2" fontSize={9} textAnchor="middle">
                                                {data[cur].nicename}
                                                </text>
                                            </Marker>
                                        }
                                    </g>
                                );
                            })}
                        </>
                    )}
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    );
}