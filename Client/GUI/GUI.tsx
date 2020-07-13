import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import Chat from "./Chat/Chat";
import Map from "./Map/Map";
import AvatarInfo from "./AvatarInfo/AvatarInfo";
import PlayerControls from "./PlayerControls/PlayerControls";

export default function GUI(props) {
    const [userName, setUserName] = React.useState();



    const source = props.source;
    if(!userName){
        setUserName(source.userName);
    }
    return source.deviceType ? <MobileGrid source={{userName}}/> : <PCGrid source={{userName}}/>;
}

function PCGrid(props) {
    const source = props.source;
    const userName = source.userName;
    return <div className="GUI-container">
        <div id='leftTopCorner'><AvatarInfo source={{userName}}/></div>
        <div id='rightTopCorner'><Map/></div>
        <div id='leftDownCorner'><Chat/></div>
        <div id='rightDownCorner'><PlayerControls/></div>
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