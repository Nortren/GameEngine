import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import Chat from "./Chat/Chat";

export default function GUI(props) {
    return <PCGrid/>
}

function PCGrid(props) {
    return <div className="GUI-container">
        <div id='leftTopCorner'>avatarInfo</div>
        <div id='rightTopCorner'>map</div>
        <div id='leftDownCorner'><Chat/></div>
        <div id='rightDownCorner'>playerControls</div>
    </div>
}
function MobileGrid(props) {
    return <div className="GUI-container">
        <div id='leftTopCorner'>avatarInfo</div>
        <div id='rightTopCorner'>map</div>
        <div id='leftDownCorner'>chat</div>
        <div id='rightDownCorner'>playerControls</div>
    </div>
}