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


    expandHeirs(event) {

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

    showContents(event) {
        const nameDirectoryShare = event.target.parentElement.dataset.directoryname;
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


    createStructure(directoryProject) {
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

    createStructureElement(directoryProject) {
        if (directoryProject && directoryProject.type === 'directory') {
            {


                return directoryProject.arrayOfStructures.map((directoryItem) => {
                    return (

                        <div className="project_container-elementContainer_element">
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

    getDirectory() {
        const projectDirectory = BusinessLogic.getDirectoryProject();
        projectDirectory.then(response => response.json())
            .then(result => {
                this.setState({directoryProject: result.data,
                    selectedDirectory:result.data[0] });
            });
    }

    render() {


        return (
            <div className="project_container">
                <div className="project_container-navigation">
                    {/*<button onClick={this.getDirectory} className="inspector_container-buttonAddContainer_button">Add*/}
                    {/*Directory*/}
                    {/*</button>*/}
                    {this.createStructure(this.state.directoryProject)}
                </div>
                <div className="project_container-elementContainer">
                    {this.createStructureElement(this.state.selectedDirectory)}
                </div>
            </div>
        );
    }
}





