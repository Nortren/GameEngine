import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import Button from "../../Editor/Controls/Button/Button";
import BusinessLogic from '../../BusinessLogic'


export default function PlayerControls(props) {
    const [messageStore, setMessageStore] = React.useState([]);

    React.useEffect(() => {

        }
        , []);


    return <PlayerControlsArea source={messageStore}/>
}
function PlayerControlsArea(props) {

    return <div className="playerControls-container">
        <div className="playerControls-container__playerControls">
            <Button options={ {
                name: 'sendMessage',
                iconType: 'HandRock',
                iconSize: '2x',
                id: 2,
                componentArray: [],
                type: 'EditorButton',
                style: {margin: '5px'}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'Child',
                iconSize: '2x',
                id: 2,
                componentArray: [],
                type: 'EditorButton',
                style: {margin: '5px'}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'Gamepad',
                iconSize: '2x',
                id: 2,
                componentArray: [],
                type: 'EditorButton',
                style: {margin: '5px'}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'GasPump',
                iconSize: '2x',
                id: 2,
                componentArray: [],
                type: 'EditorButton',
                style: {margin: '5px'}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'Flag',
                iconSize: '2x',
                id: 2,
                componentArray: [],
                type: 'EditorButton',
                style: {margin: '5px'}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'Map',
                iconSize: '2x',
                id: 2,
                componentArray: [],
                type: 'EditorButton',
                style: {margin: '5px'}
            }}/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'UserFriends',
                iconSize: '2x',
                id: 2,
                componentArray: [],
                type: 'EditorButton',
                style: {margin: '5px'}
            }}/>
            <Button options={ {
                name: 'setting',
                iconType: 'Cog',
                iconSize: '2x',
                id: 2,
                componentArray: [],
                type: 'EditorButton',
                style: {margin: '5px'}
            }}/>
        </div>
    </div>
}