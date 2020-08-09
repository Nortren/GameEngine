import * as React from 'react';
import Button from "../../Editor/Controls/Button/Button";
import BusinessLogic from '../../BusinessLogic'

interface IChat {
    userName: string,
    mobile?: boolean
}

/**
 * Компонент пользовательского чата
 * @param props
 * @constructor
 */
export default function Chat() {
    const [messageStore, setMessageStore] = React.useState([]);

    React.useEffect(() => {
        const BL = new BusinessLogic();
        const messageArray = [];

        document.addEventListener("sendMessage", (event) => {
            const inputChatMessage = document.getElementById('ChatInput') as HTMLInputElement;
            const message = inputChatMessage.value;
            inputChatMessage.value = '';
            addMessageInMessageContainer(message);

        });
        BL.getUserMessage(
            (data) => {
                messageArray.push({id: messageArray.length, value: data.message, userName: data.userName});

                setMessageStore([...messageStore, messageArray]);
                console.log(messageArray, messageStore, 'messageArray!!!!!!!');
            }
        )
        ;
        const addMessageInMessageContainer = (message) => {


            const messageContainer = document.getElementById('messageContainer');
            messageContainer.scrollTop = messageContainer.scrollHeight + 100;
            BL.sendUserMessage(message);

        };
    }, []);


    return <ChatMessageArea source={messageStore}/>
}

/**
 * Компонент Чат-контейнер (включает панель ввода текста панель отображения пула сообщений)
 * @param props
 * @constructor
 */
function ChatMessageArea(props) {
    const source = props.source[0] || [];
    return <div className="chat-container">
        <div id="messageContainer" className="chat-container__messageContainer">
            {source.map((item) => (<div className="chat-container__messageContainer-messageBody">
                    <div className="chat-container__messageContainer-senderName"
                         key={'Name_' + item.id}>{item.userName}:
                    </div>
                    <div className="chat-container__messageContainer-senderMessage" key={item.id}>{item.value}</div>
                </div>

            ))}
        </div>
        <div className="chat-container__controlPanel">
            <input autoComplete="off" type="text" id="ChatInput" className="chat-container__controlPanel-message"/>
            <Button options={{
                name: 'sendMessage',
                iconType: 'Check',
                iconSize: '1x',
                id: 2,
                componentArray: [],
                type: 'EditorButton',
                style: {margin: '5px', width: '2em', height: '2em'}
            }}/>
        </div>
    </div>
}
