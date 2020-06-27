import * as React from 'react';
import BusinessLogic from '../../BusinessLogic'
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import FileLoad from '../../Controls/Loader/Loader'
import {
    changeViewer
} from '../../../Store/EditorStore/Viewer/Actions';


interface IDirectoryProject {
    name: string;
    type: string;
    arrayOfStructures: IDirectoryProject[];
}


interface IStructureSelectedFolder {
    clickOnElement(structure: object, event: Event): void;
    directoryProject: IDirectoryProject;

}
interface IStructure {
    clickOnElement(structure: object, event: Event): void;
    data: IDirectoryProject;
    showContents(event: Event, name: string): void;
}

export default function Project() {
    const [directoryProject, setDirectoryProject] = React.useState<object[]>('');
    const [selectedDirectory, setSelectedDirectory] = React.useState<object[]>('');
    const [loadData, setLoadData] = React.useState<object[]>('');
    const [file, setFile] = React.useState<object[]>('');
    const viewData = useSelector(state => state.viewer.viewData);

    let dispatch = useDispatch();


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
                    <CreateStructure data={directoryProject} clickOnElement={getInfo} showContents={showContents}/>
                </div>
                <div className="project_container-elementContainer">
                    <ShowDirectoryStructureSelectedFolder directoryProject={selectedDirectory}
                                                          clickOnElement={getInfo}/>
                </div>
            </div>
        );
    };

    /**
     * Метод получения директории по которой кликнул пользователь
     * @param event
     * @param name
     */
    const showContents = (event: Event, name: string) => {
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


    const getInfo = (structure: IDirectoryProject, event) => {
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

/**
 * Компонент отображения выбранной директории
 * @param options
 * @returns {[any,any,any,any,any]}
 * @constructor
 */
function ShowDirectoryStructureSelectedFolder(options: IStructureSelectedFolder) {

    if (options.directoryProject && options.directoryProject.type === 'directory') {
        {
            options.directoryProject.arrayOfStructures.sort((a, b) => a.type === 'directory' ? -1 : 1);
            return React.useMemo(()=> options.directoryProject.arrayOfStructures.map((directoryItem, index) => {
                const image = directoryItem.type === 'directory' ?
                    "/Client/Editor/Tools/Project/DirectoryItem/icon/directory.png" :
                    "/Client/Editor/Tools/Project/DirectoryItem/icon/file.png";

                let keyIndex = index + 'project_container-elementContainer_element';
                return (

                    <div key={keyIndex} className="project_container-elementContainer_element"
                         onClick={options.clickOnElement.bind(null, directoryItem)}>
                        <img src={image}
                             className="project_container-elementContainer_element-image" alt=""/>
                        <div
                            className="project_container-elementContainer_element-text">{directoryItem.name}</div>
                    </div>
                );
            }),options.directoryProject.arrayOfStructures)
        }
    }
}
/**
 * Компонент отображения файловой структуры проекта
 * @param options
 * @constructor
 */
function CreateStructure(options: IStructure) {
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
    if (options.data) {
        {
            return React.useMemo(()=>  options.data.map((directoryItem, index) => {
                const imageDirectory = directoryItem.type === 'directory' ?
                    "/Client/Editor/Tools/Project/DirectoryItem/icon/directory.png" :
                    "/Client/Editor/Tools/Project/DirectoryItem/icon/file.png";
                let keyIndexUl = index + '_project_container-list_' + directoryItem.name;
                let keyIndexLi = index + '_project_container-list_container_' + directoryItem.name;
                let keyIndexStructure = index + '_createStructure_' + directoryItem.name;
                return (
                    <ul key={keyIndexUl} className="project_container-list" id={directoryItem.name}
                        name={directoryItem.name}
                        type={directoryItem.type}
                    >
                        <li key={keyIndexLi} className="project_container-list_container"
                            onClick={options.clickOnElement.bind(null, directoryItem)}>
                            <div className="project_container-list_container_view">
                                {directoryItem.type === 'directory' ?
                                    <button className="project_container-list_container_nodeButton" type="button"
                                            onClick={expandHeirs}>&#9658;</button> : ''}
                                <div className="project_container-list_container_view-directoryNaming"
                                     data-directoryname={directoryItem.name}
                                     onClick={options.showContents}>
                                    <img src={imageDirectory}
                                         className="project_container-list_container_img" alt=""/>
                                    <div className="project_container-list_name">
                                        {directoryItem.name}
                                    </div>
                                </div>
                            </div>
                            <div className="project_container-list_container_array">
                                {directoryItem.arrayOfStructures ?
                                    <CreateStructure
                                        key={keyIndexStructure}
                                        data={directoryItem.arrayOfStructures}
                                        clickOnElement={options.clickOnElement}
                                        showContents={options.showContents}/> : ''}
                            </div>
                        </li>
                    </ul>
                );
            }),options.data)
        }
    }
}