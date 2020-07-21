import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import {GlobalEditorContext} from '../../Editor';
import FileLoad from '../../Controls/Loader/Loader'
import {
    changeViewer
} from '../../../Store/EditorStore/Viewer/Actions';
/**
 * Крмпонент визуализации состояния сцены и ее компонентов
 * @returns {any}
 * @constructor
 */
export const HierarchyContext = React.createContext();

export default function Hierarchy() {
    let dispatch = useDispatch();
    const viewData = useSelector(state => state.gameWorldState.GWState);
    const [sceneObjectList, setSceneObjectList] = React.useState<object[]>('');

    React.useEffect(() => {
        if (Object.keys(viewData).length) {
            setSceneObjectList(viewData.children);
        }
    }, [viewData.children]);


    /**
     * Клик по item из списка объектов на сцене
     * @param data
     * @param event
     */
    const clickOnElement = (data, event) => {
        //Тестовый лодер загрузки данных с сервера
        const loaderEvent = new CustomEvent('LoadStart', {
            bubbles: true,
            cancelable: true,
            detail: {status: true}
        });
        getInfo(data, event, loaderEvent);
        const itemFindClass = 'hierarchy_container_containerItem_view';
        const itemChangeClass = 'hierarchy_container_containerItem_view-selected';
        const buttonFindClass = 'hierarchy_container_containerItem-nodeButton';
        const buttonChangeClass = 'hierarchy_container_containerItem-nodeButton-selected';

        event.stopPropagation();

        changeHiirarchyClassLogicCSS(itemFindClass, itemChangeClass, event);
        changeHiirarchyClassLogicCSS(buttonFindClass, buttonChangeClass, event);
    };


    const getInfo = (structure, event, loaderEvent) => {

        const readFile = new CustomEvent('ReadFile', {
            bubbles: true,
            cancelable: true,
            detail: {structure: {name: structure.type, type: 'sceneObject', fileData: structure}}
        });
        const saveEvent = event.currentTarget;
        //Включаем лоадер
        saveEvent.dispatchEvent(loaderEvent);
        saveEvent.dispatchEvent(readFile);
        dispatch(changeViewer({name: structure.type, type: 'sceneObject', fileData: structure}));
        loaderEvent.detail.status = false;
        //Выключаем лоадер
        saveEvent.dispatchEvent(loaderEvent);
        // event.target.dispatchEvent(loaderEvent);

    };
    //TODO функция которая в идеале хотела показывать числовую визуализацию прогресса загрузки
    const progressBarStatus = count => {
        if (Object.keys(viewData).length && viewData.children.length === count) {
            document.querySelector('.hierarchy_container-progressBarStatus').classList.remove('hierarchy_container-progressBarStatus');
            document.querySelector('.loader_container').classList.add('hierarchy_container-progressBarStatus')
        }
    };


    const progressBarLength = Object.keys(viewData).length ? viewData.children.length : 0;

    /**
     * Функция отвечающая которая навешивает стиль "выбранной строки"
     * @param itemFindClass
     * @param itemChangeClass
     * @param event
     */
    const changeHiirarchyClassLogicCSS = (itemFindClass, itemChangeClass, event) => {
        document.querySelectorAll('.'.concat(itemChangeClass)).forEach((item) => {
            item.classList.remove(itemChangeClass)
        });
        event.currentTarget.querySelector('.'.concat(itemFindClass)).classList.add(itemChangeClass);
    };
    const renderTest = React.useMemo(() => {
        return <HierarchyContext.Provider value={{progressBarStatus, progressBarLength}}>
            <div className="hierarchy_container hierarchy_container-progressBarStatus">
                <ItemChildrenList item={viewData}
                                  clickOnElement={clickOnElement}
                                  parent={true}
                                  indexKey={0}
                                  key={0}
                                  count={0}
                />
            </div>
            <FileLoad/>
        </HierarchyContext.Provider>
    });

    return renderTest;
}
/**
 * Компонент реазилующий структуру объектов находящихся на сцене
 * @param props
 * @returns {any}
 * @constructor
 */
function ItemChildrenList(props) {
    let {progressBarStatus} = React.useContext(HierarchyContext);
    let keyUUID = props.item.uuid;
    let keyUl = props.indexKey + '_ul';
    let keyLi = props.indexKey + '_li';

    let count = props.count;

    const imageDirectory = "Client/Editor/img/cubeMeshIcon.png";
    /**
     * Метод скрытия/отображения элементов в файловой структуре дерева эелементов
     * @param event
     */
    const expandHeirs = (event) => {

        if (event.target.textContent === "►") {
            event.target.innerHTML = "&#9660;";
            event.target.parentElement.parentElement.childNodes.forEach((item) => {
                if (item.className === 'hierarchy_container_containerItem_array') {
                    item.classList.add('hierarchy_container_containerItem_array-visible');
                }
            });
        }
        else {
            event.target.innerHTML = "&#9658;";
            event.target.parentElement.parentElement.childNodes.forEach((item) => {
                if (item.classList.contains('hierarchy_container_containerItem_array-visible')) {
                    item.classList.remove('hierarchy_container_containerItem_array-visible');
                }
            });
        }
    };

    return <ul key={keyUl} className="hierarchy_container"
               name={props.item.type}
               type={props.item.type}
    >

        <li key={keyLi} className="hierarchy_container_containerItem-list"
            onClick={props.clickOnElement.bind(null, props.item)}>

            <div className="hierarchy_container_containerItem_view">
                <button className="hierarchy_container_containerItem-nodeButton" type="button"
                        onClick={expandHeirs}>{(Object.keys(props.item).length && props.item.children.length) ? '►' : ''}</button>
                <img src={imageDirectory}
                     className="project_container-list_container_img" alt=""/>
                <div className="hierarchy_container_containerItem-scene">{props.item.type}


                </div>
            </div>
            <div className="hierarchy_container_containerItem_array">

                {Object.keys(props.item).length ? props.item.children.map((item, index) => {
                    let indexKey = index + '_' + keyUUID;
                    count++;
                    progressBarStatus(count);
                    // return <div className="hierarchy_container_containerItem_array-item">{item.type}</div>
                    return <ItemChildrenList key={indexKey} indexKey={indexKey} item={item}
                                             clickOnElement={props.clickOnElement} count={count}/>
                }) : ''}
            </div>
        </li>
    </ul>
}