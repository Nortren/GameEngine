import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import Button from "../../Editor/Controls/Button/Button";
import BusinessLogic from '../../BusinessLogic'


export default function Map(props) {
    const [messageStore, setMessageStore] = React.useState([]);

    React.useEffect(() => {

        }
        , []);


    return <MapArea source={messageStore}/>
}
function MapArea(props) {

    return <div className="map-container">
        <div className="map-container__map">

        </div>
    </div>
}