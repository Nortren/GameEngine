import * as React from 'react';
import rootReducer from '../../../Store/Reducers'

export default class Inspector extends React.Component {


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
        this.getReduxState = this.getReduxState.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    };

    componentDidUpdate() {

    }

    getReduxState() {
        console.log(rootReducer.getState());
    }

    render() {


        return (
            <div className="inspector_container">
                <div className="inspector_container-componentsDataContainer">

                </div>
                <div className="inspector_container-buttonAddContainer">
                    <button onClick={this.getReduxState} className="inspector_container-buttonAddContainer_button">Add Component</button>
                </div>
            </div>
        );
    }
}





