import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import {GlobalEditorContext} from '../../Editor';
import FileLoad from '../../Controls/Loader/Loader'
import DropDownButton from '../../Controls/DropDownButton/DropDownButton';
import Button from "../../Controls/Button/Button";
import {
    changeImageEditor, changeImageEditorStatus
} from '../../../Store/EditorStore/ImageEditor/Actions';
import {
    changeCodeEditor, changeCodeEditorStatus
} from '../../../Store/EditorStore/CodeEditor/Actions';

import {
    changeColorPalette, changeColorPaletteStatus
} from '../../../Store/EditorStore/ColorPalette/Actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as fontAwesome from '@fortawesome/free-solid-svg-icons';
import {globalVariables} from "../../../GlobalVariables";
/**
 * Крмпонент визуализации полученных данных (в дальнейшем можно развить до полноценного редактора текста/картинок и т.д)
 * @returns {any}
 * @constructor
 */
function InspectorEditor() {
    const [fileData, setFileData] = React.useState<object[]>('');
    const [fileName, setFileName] = React.useState<object[]>('');
    const [fileType, setFileType] = React.useState<object[]>('');
    const [fileExtension, setFileExtension] = React.useState<object[]>('');
    const viewData = useSelector(state => state.viewer.viewData);
    const {inspectorData} = React.useContext(GlobalEditorContext);

    const template = <div className="inspector_container">
        <div className="inspector_container-componentsDataContainer">

        </div>
        <div className="inspector_container__file-container">
            <div className="inspector_container__file-container_header">
                <div className="inspector_container__file-container_name">{fileName}</div>
                <div className="inspector_container__file-container_type">{fileType}</div>
            </div>
            <div className="inspector_container__file-container_body">
                {fileType !== 'sceneObject' ?
                    <FileReaderTemplate source={{fileData, fileExtension, inspectorData}}/> :
                    <SceneObjectTemplate source={fileData}/>}
            </div>
        </div>
    </div>;

    React.useEffect(() => {
        const resFilter = viewData.filter((item) => {
            return item.name === inspectorData.structure.name
        })[0];
        if (resFilter) {
            setFileData(resFilter.fileData);
            setFileName(resFilter.name);
            setFileType(resFilter.type);
            setFileExtension(resFilter.extension);
        }
    }, [inspectorData]);


    return template;
}

function FileReaderTemplate(props) {

    const source = props.source;
    const type = props.source.type;
    let fileExtension = 'text';
    let structureExtension = source.inspectorData.structure.extension;
    let template: object = <div>NONE</div>;
    const typeRegexp = (extension) => {
        let arrayExtension = [/png/, /jepg/, /jpg/, /gif/];

        return arrayExtension.filter((item) => {
            return extension.match(item);
        });
    };


//TODO поправить ошибку с неправильым порядком инициализации компонентов
    if (source.fileExtension) {
        fileExtension = typeRegexp(source.fileExtension).length ? 'image' : 'text';
        if (fileExtension === 'image' && source.fileExtension === structureExtension) {
            const imgPath = source.inspectorData.structure.path.replace(/\\GameEngine/, "").replace(/\\/g, '/');

            template = <ImageReaderTemplate source={source} imgPath={imgPath}/>
        }
        else {
            template = <TextReaderTemplate source={source}/>
        }
    }


    return template;
}

