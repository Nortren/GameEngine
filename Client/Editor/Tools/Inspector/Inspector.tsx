import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import {GlobalEditorContext} from '../../Editor';
import FileLoad from '../../Controls/Loader/Loader'

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
            setFileType(resFilter.name);
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
                    {fileData}
                </div>
            </div>
        </div>
    );
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

