import * as React from 'react';
import ScrollContainer from '../../Controls/ScrollContainer/ScrollContainer'
import ObjectView from '../ObjectView/ObjectView'

export default class Hierarch extends React.Component {


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
            <div className="hierarch_container">
                <ScrollContainer source={[1,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6]} template={ObjectView} type="vertical" />
            </div>
        );
    }
}





