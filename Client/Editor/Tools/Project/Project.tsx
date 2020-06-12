import * as React from 'react';
import BusinessLogic from '../../BusinessLogic'
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import FileLoad from '../../Controls/Loader/Loader'
import {
    changeViewer
} from '../../../Store/EditorStore/Viewer/Actions';

/*
 class Project extends React.Component {



 constructor(props: object) {
 super(props);
 this.id = props.id;
 this.state = {
 style: {
 height: props.height || '100%',
 width: props.width,
 justifySelf: props.justifySelf,
 loadData: false
 },
 moveY: 0, countMove: 0,
 moveXBoll: true,
 fps: 0
 };
 this.getDirectory = this.getDirectory.bind(this);
 }

 componentDidMount() {
 this.getDirectory();
 };

 componentDidUpdate() {

 }

 /!**
 * Метод скрытия/отображения элементов в файловой структуре дерева эелементов
 * @param event
 *!/
 expandHeirs(event): void {

 if (event.target.textContent === "►") {
 event.target.innerHTML = "&#9660;";
 event.target.parentElement.parentElement.childNodes.forEach((item) => {
 if (item.className === 'project_container-list_container_array') {
 item.classList.add('project_container-list_container_array-visible');
 }
 });
 }
 else {
 event.target.innerHTML = "&#9658;";
 event.target.parentElement.parentElement.childNodes.forEach((item) => {
 if (item.classList.contains('project_container-list_container_array-visible')) {
 item.classList.remove('project_container-list_container_array-visible');
 }
 });
 }
 }

 /!**
 * Метод получения директории по которой кликнул пользователь
 * @param event
 *!/
 showContents(event, name): void {
 const nameDirectoryShare = name ? name : event.target.parentElement.dataset.directoryname;
 let result = this.getShareDirectory(this.state.directoryProject, nameDirectoryShare, []);
 this.setState({selectedDirectory: result[0]});

 }


 /!**
 * Метод поиска по файловой структуре элемента (далле можно будет искать список эелемнтов)
 * @param directoryProject
 * @param nameDirectoryShare
 * @param findElementArray переменная куда записываем найденые элементы
 * @returns {any}
 *!/
 getShareDirectory(directoryProject, nameDirectoryShare, findElementArray) {

 directoryProject.forEach((currentItem) => {
 if (currentItem.name === nameDirectoryShare) {
 findElementArray.push(currentItem);
 }
 else {
 if (currentItem.type === 'directory' && currentItem.arrayOfStructures) {
 return this.getShareDirectory(currentItem.arrayOfStructures, nameDirectoryShare, findElementArray) || '';
 }
 }
 });

 return findElementArray;

 }

 /!**
 * Метод отображения файловой структуры проекта
 * @param directoryProject
 * @returns {any}
 *!/
 createStructure(directoryProject: object): void {

 if (directoryProject) {
 {
 return directoryProject.map((directoryItem) => {
 const imageDirectory = directoryItem.type === 'directory' ?
 "/Client/Editor/Tools/Project/DirectoryItem/icon/directory.png" :
 "/Client/Editor/Tools/Project/DirectoryItem/icon/file.png";

 return (
 <ul className="project_container-list" id={directoryItem.name}
 name={directoryItem.name}
 type={directoryItem.type}
 >
 <li className="project_container-list_container"
 onClick={this.getInfo.bind(this, directoryItem)}>
 <div className="project_container-list_container_view">
 {directoryItem.type === 'directory' ?
 <button className="project_container-list_container_nodeButton" type="button"
 onClick={this.expandHeirs}>&#9658;</button> : ''}
 <div className="project_container-list_container_view-directoryNaming"
 data-directoryName={directoryItem.name}
 onClick={this.showContents.bind(this)}>
 <img src={imageDirectory}
 className="project_container-list_container_img" alt=""/>
 <div className="project_container-list_name">
 {directoryItem.name}
 </div>
 </div>
 </div>
 <div className="project_container-list_container_array">
 {directoryItem.arrayOfStructures ?
 this.createStructure(directoryItem.arrayOfStructures) : ''}
 </div>
 </li>
 </ul>
 );
 })
 }
 }
 }

 getInfo(structure: object, event): void {
 const readFile = new CustomEvent('ReadFile', {
 bubbles: true,
 cancelable: true,
 detail: {structure}
 });
 //Тестовый лодер загрузки данных с сервера
 const testLoader = new CustomEvent('LoadStart', {
 bubbles: true,
 cancelable: true,
 detail: {status: true}
 });

 const saveEvent = event.currentTarget;
 if (structure.type === 'directory') {
 this.showContents(null, structure.name);
 }
 else if (structure.type === 'file' && !this.checkStore(structure.name)) {
 const elementStructure = BusinessLogic.getInfoAboutStructute(structure);
 elementStructure.then(response => response.json())
 .then(result => {
 this.props.changeViewer(result.data);
 testLoader.detail.status = false;
 saveEvent.dispatchEvent(testLoader);
 saveEvent.dispatchEvent(readFile);
 });
 } else if (this.checkStore(structure.name)) {
 testLoader.detail.status = false;
 event.target.dispatchEvent(readFile);
 }
 event.target.dispatchEvent(testLoader);

 }

 /!**
 * Проверяем есть ли у нас подобное значение в хранилище ,что бы не делать повторные запросы на БЛ
 * TODO после такого как будут готовы редакторы, нужно будет удалять измененное значение из хранилища
 * @param nameSearchElement
 * @returns {boolean}
 *!/
 checkStore(nameSearchElement: string): boolean {
 return this.props.viewer.some((item) => {
 return item.name === nameSearchElement
 });
 }

 /!**
 * Метод отображения выбранной директории
 * @param directoryProject
 * @returns {[any,any,any,any,any]}
 *!/
 showDirectoryStructureSelectedFolder(directoryProject): object[] {

 if (directoryProject && directoryProject.type === 'directory') {
 {

 directoryProject.arrayOfStructures.sort((a, b) => a.type === 'directory' ? -1 : 1);
 return directoryProject.arrayOfStructures.map((directoryItem) => {
 return (

 <div className="project_container-elementContainer_element"
 onClick={this.getInfo.bind(this, directoryItem)}>
 {directoryItem.type === 'directory' ?
 <img src="/Client/Editor/Tools/Project/DirectoryItem/icon/directory.png"
 className="project_container-elementContainer_element-image" alt=""/> :
 <img src="/Client/Editor/Tools/Project/DirectoryItem/icon/file.png"
 className="project_container-elementContainer_element-image" alt=""/>}
 <div
 className="project_container-elementContainer_element-text">{directoryItem.name}</div>
 </div>

 );
 })

 }

 }
 }

 /!**
 * Метод получения данных с бизнес логики и запись их в state
 **!/
 getDirectory(): void {
 const projectDirectory = BusinessLogic.getDirectoryProject();
 projectDirectory.then(response => response.json())
 .then(result => {
 result.data[0].arrayOfStructures.sort((a, b) => a.type === 'directory' ? -1 : 1);
 this.setState({
 directoryProject: result.data,
 selectedDirectory: result.data[0]
 });
 this.setState({loadData: true});
 });
 }

 showProject() {
 return (
 <div className="project_container">
 <div className="project_container-navigation">
 {this.createStructure(this.state.directoryProject)}
 </div>
 <div className="project_container-elementContainer">
 {this.showDirectoryStructureSelectedFolder(this.state.selectedDirectory)}
 </div>
 </div>
 );
 }

 render() {
 return (
 <div className="project">   {this.state.loadData ? this.showProject() : <FileLoad/>}</div>
 )
 }
 }
 const mapStateToProps = state => {
 return {
 viewer: state.viewer.viewData
 };
 };

 const mapDispatchToProps = {
 changeViewer
 };

 export default connect(mapStateToProps, mapDispatchToProps)(Project);
 */

