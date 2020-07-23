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
    const textMessage = props.textMessage;
    const mobile = props.mobile;
    return <DialogPopupContainer textMessage={textMessage} mobile={mobile}/>
}
/**
 * Компонент контейнер пользовательского меню
 * @param props
 * @constructor
 */
function DialogPopupContainer(props) {
    const [display, setDisplay] = React.useState<string>('flex');
    const textMessage = props.textMessage;
    const clickButton = (data) => {
        let getData = new CustomEvent(data, {bubbles: true, cancelable: true, detail: {options: {}}});
        document.dispatchEvent(getData);
        setDisplay('none');
    };

    const template = <div className="dialogPopup-container" style={{display}}>
        <div className="dialogPopup-container__dialogPopup">
            <div className="dialogPopup-container__dialogPopup-textMessage">
                {textMessage}
            </div>
            <div className="dialogPopup-container__dialogPopup-buttonContainer">
                <button className="dialogPopup-container__dialogPopup-buttonContainer-button"
                        onClick={ () =>{clickButton('ok')}}>
                    Ok
                </button>
                <button className="dialogPopup-container__dialogPopup-buttonContainer-button"
                        onClick={() =>{clickButton('cancel')}}>
                    Cancel
                </button>
            </div>
        </div>
    </div>;

    const mobileTemplate = <div className="dialogPopup-containerMobile" style={{display}}>
        <div className="dialogPopup-containerMobile__dialogPopup">
            <div className="dialogPopup-containerMobile__dialogPopup-textMessage">
                {textMessage}
            </div>
            <div className="dialogPopup-containerMobile__dialogPopup-buttonContainer">
                <button className="dialogPopup-containerMobile__dialogPopup-buttonContainer-button"
                        onClick={ () =>{clickButton('ok')}}>
                    Ok
                </button>
                <button className="dialogPopup-containerMobile__dialogPopup-buttonContainer-button"
                        onClick={() =>{clickButton('cancel')}}>
                    Cancel
                </button>
            </div>
        </div>
    </div>;

    return props.mobile ? mobileTemplate : template;
}
