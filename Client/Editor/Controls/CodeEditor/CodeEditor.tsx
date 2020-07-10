import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import {
    changeCodeEditor, changeCodeEditorStatus
} from '../../../Store/EditorStore/CodeEditor/Actions';
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
    props.statusVisible(codeEditorStatus);

    React.useEffect(() => {
        document.addEventListener("off", (event) => {
            dispatch(changeCodeEditorStatus(false));
        });


        return () => {
            document.removeEventListener("off", () => {
            });
        }
    }, []);


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

    let statusType=false;
    const parseCodeString = (string: string) => {
        const keyword = ['class','constructor','super','this',';','let', 'const', 'string', 'number', 'object', 'boolean', 'function', 'return', 'export', 'default', 'import', 'from', 'as', 'void', 'typeof', 'void', 'any', 'keyof', 'never', 'symbol', 'for', 'if', 'else', 'try', 'catch'];
       const statusTypekeyword = ['class','function'];

        let template = '';


        if (keyword.some((item) => {
                return item === string
            })) {
            template = <div className="codeEditor-line_keyword">{string}</div>;
        }
        else if(statusType && string !== " "){
            template = <div className="codeEditor-line_variable">{string}</div>;
        } else{
            template = <div className="">{string}</div>
        }

        if(statusTypekeyword.some((item) => {
                return item === string
            })){
            statusType = string;
        }
        else if(string !== " "){
            statusType = false;
        }

        if(string.length){
            return {statusType,template}
        }
    };

    const template = <div className="codeEditor-wrapper">
        {source.fileData.split('\n').map((item, index) => {

            return <div className="codeEditor-wrapper_container">
                <div className="codeEditor-leftContainer">
                    <div className="codeEditor-lineNumber">{index}</div>
                    <div className="codeEditor-auxiliaryData"></div>
                </div>
                <pre className="codeEditor-line">
                     {item.split(/([\u00200]|\;|\'|\)|\()/).map((item) => {
                         const parseVariable = parseCodeString(item);
                         statusType = parseVariable ? parseVariable.statusType : '';
                         return parseVariable ? parseVariable.template : '';
                     })}
                    {/*  <span>
                     {item}
                     </span>*/}
                   </pre>
            </div>

        })}

    </div>;
    return template;
}