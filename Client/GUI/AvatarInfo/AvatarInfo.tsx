import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import Button from "../../Editor/Controls/Button/Button";
import BusinessLogic from '../../BusinessLogic'


export default function AvatarInfo(props) {
    const source = props.source;
    const userName = source.userName;
    const [messageStore, setMessageStore] = React.useState([]);

    React.useEffect(() => {

        }
        , []);


    return <AvatarInfoArea mobile={props.mobile} source={{userName}}/>
}
function AvatarInfoArea(props) {
    const source = props.source;
    const userName = source.userName;

    const template = <div className="avatarInfo-container">
        <div className="avatarInfo-container__avatarInfo">
            <div className="avatarInfo-container__avatarInfo-name">
                {userName}
            </div>
            <div className="avatarInfo-container__avatarInfo-infoContainer">
                <span className="avatarInfo-container__avatarInfo-infoContainer_health"/>
                <span className="avatarInfo-container__avatarInfo-infoContainer_energy"/>
            </div>
        </div>
    </div>;
    const mobileTemplate = <div className="avatarInfo-containerMobile">
        <div className="avatarInfo-containerMobile__avatarInfo">
            <div className="avatarInfo-containerMobile__avatarInfo-name">
                {userName}
            </div>
            <div className="avatarInfo-containerMobile__avatarInfo-infoContainer">
                <span className="avatarInfo-containerMobile__avatarInfo-infoContainer_health"/>
                <span className="avatarInfo-containerMobile__avatarInfo-infoContainer_energy"/>
            </div>
        </div>
    </div>;

    return props.mobile ? mobileTemplate : template;
}