function ImageReaderTemplate(props) {
    const dispatch = useDispatch();
    const source = props.source;
    const structure = source.inspectorData.structure;
    const imgSize = structure.stats.size;
    let imgPath = props.imgPath;

    //Если на на бою то путь строим относительный
    if (globalVariables.server) {
        imgPath= props.imgPath.match(/(\/Client.*)/)[0];
    }

    const imgName = structure.name.replace(/\.[^/.]+$/g, '');
    const createDate = new Date(structure.stats.birthtime).toLocaleString();
    const templateName = 'ImageViewer';
    React.useEffect(() => {
        document.addEventListener("Edit", (event) => {
            dispatch(changeImageEditor(imgPath));
            dispatch(changeImageEditorStatus(true));
        });
    }, []);

    const template = <div className="fileReader_container">
        <div className="fileReader_container-data">
            <div className="fileReader_container-data_name">Name</div>
            <input className="fileReader_container-data-body" value={imgName}></input>
        </div>

        <div className="fileReader_container-data">
            <div className="fileReader_container-data_name">Path</div>
            <input className="fileReader_container-data-body" value={imgPath}></input>
        </div>
        <div className="fileReader_container-data">
            <div className="fileReader_container-data_name">Size</div>
            <div className="fileReader_container-data_body">{imgSize}</div>
        </div>
        <div className="fileReader_container-data">
            <div className="fileReader_container-data_name">Create Date</div>
            <div className="fileReader_container-data_body">{createDate}</div>
        </div>
        <div className="fileReader_container-header">
            <Button options={ {
                name: 'Edit',
                iconType: 'Edit',
                iconSize: '1x',
                id: 1,
                componentArray: [],
                style: {margin: '5px'}
            }}/>
        </div>
        <img className="fileReader_container-image" src={imgPath} alt=""/>
    </div>;


    return <TemplateManagementContainer template={template} templateName={templateName}/>;
}
function TextReaderTemplate(props) {
    const source = props.source;
    const name = source.inspectorData.structure.name;
    const dispatch = useDispatch();
    React.useEffect(() => {
        document.addEventListener("EditCode", (event) => {
            dispatch(changeCodeEditor(source));
            dispatch(changeCodeEditorStatus(true));
        });
    }, []);
    const template = <div className="inspector_container__file-data"><FontAwesomeIcon
        icon={fontAwesome['faFileSignature']}
        size='2x'/>
        <div className="inspector_container__file-name">{name}</div>
        < Button options={ {
            name: 'EditCode',
            iconType: 'Edit',
            iconSize: '1x',
            id: 1,
            componentArray: [],
            style: {margin: '5px'}
        }}/>
    </div>;

    return template;
}


function SceneObjectTemplate(props) {
    const source = props.source;
    const type = props.source.type;
    let template: object;

    if (type === 'HemisphereLight') {
        template = <ComponentTemplateLight source={source}/>
    }
    else if (type === 'Mesh' || type === 'Sprite') {
        template = <ComponentTemplateMesh source={source}/>
    }
    else {
        template =
            <TransformControl key={source.uuid} source={source} position={source.position} rotation={source.rotation}
                              scale={source.scale}/>
    }

    return template;
}

