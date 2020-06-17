import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import {GlobalEditorContext} from '../../Editor';
import FileLoad from '../../Controls/Loader/Loader'
import {Template} from "webpack";

/**
 * Крмпонент визуализации полученных данных (в дальнейшем можно развить до полноценного редактора текста/картинок и т.д)
 * @returns {any}
 * @constructor
 */
function InspectorEditor() {

    const [fileData, setFileData] = React.useState<object[]>('');
    const [fileName, setFileName] = React.useState<object[]>('');
    const [fileType, setFileType] = React.useState<object[]>('');
    const viewData = useSelector(state => state.viewer.viewData);

    const {inspectorData} = React.useContext(GlobalEditorContext);

    React.useEffect(() => {
        const resFilter = viewData.filter((item) => {
            return item.name === inspectorData.structure.name
        })[0];
        if (resFilter) {
            setFileData(resFilter.fileData);
            setFileName(resFilter.name);
            setFileType(resFilter.type);
        }
    }, [inspectorData]);

    return (
        <div className="inspector_container">
            <div className="inspector_container-componentsDataContainer">

            </div>
            <div className="inspector_container__file-container">
                <div className="inspector_container__file-container_header">
                    <div className="inspector_container__file-container_name">{fileName}</div>
                    <div className="inspector_container__file-container_type">{fileType}</div>
                </div>
                <div className="inspector_container__file-container_body">
                    {fileType !== 'sceneObject' ? fileData : <SceneObjectTemplate source={fileData}/>}
                </div>
            </div>
        </div>
    );
}

/*
 Object.keys(fileData).map((item) => {
 return <div>
 <div>{item}</div>
 {/!*<div>{typeof fileData[item] === 'object' ? toString(fileData[item]) : fileData[item]}</div>*!/}
 <div>{item === 'position' ? <TransformTemplate position={fileData[item]} />  : ''}</div>
 </div>
 })*/

function SceneObjectTemplate(props) {
    const source = props.source;
    const type = props.source.type;
    let template: object;

    if(type === 'HemisphereLight'){
        template =   <ComponentTemplateLight source={source}/>
    }
    else{
        template =     <TransformControl position={source.position} rotation={source.rotation}
                                         scale={source.scale}/>
    }

    return template;
}
function ComponentTemplateLight(props) {
    const source = props.source;

    const templateName = source.type;

    const template = <div>
        <div className="containerSceneObject_light-intensity">
            <div className="containerSceneObject_light-intensity_name">Intensity</div>
            <input value={source.intensity}/>
        </div>
    </div>;


    return (
        <div>
            <TransformControl position={props.source.position} rotation={props.source.rotation}
                              scale={props.source.scale}/>
            <TemplateManagementContainer template={template} templateName={templateName}/>
        </div>
    );
}


/**
 * Компонент-контейнер отображения параметров объекта сцены
 * @param props
 * @returns {any}
 * @constructor
 */
function TemplateManagementContainer(props) {

    const expandHeirs = (event) => {

        if (event.target.textContent === "▼") {

            event.target.innerHTML = "&#9658;";
            event.target.parentElement.parentElement.childNodes.forEach((item) => {
                if (item.classList.contains('containerSceneObject-body')) {
                    item.classList.add('containerSceneObject-body-hide');
                }
            });
        }
        else {

            event.target.innerHTML = "&#9660;";
            event.target.parentElement.parentElement.childNodes.forEach((item) => {
                if (item.classList.contains('containerSceneObject-body')) {
                    item.classList.remove('containerSceneObject-body-hide');
                }
            });

        }
    };

    return (
        <div className="containerSceneObject">
            <div className="containerSceneObject-header">
                <button className="containerSceneObject-buttonHide" type="button"
                        onClick={expandHeirs}>&#9660;</button>
                <div className="containerSceneObject-name">{props.templateName}</div>
            </div>
            <div className="containerSceneObject-body">
                {props.template}
            </div>
        </div>
    )
}

/**
 * Компонент отображении геометрии объекта сцены
 * @param props
 * @returns {any}
 * @constructor
 */
function TransformControl(props) {
    const templateName = 'Transform';
    const template = Object.keys(props).map((item) => {
        return (
            <div className="containerSceneObject-transform_item">
                <div className="containerSceneObject-transform_item-name">
                    {item}
                </div>
                <div className="containerSceneObject-transform_item-arrayValue">
                    X<input value={props[item].x}/>
                    Y<input value={props[item].y}/>
                    Z<input value={props[item].z}/>
                </div>
            </div>
        )
    });
    return (
        <TemplateManagementContainer template={template} templateName={templateName}/>
    )
}

/**
 * Компонент представления инспектора данных до момента загрузки отображает лоадер(если был выбранн подгружаемый елемнт)
 * или пустое представление
 * @returns {any}
 * @constructor
 */
export default function Inspector() {
    const [viewFile, setviewFile] = React.useState<object[]>('');
    const {testLoaderStatus} = React.useContext(GlobalEditorContext);

    React.useEffect(() => {
        if (testLoaderStatus === false) {
            setviewFile(<InspectorEditor/>);
        }
        else if (testLoaderStatus === true) {
            setviewFile(<FileLoad/>);
        }

        console.log(testLoaderStatus);
    }, [testLoaderStatus]);

    return (
        <div className="inspector_container">
            {viewFile}
        </div>
    );
}

