import * as React from 'react';


export default class DirectoryItem extends React.Component {


    constructor(props: object) {
        super(props);
        this.id = props.id;
        this.type = props.type;
        this.name = props.name;
        this.state = {
            style: {
                height: props.height || '100%',
                width: props.width,
                justifySelf: props.justifySelf,
            },
        };
    }

    componentDidMount() {
        console.log(this.props);
    };

    componentDidUpdate() {

    }

    render() {


        return (
            <div className="project_item">
                    {/*{this.type === 'directory' ? <div  className="project_item-directory">{this.name}</div> : <div className="project_item-file">{this.name}</div>}*/}
                    {this.type === 'directory' ?  <img src="/Client/Editor/Tools/Project/DirectoryItem/icon/directory.png" className="project_item-directory" alt=""/> :
                        <img src="/Client/Editor/Tools/Project/DirectoryItem/icon/file.png" className="project_item-file" alt=""/>}
                 <div className="project_item-name">{this.name}</div>
            </div>
        );
    }
}