function ComponentTemplateMesh(props) {
    const source = props.source;
    const dispatch = useDispatch();
    const templateMeshFilterName = 'Mesh Filter';
    const templateMeshFilter = <div>
        <div className="containerSceneObject_mesh__container-type">
            <div className="containerSceneObject__mesh__container-type_name">{source.type}</div>
            <DropDownButton options={{
                name: source.geometry.type,
                parentElement: null,
                id: 4,
                width: '70%',
                margin: '0 3px 0 3px',
                componentArray: [],
                linkList: [
                    'BoxBufferGeometry',
                    'CircleBufferGeometry',
                    'ConeBufferGeometry',
                    'CylinderBufferGeometry',
                    'DodecahedronBufferGeometry',
                    'ExtrudeBufferGeometry',
                    'IcosahedronBufferGeometry',
                    'LatheBufferGeometry',
                    'OctahedronBufferGeometry',
                    'ParametricBufferGeometry',
                    'PlaneBufferGeometry',
                    'PolyhedronBufferGeometry',
                    'RingBufferGeometry',
                    'ShapeBufferGeometry',
                    'SphereBufferGeometry',
                    'TetrahedronBufferGeometry',
                    'TextBufferGeometry',
                    'TorusBufferGeometry',
                    'TorusKnotBufferGeometry',
                    'TubeBufferGeometry',
                ]
            }}/>
        </div>
    </div>;

    const openInImageEditor = (e, imgSrc) => {
        dispatch(changeImageEditor(imgSrc));
        dispatch(changeImageEditorStatus(true));
    };

    const openColorPalette = (e, source, imgSrc) => {
        e.stopPropagation();
        dispatch(changeColorPalette({source, imgSrc}));
        dispatch(changeColorPaletteStatus(true));
    };

    const findImageData = (imgSrc) => {
        return imgSrc.length;
    };

    const templateMeshRendererName = 'Mesh Renderer';
    // const imgSrc = source.material.map.image.currentSrc;
    const imgSrc = source.material;
    const imageResultArray = findImageData(imgSrc);
    const templatesMaterials = <div>

            {imageResultArray ? imgSrc.map((imgMaterial) => {
                return (
                    <div>
                        <div className="containerSceneObject_mesh__container-type">
                            <div className="containerSceneObject__mesh__container-type_name">Materials</div>
                            <DropDownButton key={imgMaterial.uuid} options={{
                                name: imgMaterial.type,
                                parentElement: null,
                                id: 4,
                                width: '70%',
                                margin: '0 3px 0 3px',
                                componentArray: [],
                                linkList: [
                                    'MeshBasicMaterial',
                                    'MeshDepthMaterial',
                                    'MeshDistanceMaterial',
                                    'MeshLambertMaterial',
                                    'MeshMatcapMaterial',
                                    'MeshNormalMaterial',
                                    'MeshPhongMaterial',
                                    'MeshPhysicalMaterial',
                                    'MeshStandardMaterial',
                                    'MeshToonMaterial'
                                ]
                            }}/>
                        </div>
                        <div key={imgMaterial.uuid} className="containerSceneObject_mesh__container-type">
                            <div className="containerSceneObject_mesh__container-type_name">MaterialsTexture</div>
                            {imgMaterial.map ? <img onClick={(e) => openInImageEditor(e, imgMaterial.map.image.currentSrc)}
                                                    class="containerSceneObject_mesh__container-type_img"
                                                    src={imgMaterial.map.image.currentSrc} alt=""/> :
                                <div onClick={(e) => openColorPalette(e, imgMaterial.color, imgMaterial.color.getStyle())}
                                     className="containerSceneObject_mesh__container-type_color"
                                     style={{backgroundColor: `${imgMaterial.color.getStyle()}`}}></div>
                            }
                        </div>

                    </div>
                )
            }) : <div>
                <div className="containerSceneObject_mesh__container-type">
                    <div className="containerSceneObject__mesh__container-type_name">Materials</div>
                    <DropDownButton options={{
                        name: source.material.type,
                        parentElement: null,
                        id: 4,
                        width: '70%',
                        margin: '0 3px 0 3px',
                        componentArray: [],
                        linkList: [
                            'MeshBasicMaterial',
                            'MeshDepthMaterial',
                            'MeshDistanceMaterial',
                            'MeshLambertMaterial',
                            'MeshMatcapMaterial',
                            'MeshNormalMaterial',
                            'MeshPhongMaterial',
                            'MeshPhysicalMaterial',
                            'MeshStandardMaterial',
                            'MeshToonMaterial'
                        ]
                    }}/>
                </div>
                <div className="containerSceneObject_mesh__container-type">
                    <div className="containerSceneObject_mesh__container-type_name">MaterialsTexture</div>
                    {imgSrc.map ? <img onClick={(e) => openInImageEditor(e, imgSrc.map.image.currentSrc)}
                                       class="containerSceneObject_mesh__container-type_img"
                                       src={imgSrc.map.image.currentSrc} alt=""/> :
                        <div onClick={(e) => openColorPalette(e, imgSrc.color, imgSrc.color.getStyle())}
                             className="containerSceneObject_mesh__container-type_color"
                             style={{backgroundColor: `${imgSrc.color.getStyle()}`}}></div>}
                </div>
            </div>
            }
        </div>
    ;
    const templatesLighting = <div className="containerSceneObject_mesh__container-type">
        <div className="containerSceneObject_checkbox__container">
            <div className="containerSceneObject_light__container-receiveShadow_name">CastShadow</div>
            <input id="check2" type="checkbox" name="check" value="check2"/>
            <label for="check2"/>
        </div>
    </div>;
    const templateMeshRenderer = <div>
        <TemplateManagementContainer key={'Materials_1'} template={templatesMaterials} templateName={'Materials'}/>
        <TemplateManagementContainer key={'Lighting_1'} template={templatesLighting} templateName={'Lighting'}/>

    </div>;


    return (
        <div>
            <TransformControl key={source.uuid} source={source}/>
            <TemplateManagementContainer key={'Lighting_1'} template={templateMeshFilter}
                                         templateName={templateMeshFilterName}/>
            <TemplateManagementContainer template={templateMeshRenderer} templateName={templateMeshRendererName}/>
        </div>
    );
}

