import * as React from 'react';
import '../Client/projectLibrary.css'

import EngineInitialization from "./EngineInitialization/EngineInitialization";
export default class App extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const border = {border: '1px solid black'};
        return (
            <div>
              <EngineInitialization/>
            </div>
        )
    }


}
