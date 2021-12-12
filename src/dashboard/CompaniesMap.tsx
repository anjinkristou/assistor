import React, { useState, memo, useEffect } from "react";
import { 
    ComposableMap, 
    Geographies, 
    Geography, 
    ZoomableGroup,
    Marker,
    Annotation,
    Graticule,
} from 'react-simple-maps';
import { scaleLinear, scaleQuantile } from 'd3-scale';
import { max } from 'd3-array';
import { geoCentroid } from "d3-geo";
import {
    FilterList,
    FilterLiveSearch,
    FilterListItem,
    useGetIdentity,
    useGetList,
} from 'react-admin';
import ReactTooltip from "react-tooltip";

import { Country } from '../types';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = memo(({setTooltipContent, countrySelected}: any) => {
    const { data, ids, loaded } = useGetList<Country>(
        'countries',
        { perPage: 1000, page: 1 }
    );
    if (!loaded) return null;

    const colorScale = scaleLinear<string>()
        .domain([0, max(ids.map(id => data[id].nb_companies)) as number])
        .range(["#e1f5fe", "#0277bd"]);

    return (
        <ComposableMap
            data-tip=""
            projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 850
            }}
        >
            <ZoomableGroup
                center={[25, 50]}
                zoom={1}
            >

                <Graticule stroke="#EAEAEC" />
                <Geographies geography={geoUrl}>
                    {({ geographies }) => (
                        <>
                            {geographies
                            .map(geo => {
                                const { ISO_A3 } = geo.properties;
                                const cur = ids.find(id => data[id].iso3 === ISO_A3);
                                return (
                                    <Geography 
                                            key={geo.rsmKey} 
                                            geography={geo} 
                                            fill={cur ? colorScale(data[cur].nb_companies) : "#D6D6DA"}
                                            stroke="#EAEAEC"
                                            onMouseEnter={() => {
                                                const { NAME, POP_EST } = geo.properties;
                                                const nb_companies = cur ? data[cur].nb_companies : 0;
                                                setTooltipContent(`${NAME} - ${nb_companies}`);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent("");
                                            }}
                                            onClick={() => countrySelected(cur ? data[cur] : null)}
                                        />
                                );
                            })}
                            {/* {geographies.map(geo => {
                                const centroid = geoCentroid(geo);
                                const { ISO_A3 } = geo.properties;
                                const cur = ids.find(id => data[id].iso3 === ISO_A3);
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
                            })} */}
                        </>
                    )}
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    );
});

export const CompaniesMap = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        ReactTooltip.rebuild();
    }, [content])

    const handleCountrySelected = (country?: Country) => {

    }

    return (
        <div>
            <Map setTooltipContent={setContent} countrySelected={handleCountrySelected}/>
            <ReactTooltip>{content}</ReactTooltip>
        </div>
    );
}