function ComponentTemplateLight(props) {
    const source = props.source;

    const templateName = 'Light';
    const rgb = `rgb(${source.color.r},${source.color.g},${source.color.b})`;
    const template = <div>
        <div className="containerSceneObject_light__container-type">
            <div className="containerSceneObject_light__container-color_name">Type</div>
            <DropDownButton options={{
                name: source.type,
                parentElement: null,
                id: 4,
                width: '70%',
                margin: '0 3px 0 3px',
                componentArray: [],
                linkList: ['AmbientLight', 'DirectionalLight', 'HemisphereLight', 'Light', 'LightProbe', 'PointLight', 'RectAreaLight', 'SpotLight']
            }}/>
        </div>
        <div className="containerSceneObject_light__container-intensity">
            <div className="containerSceneObject_light__container-intensity_name">Intensity</div>
            <input value={source.intensity}/>
        </div>
        <div className="containerSceneObject_light__container-type">
            <div className="containerSceneObject_light__container-type_name">Color</div>
            <div className="containerSceneObject_light__container-type-body" style={{backgroundColor: rgb}}></div>
        </div>
        <div className="containerSceneObject_checkbox__container">
            <div className="containerSceneObject_light__container-castShadow_name">CastShadow</div>
            <div class="checkbox">
                <input id="check1" type="checkbox" name="check" value="check1"/>
                <label for="check1"/>
            </div>
        </div>
        <div className="containerSceneObject_checkbox__container">
            <div className="containerSceneObject_light__container-receiveShadow_name">ReceiveShadow</div>
            <input id="check2" type="checkbox" name="check" value="check2"/>
            <label for="check2"/>
        </div>
    </div>;


    return (
        <div>
            <TransformControl key={source.uuid} source={source}/>
            <TemplateManagementContainer key={source.uuid} template={template} templateName={templateName}/>
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
        <div key={props.templateName + new Date().getMilliseconds()} className="containerSceneObject">
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
    const source = props.source;
    const position = source.position;
    const rotation = source.rotation;
    const scale = source.scale;
    const transformData = {position, rotation, scale};

    const templateName = 'Transform';
    const template = Object.keys(transformData).map((item) => {
        const [inputDataX, changeInputDataX] = React.useState<object[]>(transformData[item].x);
        const [inputDataY, changeInputDataY] = React.useState<object[]>(transformData[item].y);
        const [inputDataZ, changeInputDataZ] = React.useState<object[]>(transformData[item].z);
        //Пробрасываем данные в шину событий редактора
        const changeTransform = (data, setFunction, item, name) => {
            setFunction(data);
            const readFile = new CustomEvent('EditorEventBus', {
                bubbles: true,
                cancelable: true,
                detail: {data, item, name, source}
            });
            event.target.dispatchEvent(readFile);
        };


        return (
            <div className="containerSceneObject-transform_item">
                <div className="containerSceneObject-transform_item-name">
                    {item}
                </div>
                <div className="containerSceneObject-transform_item-arrayValue">
                    X<input value={inputDataX} name="x" onChange={(event) => {
                    changeTransform(event.target.value, changeInputDataX, item, event.target.name)
                }}/>
                    Y<input value={inputDataY} name="y" onChange={(event) => {
                    changeTransform(event.target.value, changeInputDataY, item, event.target.name)
                }}/>
                    Z<input value={inputDataZ} name="z" onChange={(event) => {
                    changeTransform(event.target.value, changeInputDataZ, item, event.target.name)
                }}/>
                </div>
            </div>
        )
    });
    return (
        <TemplateManagementContainer key={source.uuid} template={template} templateName={templateName}/>
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

