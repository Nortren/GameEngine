import * as React from 'react';
import BusinessLogic from '../../BusinessLogic'
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import FileLoad from '../../Controls/Loader/Loader'
import {
    changeViewer
} from '../../../Store/EditorStore/Viewer/Actions';

interface IImageFromAtlas {
    width: number;
    height: number;
    positionX: number;
    positionY: number;
}

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

    const countTile = 364;
    const countX = 19;
    const countY = 20;


    const tileURLArray = [];


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


            const context = canvas.getContext("2d");


            img.onload = () => {
                //	оператор try..catch используем для обработки ошибок, например если холст не найден
                //	в некоторых случах было замечено ошибочный вызов исключений при получении холста
                try {
                    //	получаем контент холста

                    let countingX = 0;
                    let countingY = 0;

                    for (let i = 0; i < countTile; i++) {

                        if (countingX === countX) {
                            countingX = 0;
                            countingY++;
                        }
                        countingX++;

                        const imageFromAtlas = parseTextureAtlas(img, 19, 20, countingX, countingY);
                        canvas.setAttribute('width', (imageFromAtlas.width).toString());
                        canvas.setAttribute('height', (imageFromAtlas.height).toString());
                        context.drawImage(img, imageFromAtlas.positionX, imageFromAtlas.positionY, imageFromAtlas.width, imageFromAtlas.height, 0, 0, imageFromAtlas.width, imageFromAtlas.height);

                        tileURLArray.push(canvas.toDataURL());
                    }

                    return tileURLArray;
                } catch (err) {
                    //	выводит необходимую ошибку
                    console.log(err, '_Ошибка');
                }
            };

        }
    };

    /**
     *
     * Метод вычисляющий размер тайла знаяих количество в кадре
     * просто создовая сетку равносторонних прямоугольников
     * @param image
     * @param countX количество кадров по оси X
     * @param countY количество кадров по оси Y
     * @param startX с какого кадра начинаем строить по X
     * @param startY с какого кадра начинаем строить по Y
     */
    const parseTextureAtlas = (image: ImageData, countX: number, countY: number, startX: number, startY: number): IImageFromAtlas => {

        const imageFromAtlas = {width: 0, height: 0, positionX: 0, positionY: 0};

        imageFromAtlas.width = image.width / countX;
        imageFromAtlas.height = image.height / countY;
        imageFromAtlas.positionX = imageFromAtlas.width * startX;
        imageFromAtlas.positionY = imageFromAtlas.height * startY;

        return imageFromAtlas;
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


    React.useEffect(() => {
        {tileURLArray.forEach((tile)=>{

            console.log(tile);


        })}

    }, [tileURLArray]);


    const template = <div className="toolsList-container">
        {/*<button className="tileList-container__buttonClick" onClick={clickTest}>click</button>*/}
        <canvas id="canvasImageCut"/>
        {/*        <div className="tileList-container__item" style={testStyle}>1</div>
         <div className="tileList-container__item">2</div>
         <div className="tileList-container__item">3</div>
         <div className="tileList-container__item">4</div>
         <div className="tileList-container__item">5</div>*/}

        {/*<div className="tileList-container__item" style={testStyle}>1</div>*/}
    </div>;
    return template;


}
