import * as React from 'react';


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
        this.clickButton = this.clickButton.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    };

    componentDidUpdate() {

    }

    clickButton() {
        console.log(this.props.id);
    }

    render() {


        return (
            <div className="project_container">
                <div className="project_container-elementContainer">
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                    <div className="project_container-elementContainer_element">
                        <div className="project_container-elementContainer_element-image">TETETETET</div>
                        <div className="project_container-elementContainer_element-text">test</div>
                    </div>
                </div>
            </div>
        );
    }
}