export default function Project() {
    const [directoryProject, setDirectoryProject] = React.useState<object[]>('');
    const [selectedDirectory, setSelectedDirectory] = React.useState<object[]>('');
    const [loadData, setLoadData] = React.useState<object[]>('');
    const [file, setFile] = React.useState<object[]>('');
    const viewData = useSelector(state => state.viewer.viewData);

    let  dispatch = useDispatch();




    React.useEffect(() => {
        getDirectory();
    }, []);


    /**
     * Метод получения данных с бизнес логики и запись их в state
     **/
    const getDirectory = () => {
        const projectDirectory = BusinessLogic.getDirectoryProject();
        projectDirectory.then(response => response.json())
            .then(result => {
                result.data[0].arrayOfStructures.sort((a, b) => a.type === 'directory' ? -1 : 1);

                setDirectoryProject(result.data);
                setSelectedDirectory(result.data[0]);
                setLoadData(true);
            });
    };

    const showProject = () => {
        return (
            <div className="project_container">
                <div className="project_container-navigation">
                    {createStructure(directoryProject)}
                </div>
                <div className="project_container-elementContainer">
                    {showDirectoryStructureSelectedFolder(selectedDirectory)}
                </div>
            </div>
        );
    };

    /**
     * Метод скрытия/отображения элементов в файловой структуре дерева эелементов
     * @param event
     */
    const expandHeirs = (event) => {

        if (event.target.textContent === "►") {
            event.target.innerHTML = "&#9660;";
            event.target.parentElement.parentElement.childNodes.forEach((item) => {
                if (item.className === 'project_container-list_container_array') {
                    item.classList.add('project_container-list_container_array-visible');
                }
            });
        }
        else {
            event.target.innerHTML = "&#9658;";
            event.target.parentElement.parentElement.childNodes.forEach((item) => {
                if (item.classList.contains('project_container-list_container_array-visible')) {
                    item.classList.remove('project_container-list_container_array-visible');
                }
            });
        }
    };
    /**
     * Метод отображения файловой структуры проекта
     * @param directoryProject
     * @returns {any}
     */
    const createStructure = (directoryProject: object) => {

        if (directoryProject) {
            {
                return directoryProject.map((directoryItem) => {
                    const imageDirectory = directoryItem.type === 'directory' ?
                        "/Client/Editor/Tools/Project/DirectoryItem/icon/directory.png" :
                        "/Client/Editor/Tools/Project/DirectoryItem/icon/file.png";

                    return (
                        <ul className="project_container-list" id={directoryItem.name}
                            name={directoryItem.name}
                            type={directoryItem.type}
                        >
                            <li className="project_container-list_container"
                                onClick={getInfo.bind(null, directoryItem)}>
                                <div className="project_container-list_container_view">
                                    {directoryItem.type === 'directory' ?
                                        <button className="project_container-list_container_nodeButton" type="button"
                                                onClick={expandHeirs}>&#9658;</button> : ''}
                                    <div className="project_container-list_container_view-directoryNaming"
                                         data-directoryName={directoryItem.name}
                                         onClick={showContents}>
                                        <img src={imageDirectory}
                                             className="project_container-list_container_img" alt=""/>
                                        <div className="project_container-list_name">
                                            {directoryItem.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="project_container-list_container_array">
                                    {directoryItem.arrayOfStructures ?
                                        createStructure(directoryItem.arrayOfStructures) : ''}
                                </div>
                            </li>
                        </ul>
                    );
                })
            }
        }
    };

    /**
     * Метод отображения выбранной директории
     * @param directoryProject
     * @returns {[any,any,any,any,any]}
     */
    const showDirectoryStructureSelectedFolder = (directoryProject) => {

        if (directoryProject && directoryProject.type === 'directory') {
            {
                directoryProject.arrayOfStructures.sort((a, b) => a.type === 'directory' ? -1 : 1);
                return directoryProject.arrayOfStructures.map((directoryItem) => {
                    return (

                        <div className="project_container-elementContainer_element"
                             onClick={getInfo.bind(null, directoryItem)}>
                            {directoryItem.type === 'directory' ?
                                <img src="/Client/Editor/Tools/Project/DirectoryItem/icon/directory.png"
                                     className="project_container-elementContainer_element-image" alt=""/> :
                                <img src="/Client/Editor/Tools/Project/DirectoryItem/icon/file.png"
                                     className="project_container-elementContainer_element-image" alt=""/>}
                            <div
                                className="project_container-elementContainer_element-text">{directoryItem.name}</div>
                        </div>

                    );
                })

            }
        }
    };

    /**
     * Метод получения директории по которой кликнул пользователь
     * @param event
     */
    const showContents = (event, name) => {
        const nameDirectoryShare = name ? name : event.target.parentElement.dataset.directoryname;
        let result = getShareDirectory(directoryProject, nameDirectoryShare, []);
        setSelectedDirectory(result[0]);

    };

    /**
     * Метод поиска по файловой структуре элемента (далле можно будет искать список эелемнтов)
     * @param directoryProject
     * @param nameDirectoryShare
     * @param findElementArray переменная куда записываем найденые элементы
     * @returns {any}
     */
    const getShareDirectory = (directoryProject, nameDirectoryShare, findElementArray) => {

        directoryProject.forEach((currentItem) => {
            if (currentItem.name === nameDirectoryShare) {
                findElementArray.push(currentItem);
            }
            else {
                if (currentItem.type === 'directory' && currentItem.arrayOfStructures) {
                    return getShareDirectory(currentItem.arrayOfStructures, nameDirectoryShare, findElementArray) || '';
                }
            }
        });

        return findElementArray;
    };
    useSelector(state =>
        state.viewer.viewData
    );




    const getInfo = (structure: object, event) => {
        const readFile = new CustomEvent('ReadFile', {
            bubbles: true,
            cancelable: true,
            detail: {structure}
        });


        /**
         * Проверяем есть ли у нас подобное значение в хранилище ,что бы не делать повторные запросы на БЛ
         * TODO после такого как будут готовы редакторы, нужно будет удалять измененное значение из хранилища
         * @param nameSearchElement
         * @returns {boolean}
         */
        const checkStore = (nameSearchElement: string) => {
            return viewData.some((item) => {
                return item.name === nameSearchElement
            });
        };

        //Тестовый лодер загрузки данных с сервера
        const loaderEvent = new CustomEvent('LoadStart', {
            bubbles: true,
            cancelable: true,
            detail: {status: true}
        });

        const saveEvent = event.currentTarget;

        if (structure.type === 'directory') {
            showContents(null, structure.name);
        }
        else if (structure.type === 'file' && !checkStore(structure.name)) {
            const elementStructure = BusinessLogic.getInfoAboutStructute(structure);
            elementStructure.then(response => response.json())
                .then(result => {
                    dispatch(changeViewer(result.data));
                    setFile(result.data);
                    loaderEvent.detail.status = false;
                    saveEvent.dispatchEvent(loaderEvent);
                    saveEvent.dispatchEvent(readFile);
                });
        } else if (checkStore(structure.name)) {
            loaderEvent.detail.status = false;
            event.target.dispatchEvent(readFile);
        }
        event.target.dispatchEvent(loaderEvent);

    };

    return (
        <div className="project">   {loadData ? showProject() : <FileLoad/>}</div>
    )
}


