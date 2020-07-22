import * as React from 'react';
import Button from "../../Controls/Button/Button";
interface IDialogPopup {
    textMessage: string;
    mobile: boolean;
}

/**
 * Компонент диалогового окна
 * @param props
 * @constructor
 */
export default function DialogPopup(props: IDialogPopup) {
    const [visible, setVisible] = React.useState<object[]>(props.visible);
    React.useEffect(() => {
        console.log(visible);
    }, [visible]);

    const textMessage = props.textMessage;
    const mobile = props.mobile;
    return <DialogPopupContainer textMessage={textMessage} mobile={mobile} visible={visible}/>
}
/**
 * Компонент контейнер пользовательского меню
 * @param props
 * @constructor
 */
function DialogPopupContainer(props) {
    let visible = props.visible ? 'display:flex' : 'display:none';
    const textMessage = props.textMessage;
    const buttonSize = props.mobile ? '1x' : '2x';
    const buttonMargin = props.mobile ? '0' : '5px';
    const buttonType = props.mobile ? '' : 'EditorButton';


    const template = <div className="dialogPopup-container" style={{visible}}>
        <div className="dialogPopup-container__dialogPopup">
            <div className="dialogPopup-container__dialogPopup-textMessage">
                {textMessage}
            </div>
            <div className="dialogPopup-container__dialogPopup-buttonContainer">
                <Button options={ {
                    name: 'ok',
                    iconSize: buttonSize,
                    id: 2,
                    componentArray: [],
                    type: buttonType,
                    style: {margin: buttonMargin}
                }}/>
                <Button options={ {
                    name: 'cancel',
                    iconSize: buttonSize,
                    id: 2,
                    componentArray: [],
                    type: buttonType,
                    style: {margin: buttonMargin}
                }}/>
            </div>
        </div>
    </div>;

    const mobileTemplate = <div className="dialogPopup-containerMobile" style={{visible}}>
        <div className="dialogPopup-containerMobile__dialogPopup">
            <div className="dialogPopup-containerMobile__dialogPopup-textMessage">
                {textMessage}
            </div>
            <div className="dialogPopup-containerMobile__dialogPopup-buttonContainer">
                <Button options={ {
                    name: 'sendMessage',
                    iconType: 'HandRock',
                    iconSize: buttonSize,
                    id: 2,
                    componentArray: [],
                    type: buttonType,
                    style: {margin: buttonMargin}
                }}/>
                <Button options={ {
                    name: 'sendMessage',
                    iconType: 'Child',
                    iconSize: buttonSize,
                    id: 2,
                    componentArray: [],
                    type: buttonType,
                    style: {margin: buttonMargin}
                }}/>
            </div>
        </div>
    </div>;

    return props.mobile ? mobileTemplate : template;
}
