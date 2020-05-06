import * as React from 'react';


export default class TopMenu extends React.Component {


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
    }

    componentDidMount() {

    };

    componentDidUpdate() {

    }

    render() {


        return (
            <div className="topMenu_container">
                123
            </div>
        );
    }
}





