import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import {GlobalEditorContext} from '../../Editor';
import FileLoad from '../../Controls/Loader/Loader'
/*
 class Inspector extends React.Component {


 constructor(props: object) {
 super(props);
 this.id = props.id;
 this.state = {
 style: {
 height: props.height || '100%',
 width: props.width,
 justifySelf: props.justifySelf,
 },
 inspectorData: props.options.inspectorData ? props.options.inspectorData.structure.name : props.options.inspectorData,
 moveY: 0, countMove: 0,
 moveXBoll: true,
 fps: 0
 };
 this.getReduxState = this.getReduxState.bind(this);
 }

 componentDidMount() {

 };

 componentDidUpdate() {

 }

 getReduxState() {
 let t = this.props.viewer.filter((item) => {
 return item.name === this.props.options.inspectorData.structure.name
 });
 return t.length ? t[0].fileData : ''
 }

 render() {


 return (
 <div className="inspector_container">
 <div className="inspector_container-componentsDataContainer">

 </div>
 <div className="inspector_container-buttonAddContainer">
 <button onClick={this.getReduxState} className="inspector_container-buttonAddContainer_button">Add
 Component {this.getReduxState()}</button>
 </div>
 </div>
 );
 }
 }
 const mapStateToProps = state => {
 return {
 viewer: state.viewer.viewData
 };
 };

 export default connect(mapStateToProps)(Inspector);

 */

function InspectorEditor() {
    const [test, setTest] = React.useState<object[]>(0);
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


    const testClick = () => {
        console.log(test);
        setTest(test + 1);
    };
    return (
        <div className="inspector_container">
            <div className="inspector_container-componentsDataContainer">

            </div>
            <div className="inspector_container-buttonAddContainer">
                <button onClick={testClick} className="inspector_container-buttonAddContainer_button">Add
                    Component
                </button>
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
};



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

