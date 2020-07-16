import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import Button from "../../Editor/Controls/Button/Button";
import BusinessLogic from '../../BusinessLogic'


export default function PlayerControls(props) {
    const [messageStore, setMessageStore] = React.useState([]);

    React.useEffect(() => {

        }
        , []);


    return <PlayerControlsArea mobile={props.mobile} source={messageStore}/>
}
function PlayerControlsArea(props) {

    const buttonSize = props.mobile ? '1x' : '2x';
    const buttonMargin = props.mobile ? '0' : '5px';
    const buttonType = props.mobile ? '' : 'EditorButton';


    return <div className={ props.mobile ? 'playerControls-containerMobile' : 'playerControls-container'}>
        <div className={ props.mobile ? 'playerControls-containerMobile__playerControls' : 'playerControls-container__playerControls'}>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'HandRock',
                iconSize: buttonSize,
                id: 2,
                componentArray: [],
                type: buttonType,
                style: {margin: buttonMargin}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'Child',
                iconSize: buttonSize,
                id: 2,
                componentArray: [],
                type: buttonType,
                style: {margin: buttonMargin}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'Gamepad',
                iconSize: buttonSize,
                id: 2,
                componentArray: [],
                type: buttonType,
                style: {margin: buttonMargin}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'GasPump',
                iconSize: buttonSize,
                id: 2,
                componentArray: [],
                type: buttonType,
                style: {margin: buttonMargin}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'Flag',
                iconSize: buttonSize,
                id: 2,
                componentArray: [],
                type: buttonType,
                style: {margin: buttonMargin}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'Map',
                iconSize: buttonSize,
                id: 2,
                componentArray: [],
                type: buttonType,
                style: {margin: buttonMargin}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'UserFriends',
                iconSize: buttonSize,
                id: 2,
                componentArray: [],
                type: buttonType,
                style: {margin: buttonMargin}
            }}/>
            <Button options={ {
                name: 'setting',
                iconType: 'Cog',
                iconSize: buttonSize,
                id: 2,
                componentArray: [],
                type: buttonType,
                style: {margin: buttonMargin}
            }}/>
        </div>
    </div>
}