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
export default function Hierarchy() {
    let dispatch = useDispatch();
    const viewData = useSelector(state => state.gameWorldState.GWState);
    const [sceneObjectList, setSceneObjectList] = React.useState<object[]>('');

    React.useEffect(() => {
        if (Object.keys(viewData).length) {
            setSceneObjectList(viewData.children);
        }
    }, [viewData]);

    /**
     * Клик по item из списка объектов на сцене
     * @param data
     * @param event
     */



    const clickOnElement = (data, event) => {
        dispatch(changeViewer({name: "BusinessLogic.js", type: "file", fileData: "tetetete"}));
        const itemFindClass = 'hierarchy_container_containerItem_view';
        const itemChangeClass= 'hierarchy_container_containerItem_view-selected';
        const buttonFindClass= 'hierarchy_container_containerItem-nodeButton';
        const buttonChangeClass= 'hierarchy_container_containerItem-nodeButton-selected';

        event.stopPropagation();

        changeHiirarchyClassLogickCSS(itemFindClass,itemChangeClass,event);
        changeHiirarchyClassLogickCSS(buttonFindClass,buttonChangeClass,event);
    };

    /**
     * Функция отвечающая которая навешивает стиль "выбранной строки"
     * @param itemFindClass
     * @param itemChangeClass
     * @param event
     */
   const changeHiirarchyClassLogickCSS =(itemFindClass,itemChangeClass,event)=>{
        document.querySelectorAll('.'.concat(itemChangeClass)).forEach((item) => {
            item.classList.remove(itemChangeClass)
        });
        event.currentTarget.querySelector('.'.concat(itemFindClass)).classList.add(itemChangeClass);
    };

    return <ItemChildrenList item={viewData} clickOnElement={clickOnElement} parent={true}/>
}

function ItemChildrenList(props) {
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
    // счетчик объектов на сцене
    // {/*<div>    {(Object.keys(props.item).length && props.parent) ? props.item.children.length : ''}</div>*/}
    return <ul className="hierarchy_container" id={new Date().getSeconds()}
               name={props.item.type}
               type={props.item.type}
    >
        <li className="hierarchy_container_containerItem-list"
            onClick={props.clickOnElement.bind(null, '123')}>
            <div className="hierarchy_container_containerItem_view">
                <button className="hierarchy_container_containerItem-nodeButton" type="button"
                        onClick={expandHeirs}>{(Object.keys(props.item).length && props.item.children.length) ? '►' : ''}</button>
                <img src={imageDirectory}
                     className="project_container-list_container_img" alt=""/>
                <div className="hierarchy_container_containerItem-scene">{props.item.type}


                </div>
            </div>
            <div className="hierarchy_container_containerItem_array">
                {Object.keys(props.item).length ? props.item.children.map((item) => {
                    // return <div className="hierarchy_container_containerItem_array-item">{item.type}</div>
                    return <ItemChildrenList item={item} clickOnElement={props.clickOnElement}/>
                }) : ''}
            </div>
        </li>
    </ul>
}