import * as React from 'react';
import BusinessLogic from '../../BusinessLogic'
import DirectoryItem from "./DirectoryItem/DirectoryItem";

export default class Project extends React.Component {


    constructor(props: object) {
        super(props);
        this.id = props.id;
        this.state = {
            style: {
                height: props.height || '100%',
                width: props.width,
                justifySelf: props.justifySelf,
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

    /**
     * Метод скрытия/отображения элементов в файловой структуре дерева эелементов
     * @param event
     */
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

    /**
     * Метод получения директории по которой кликнул пользователь
     * @param event
     */
    showContents(event, name): void {
        const nameDirectoryShare = name ? name : event.target.parentElement.dataset.directoryname;
        let result = this.getShareDirectory(this.state.directoryProject, nameDirectoryShare, []);
        this.setState({selectedDirectory: result[0]});

    }


    /**
     * Метод поиска по файловой структуре элемента (далле можно будет искать список эелемнтов)
     * @param directoryProject
     * @param nameDirectoryShare
     * @param findElementArray переменная куда записываем найденые элементы
     * @returns {any}
     */
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

    /**
     * Метод отображения файловой структуры проекта
     * @param directoryProject
     */
    createStructure(directoryProject): void {
        if (directoryProject) {
            {
                return directoryProject.map((directoryItem) => {
                    return (
                        <ul className="project_container-list" id={directoryItem.name}
                            name={directoryItem.name}
                            type={directoryItem.type}
                        >
                            <li className="project_container-list_container">

                                <div className="project_container-list_container_view">
                                    {directoryItem.type === 'directory' ?
                                        <button className="project_container-list_container_nodeButton" type="button"
                                                onClick={this.expandHeirs}>&#9658;</button> : ''}
                                    <div className="project_container-list_container_view-directoryNaming"
                                         data-directoryName={directoryItem.name}
                                         onClick={this.showContents.bind(this)}>
                                        {directoryItem.type === 'directory' ?
                                            <img src="/Client/Editor/Tools/Project/DirectoryItem/icon/directory.png"
                                                 className="project_container-list_container_img" alt=""/> :
                                            <img src="/Client/Editor/Tools/Project/DirectoryItem/icon/file.png"
                                                 className="project_container-list_container_img" alt=""/>}
                                        <div className="project_container-list_name">
                                            {directoryItem.name}
                                        </div>
                                    </div>
                                </div>

                                <div className="project_container-list_container_array">
                                    {directoryItem.arrayOfStructures ? this.createStructure(directoryItem.arrayOfStructures) : ''}
                                </div>
                            </li>
                        </ul>


                    );
                })
            }

        }
    }

    getInfo(structure: object) {
        if (structure.type === 'directory') {
            this.showContents(null, structure.name);
        }
        else if (structure.type === 'file'){
            const elementStructure = BusinessLogic.getInfoAboutStructute(structure);
            elementStructure.then(response => response.json())
                .then(result => {
                  console.log(result,123123);
                });
        }
        console.log(structure.name, '___', structure.type);
    }

    /**
     * Метод отображения выбранной директории
     * @param directoryProject
     * @returns {[any,any,any,any,any]}
     */
    showDirectoryStructureSelectedFolder(directoryProject): void {

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

    /**
     * Метод получения данных с бизнес логики и запись их в state
     **/
    getDirectory(): void {
        const projectDirectory = BusinessLogic.getDirectoryProject();
        projectDirectory.then(response => response.json())
            .then(result => {
                result.data[0].arrayOfStructures.sort((a, b) => a.type === 'directory' ? -1 : 1);
                this.setState({
                    directoryProject: result.data,
                    selectedDirectory: result.data[0]
                });
            });
    }

    render() {

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
}





