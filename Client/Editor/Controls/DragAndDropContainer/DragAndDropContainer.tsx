import * as React from 'react';
import Button from "../Button/Button";
/**
 * Контейнер DnD
 * Позволяет перемещать вложеные в него компоненты
 * @returns {any}
 * @constructor
 */
export const DragAndDropContainerContext = React.createContext();
export default function DragAndDropContainer(props) {
    const [DnDStatus, setDnDStatus] = React.useState<object[]>(false);
    const [visibleContainer, setVisibleContainer] = React.useState<object[]>(false);

    const changeDnDStatus = ()=>{
        if (DnDStatus) {
            setDnDStatus(false);
        } else {
            setDnDStatus(true);
        }
    };

    React.useEffect(() => {
        document.addEventListener("dragAndDropStatus", (event) => {
            changeDnDStatus();
        });
    },[]);

    React.useEffect(() => {
        const targetContainer = document.querySelector('#' + props.id);

        moveContainerControl(targetContainer);

    }, [DnDStatus]);

    /**
     * Функция изменения координат контейнера
     * @param targetContainer
     */
    const moveContainerControl = (targetContainer) => {
        targetContainer.onmousedown = (event) => {
            if (DnDStatus) {
                const position = getPositionContainer(targetContainer);
                const shiftX = event.pageX - position.left;
                const shiftY = event.pageY - position.top;


                const moveContainer = (event) => {
                    targetContainer.style.left = event.pageX - shiftX + 'px';
                    targetContainer.style.top = event.pageY - shiftY + 'px';
                };

                document.onmousemove = function (event) {
                    moveContainer(event);
                };

                targetContainer.onmouseup = function () {
                    document.onmousemove = null;
                    targetContainer.onmouseup = null;
                };
            }
            event.stopPropagation();
        }
    };
    /**
     * Функция получения правильных координат перемещаемого контейнера
     * @param targetContainer
     * @returns {{top: any, left: any}}
     */
    const getPositionContainer = (targetContainer) => {
        const containerPosition = targetContainer.getBoundingClientRect();
        return {
            top: containerPosition.top + pageYOffset,
            left: containerPosition.left + pageXOffset
        };
    };

    const statusVisible = (status)=>{
        setVisibleContainer(status);
    };

    /**
     * Метод который рендерит переданные в наш компонент сторонние компоненты
     * @returns {any}
     */
    const getComponents = (props) => {
        const component = (
            props.componentArray.map(Component => (
                <DragAndDropContainerContext.Provider value={{DnDStatus, changeDnDStatus}}>
                <Component.componentName key={Component.componentName.name + Component.id} options={Component} statusVisible={statusVisible} dragAndDropStatus={DnDStatus}/>
                </DragAndDropContainerContext.Provider>
            ))
        );
        return component;
    };


    const template =  <div id={props.id} className="dragAndDrop-container">
        {getComponents(props)}
    </div>;
    return template;
}