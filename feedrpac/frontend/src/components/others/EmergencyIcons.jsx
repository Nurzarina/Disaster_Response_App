// import React from 'react';
import { FaFire, FaVolcano, FaSunPlantWilt } from "react-icons/fa6";
import { MdFlood } from "react-icons/md";
import { GiFallingRocks, GiBigWave, GiTornado } from "react-icons/gi";
import { RiEarthquakeFill } from "react-icons/ri";
import { faHouseFloodWater, faHouseCrack, faHillRockslide, faHouseFire, faHouseTsunami, faVolcano, faSunPlantWilt, faTornado } from '@fortawesome/free-solid-svg-icons';

// Icons for Emergencies Feed
export const emergencyIcons = {
        Fire: <FaFire color="red" size="40" />,
        Flood: <MdFlood color="blue" size="40" />,
        Landslide: <GiFallingRocks color="brown" size="40" />,
        Tsunami: <GiBigWave color="purple" size="40" />,
        "Volcano Eruption": <FaVolcano color="black" size="40" />,
        Earthquake: <RiEarthquakeFill color="teal" size="40" />,
        Drought: <FaSunPlantWilt color="orange" size="40" />,
        Tornado: <GiTornado color="green" size="40" />,
      };

//Icons for Emergencies widget
export const disasterTypes = [
    { type: 'Flood', icon: faHouseFloodWater, color: 'blue', label: 'Flood' },
    { type: 'Earthquake', icon: faHouseCrack, color: 'teal', label: 'Earthquake' },
    { type: 'Landslide', icon: faHillRockslide, color: 'brown', label: 'Landslide' },
    { type: 'Fire', icon: faHouseFire, color: 'red', label: 'Fire' },
    { type: 'Tsunami', icon: faHouseTsunami, color: 'purple', label: 'Tsunami' },
    { type: 'Volcanoeruption', icon: faVolcano, color: 'black', label: "Volcano Eruption" },
    { type: 'Drought', icon: faSunPlantWilt, color: 'orange', label: 'Drought' },
    { type: 'Tornado', icon: faTornado, color: 'green', label: 'Tornado' },
    ];