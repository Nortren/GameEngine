import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import Chat from "./Chat/Chat";
import Map from "./Map/Map";
import AvatarInfo from "./AvatarInfo/AvatarInfo";
import PlayerControls from "./PlayerControls/PlayerControls";
import {globalVariables} from "../GlobalVariables";

interface IGUI {
    userName: string,
    deviceType?: boolean,
}


/**
 * Компонент инициализации пользовательского игрового интерфейса
 * @param props
 * @constructor
 */
export default function GUI(props: IGUI) {
    const [userName, setUserName] = React.useState('');
    if (!userName) {
        const userName = globalVariables.disableAuthorization ? 'DeveloperMod' : props.userName;
        setUserName(userName);
    }
    return props.deviceType ? <MobileGrid userName={userName}/> : <PCGrid userName={userName}/>;
}

/**
 * Компонент инициализирующий игровой интерфейс для PC
 * @param props
 * @constructor
 */
function PCGrid(props:IGUI) {
    const userName = props.userName;
    return <div className="GUI-container">
        <div id='leftTopCorner'><AvatarInfo userName={userName}/></div>
        <div id='rightTopCorner'><Map/></div>
        <div id='leftDownCorner'><Chat/></div>
        <div id='rightDownCorner'><PlayerControls/></div>
    </div>
}
/**
 * Компонент инициализирующий игровой интерфейс для Мобильных типов устройств
 * @param props
 * @constructor
 */
function MobileGrid(props:IGUI) {
    const userName = props.userName;
    return <div className="GUI-container">
        <div id='leftTopCorner'><AvatarInfo mobile={true} userName={userName}/></div>
        <div id='rightTopCorner'><Map mobile={true}/></div>
        <div id='leftDownCorner'></div>
        <div id='rightDownCorner'></div>
    </div>
}
