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

    const clickTest = (event) => {
        console.log('Canvas Add');
    };

    const imgData = {
        name: 'TestTitle',
        src: 'Client/image/tille.png',
        xCount: 19,
        yCount: 20,
        startCount: 19,
        endCount: 380
    };
    const testImageContainer = null;
    const canvasInit = () => {
        const canvas = document.getElementById("canvasImageCut") as HTMLCanvasElement;

        if (canvas) {
            let drawStatus = false;
            const img = new Image();
            img.src = imgData.src;
            //Тут мы узнаем текущий размер окна где распологается график чтоб отрисовать размеры canvas
            const bodySize = document.getElementsByClassName('toolsList-container')[0] as HTMLCanvasElement;
            const bodySizeWidth = bodySize.offsetWidth;
            const bodySizeHeight = bodySize.offsetHeight;
            canvas.setAttribute('width', bodySizeWidth.toString());
            canvas.setAttribute('height', bodySizeHeight.toString());

            const context = canvas.getContext("2d");

            img.onload = () => {
                //	оператор try..catch используем для обработки ошибок, например если холст не найден
                //	в некоторых случах было замечено ошибочный вызов исключений при получении холста
                try {
                    //	получаем контент холста

                    //TODO расчитать правильный размер
                    const compressionRatioX = (bodySizeWidth / img.width);
                    const compressionRatioY = (bodySizeHeight / img.height);
                    const finishCompression = compressionRatioX > compressionRatioY ? compressionRatioY : compressionRatioX;
                    const imgWidth = finishCompression * img.width;
                    const imgHeight = finishCompression * img.height;
                    const imageCenterPositionX = bodySizeWidth / 2 - imgWidth / 2;
                    const imageCenterPositionY = bodySizeHeight / 2 - imgHeight / 2;
                    context.drawImage(img, imageCenterPositionX, imageCenterPositionY, img.width, img.height);
                    testImageContainer = canvas.toDataURL();

                } catch (err) {
                    //	выводит необходимую ошибку
                    console.log(err, '_Ошибка');
                }
            };

        }
    };

    let testStyle = {backgroundImage: `url(${imgData.src})`, backgroundSize: 'cover'};

    React.useEffect(() => {
        canvasInit();
    }, []);

    React.useEffect(() => {
        if (testImageContainer) {
            testStyle = {backgroundImage: `url(${this.testImageContainer })`, backgroundSize: 'cover'};
        }

    }, [testImageContainer]);

    const template = <div className="toolsList-container">
        <button className="tileList-container__buttonClick" onClick={clickTest}>click</button>
        <canvas id="canvasImageCut"/>
        <div className="tileList-container__item" style={testStyle}>1</div>
        <div className="tileList-container__item">2</div>
        <div className="tileList-container__item">3</div>
        <div className="tileList-container__item">4</div>
        <div className="tileList-container__item">5</div>
    </div>;
    return template;


}
