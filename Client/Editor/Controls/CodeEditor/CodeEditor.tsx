import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import {
    changeCodeEditor, changeCodeEditorStatus
} from '../../../Store/EditorStore/CodeEditor/Actions';
import {DragAndDropContainerContext} from '../../Controls/DragAndDropContainer/DragAndDropContainer';
import Button from "../Button/Button";
/**
 * Крмпонент простмотра изображений(TODO редактирования)
 * @returns {any}
 * @constructor
 */


export default function CodeEditor(props) {
    const codeEditorStore = useSelector(state => state.codeEditorStore.codeEditorData);
    const codeEditorStatus = useSelector(state => state.codeEditorStore.codeEditorStatus);
    const dispatch = useDispatch();
    const {DnDStatus, changeDnDStatus} = React.useContext(DragAndDropContainerContext);
    props.statusVisible(codeEditorStatus);

    React.useEffect(() => {
        document.addEventListener("off", (event) => {
            dispatch(changeCodeEditorStatus(false));
        });
        document.addEventListener("DnDStatusCodeEditor", (event) => {
            changeDnDCodeEitorStatus();

        });

        return () => {
            document.removeEventListener("off", () => {
            });
            document.removeEventListener("DnDStatusCodeEditor", () => {
            });
        }
    }, []);
    const changeDnDCodeEitorStatus = () => {
        changeDnDStatus();
    };

    const closecodeEditor = () => {
        dispatch(changeCodeEditorStatus(false));
    };


    return codeEditorStatus ? <div className="codeEditor_container">
        <div className="codeEditor_container-body">
            <div className="codeEditor_container-body_editorTools">
                <div className="codeEditor_container-body_editorTools-toolsLeft">
                    <Button options={ {
                        name: 'ellipsisH',
                        iconType: 'EllipsisH',
                        iconSize: '2x',
                        id: 1,
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                    <Button options={ {
                        name: 'save',
                        iconType: 'Save',
                        iconSize: '2x',
                        id: 2,
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                    <Button options={ {
                        name: 'sitemap',
                        iconType: 'Sitemap',
                        iconSize: '2x',
                        id: 3,
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                    <Button options={ {
                        name: 'cog',
                        iconType: 'Cog',
                        id: 1,
                        iconSize: '2x',
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>

                </div>
                <div className="codeEditor_container-body_editorTools-toolsRight">
                    <Button options={ {
                        name: 'DnDStatusCodeEditor',
                        iconType: 'ArrowsAlt',
                        iconSize: '2x',
                        id: 1,
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                    <Button options={ {
                        name: 'off',
                        iconType: 'PowerOff',
                        iconSize: '2x',
                        id: 1,
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                </div>
            </div>
            <CodeEditorArea source={codeEditorStore}/>

        </div>
    </div> : ''
}

function CodeEditorArea(props) {
    const source = props.source;
    const template = <div className="codeEditor-wrapper">
        {source.fileData.split('\n').map((item, index) => {

            return <div className="codeEditor-wrapper_container">
                <div className="codeEditor-leftContainer">
                    <div className="codeEditor-lineNumber">{index}</div>
                    <div className="codeEditor-auxiliaryData"></div>
                </div>
                <pre className="codeEditor-line">
                     <span>
                        {item}
                     </span>
                   </pre>
            </div>

        })}

    </div>;
    return template;
}