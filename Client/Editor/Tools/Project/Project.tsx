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
        console.log(this.props);
    };

    componentDidUpdate() {

    }

    createStructure(directoryProject) {
        if (directoryProject) {

            return (  <div className="TestArray">{Object.keys(directoryProject).map(directoryItem => (
                directoryProject[directoryItem].type === 'directory' ? this.createStructure(directoryProject[directoryItem]) : this.createDirectory(directoryItem, directoryProject)
            ))}</div>)
        }


    }

    createDirectory(directoryItem, directoryProject) {
        if (directoryItem !== 'name' && directoryItem !== 'type') {
            return (
                <DirectoryItem id={directoryProject[directoryItem].name}
                               name={directoryProject[directoryItem].name}
                               type={directoryProject[directoryItem].type}
                />


            );
        }
        if (directoryItem === 'type') {
            return (
            <DirectoryItem id={directoryProject['type']}
                           name={directoryProject['name']}
                           type={directoryProject['type']}
            >
                {this.createStructure(directoryItem)}
            </DirectoryItem>
            );
        }

    }


    getDirectory() {
        const projectDirectory = BusinessLogic.getDirectoryProject();
        projectDirectory.then(response => response.json())
            .then(result => this.setState({directoryProject: result.data}));
    }

    render() {


        return (
            <div className="project_container">
                <div className="project_container-navigation">
                    <button onClick={this.getDirectory} className="inspector_container-buttonAddContainer_button">Add
                        Directory
                    </button>
                    {this.createStructure(this.state.directoryProject)}
                </div>
                <div className="project_container-elementContainer">
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <img src={'Client/Editor/img/sphere.png'}
                             className="project_container-elementContainer_element-image"/>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>

                </div>
            </div>
        );
    }
}





