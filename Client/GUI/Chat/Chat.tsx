import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import Button from "../../Editor/Controls/Button/Button";
export default function Chat(props) {
    return <div className="chat-container">
       <div className="chat-container__messageContainer">
           
       </div>
        <div className="chat-container__controlPanel">
            <input type="text" className="chat-container__controlPanel-message"/>
            <Button options={ {
                name: 'sendMessage',
                iconType: 'Check',
                iconSize: '1x',
                id: 2,
                componentArray: [],
                type: 'EditorButton',
                style: {margin: '5px',width:'2em',height:'2em'}
            }}/>
        </div>
    </div>
}
