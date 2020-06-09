import * as React from 'react';
import {connect} from 'react-redux';

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




