import * as React from 'react';

interface IAvatarInfo {
    userName:string,
    mobile?: boolean
}

/**
 * Компонент визуализирующий пользовательскую информацию (здоровье,энергия и т.д)
 * @param props
 * @constructor
 */
export default function AvatarInfo(props: IAvatarInfo) {
    const userName = props.userName;
    return <AvatarInfoArea mobile={props.mobile} userName={userName}/>
}
/**
 * Компонент контейнер пользовательского меню
 * @param props
 * @constructor
 */
function AvatarInfoArea(props) {
    const userName = props.userName;

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
