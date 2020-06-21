import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import {GlobalEditorContext} from '../../Editor';
import FileLoad from '../../Controls/Loader/Loader'
import DropDownButton from '../../Controls/DropDownButton/DropDownButton';
import {
    changeImageEditor,changeImageEditorStatus
} from '../../../Store/EditorStore/ImageEditor/Actions';

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
        template = <TransformControl position={source.position} rotation={source.rotation}
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

    const openInImageEditor = (e,imgSrc) => {
      console.log('openInImageEditor',imgSrc);
        dispatch(changeImageEditor(imgSrc));
        dispatch(changeImageEditorStatus(true));
    };

    const templateMeshRendererName = 'Mesh Renderer';
    const imgSrc = source.material.map.image.currentSrc;
    const templatesMaterials = <div>
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
                {source.material.map.image ?
                    <img onClick={(e)=>openInImageEditor(e,imgSrc)} class="containerSceneObject_mesh__container-type_img"
                         src={imgSrc} alt=""/> : ''}
            </div>
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
        <TemplateManagementContainer template={templatesMaterials} templateName={'Materials'}/>
        <TemplateManagementContainer template={templatesLighting} templateName={'Lighting'}/>

    </div>;


    return (
        <div>
            <TransformControl position={props.source.position} rotation={props.source.rotation}
                              scale={props.source.scale}/>
            <TemplateManagementContainer template={templateMeshFilter} templateName={templateMeshFilterName}/>
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

