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

import { Company, Country } from '../types';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = memo(({setTooltipContent, countrySelected}: any) => {
    const { data: country_data, ids: country_ids, loaded: country_loaded } = useGetList<Country>(
        'countries',
        { perPage: 1000, page: 1 }
    );
    const { data: company_data, ids: company_ids, loaded: company_loaded } = useGetList<Company>(
        'companies',
        { perPage: 1000, page: 1 },
        undefined,
        { relation: 'Distributor' }
    );
    if (!country_loaded || !company_loaded) return null;

    const colorScale = scaleLinear<string>()
        .domain([0, max(country_ids.map(id => country_data[id].nb_companies)) as number])
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
                        geographies.map(geo => {
                            const { ISO_A3 } = geo.properties;
                            const cur = country_ids.find(id => country_data[id].iso3 === ISO_A3);
                            return (
                                <Geography 
                                        key={geo.rsmKey} 
                                        geography={geo} 
                                        fill={cur ? colorScale(country_data[cur].nb_companies) : "#D6D6DA"}
                                        stroke="#EAEAEC"
                                        onMouseEnter={() => {
                                            const { NAME, POP_EST } = geo.properties;
                                            const nb_companies = cur ? country_data[cur].nb_companies : 0;
                                            setTooltipContent(`${NAME} - ${nb_companies}`);
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipContent("");
                                        }}
                                        onClick={() => countrySelected(cur ? country_data[cur] : null)}
                                    />
                            );
                        })
                    )}
                </Geographies>
                {company_ids.map(id => {
                    const company = company_data[id];
                    const cids = country_ids.filter(id => country_data[id].id === company.country_id);
                    if (cids.length != 1) return null;
                    const country = country_data[cids[0]];
                    return (
                        <Marker key={company.id} coordinates={[parseInt(country.capital_longitude), parseInt(country.capital_latitude)]}>
                        <g
                            fill="none"
                            stroke="#FF5533"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform="translate(-12, -24)"
                        >
                            <circle cx="12" cy="10" r="3" />
                            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                        </g>
                        <text
                            textAnchor="middle"
                            y={15}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize:"0.5em"}}
                        >
                            {company.name.replace(/ .*/,'')}
                        </text>
                        </Marker>
                    )
                })}
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