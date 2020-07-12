import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import Chat from "./Chat/Chat";

export default function GUI(props) {
    return props.deviceType ? <MobileGrid/> : <PCGrid/>;
}

function PCGrid(props) {
    return <div className="GUI-container">
        <div id='leftTopCorner'></div>
        <div id='rightTopCorner'></div>
        <div id='leftDownCorner'><Chat/></div>
        <div id='rightDownCorner'></div>
    </div>
}
function MobileGrid(props) {
    return <div className="GUI-container">
        <div id='leftTopCorner'></div>
        <div id='rightTopCorner'></div>
        <div id='leftDownCorner'></div>
        <div id='rightDownCorner'></div>
    </div>
}