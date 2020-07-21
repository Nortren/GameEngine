import * as React from 'react';
import BusinessLogic from '../../BusinessLogic'
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import FileLoad from '../../Controls/Loader/Loader'
import {
    changeViewer
} from '../../../Store/EditorStore/Viewer/Actions';


interface IDirectoryProject {
    name: string;
    type: string;
    arrayOfStructures: IDirectoryProject[];
}


export default function MapCreator() {
    return <div className="mapCreator-container"><TileList/><ToolsList/></div>
}

/**
 * Метод визуализации спискатайлов собранного на основе атласа
 * @returns {any}
 * @constructor
 */
function TileList() {
    const template = <div className="tileList-container">
        <div className="tileList-container__item">1</div>
        <div className="tileList-container__item">2</div>
        <div className="tileList-container__item">3</div>
        <div className="tileList-container__item">4</div>
        <div className="tileList-container__item">5</div>
        <div className="tileList-container__item">6</div>
        <div className="tileList-container__item">7</div>
        <div className="tileList-container__item">8</div>
        <div className="tileList-container__item">9</div>
        <div className="tileList-container__item">10</div>
        <div className="tileList-container__item">11</div>
        <div className="tileList-container__item">12</div>
        <div className="tileList-container__item">13</div>
        <div className="tileList-container__item">14</div>
        <div className="tileList-container__item">15</div>
        <div className="tileList-container__item">16</div>
        <div className="tileList-container__item">17</div>
        <div className="tileList-container__item">18</div>
        <div className="tileList-container__item">19</div>
        <div className="tileList-container__item">20</div>
    </div>;
    return template;
}
/**
 * Метод визуализации инструментов при работе с редактором карт
 * @returns {any}
 * @constructor
 */

function ToolsList() {
    const template = <div className="toolsList-container">
        <div className="tileList-container__item">1</div>
        <div className="tileList-container__item">2</div>
        <div className="tileList-container__item">3</div>
        <div className="tileList-container__item">4</div>
        <div className="tileList-container__item">5</div>
    </div>;
    return template;


}