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
    const deviceType = props.mobile ? 'dialogPopup-containerMobile' : 'dialogPopup-container';
    const clickButton = (data) => {
        let getData = new CustomEvent(data, {bubbles: true, cancelable: true, detail: {options: {}}});
        document.dispatchEvent(getData);
        setDisplay('none');
    };

    const template = <div className="dialogPopup-containerMobile" style={{display}}>
        <div className={`${deviceType}__dialogPopup`}>
            <div className={`${deviceType}__dialogPopup-textMessage`}>
                {textMessage}
            </div>
            <div className={`${deviceType}__dialogPopup-buttonContainer`}>
                <button className={`${deviceType}__dialogPopup-buttonContainer-button`}
                        onClick={() => {
                            clickButton('ok')
                        }}>
                    Ok
                </button>
                <button className={`${deviceType}__dialogPopup-buttonContainer-button`}
                        onClick={() => {
                            clickButton('cancel')
                        }}>
                    Cancel
                </button>
            </div>
        </div>
    </div>;

    return template;
}
