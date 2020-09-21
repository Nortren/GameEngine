import * as React from 'react';
import BusinessLogic from '../../BusinessLogic'
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import Button from "../../Controls/Button/Button";

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

interface IImageData{
    name: string;
    src: string;
    startPosition: number
    endPosition: number
    xCount: number
    yCount: number
}

export default function MapCreator() {


    return <div className="mapCreator-container"><ToolsList/><TileList/></div>
}

/**
 * Метод визуализации спискатайлов собранного на основе атласа
 * @returns {any}
 * @constructor
 */
function ToolsList() {
    const toolsButtonArray = [
        {name: 'mouse', iconType:'MousePointer'},
        {name: 'brush', iconType:'faPaintBrush'},
        {name: 'dropper', iconType:'Bold'},
        {name: 'dropper', iconType:'ExpandAlt'},
        {name: 'dropper', iconType:'ExpandArrowsAlt'},
        {name: 'dropper', iconType:'Wrench'},
        {name: 'dropper', iconType:'Cut'},
        {name: 'dropper', iconType:'Save'},
        {name: 'dropper', iconType:'Map'},
        {name: 'dropper', iconType:'HandRock'},
        {name: 'dropper', iconType:'SlidersH'},
        {name: 'dropper', iconType:'Tint'},
        {name: 'dropper', iconType:'Paperclip'},
        {name: 'dropper', iconType:'PencilAlt'},
        {name: 'dropper', iconType:'PhotoVideo'},
        {name: 'dropper', iconType:'Hammer'},
        {name: 'dropper', iconType:'FolderPlus'},
        {name: 'dropper', iconType:'ObjectUngroup'},
        ];

    const template = <div className="toolsList-container">

        {toolsButtonArray.map((button)=>{
            return    <div className="toolsList-container__item">
                <Button options={{
                    name: button.name,
                    iconType: button.iconType,
                    iconSize: '3x',
                    id: 1,
                    border: 'none'
                }}/>
            </div>
        })}


    </div>;
    return template;
}

/**
 * Метод визуализации инструментов при работе с редактором карт
 * @returns {any}
 * @constructor
 */

function TileList() {
    const [toolsImg, setToolsImg] = React.useState<string[]>([]);
    const imgData = {
        name: 'TestTitle',
        src: 'Client/image/tille.png',
        xCount: 19,
        yCount: 20,
        startPosition: 16,
        endPosition: 379
    };

    React.useEffect(() => {
        canvasInit(imgData).then((imgUrlArray) => {
            setToolsImg(imgUrlArray);
        })
    }, []);

    const template = <div className="tileList-container">
        <canvas id="canvasImageCut"/>
        {toolsImg.map((item) => {
            const tileContainerStyle = {backgroundImage: `url(${item})`, backgroundSize: 'cover'};
            return <button className="toolsList-container_imageContainer" style={tileContainerStyle}></button>
        })}
    </div>;
    return template;


}
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


/**
 * Метод инициализации и отрисовки canvas по заданным параметрам
 * @param imgData
 * @returns {Array}
 */
const canvasInit = (imgData:IImageData): Promise<string[]> => {

    const countX = imgData.xCount;
    const countY = imgData.yCount;
    const startPosition = imgData.startPosition;
    const endPosition = imgData.endPosition;
    const countTile = (countX * countY) - startPosition - (countX * countY - endPosition); // Вычесляем сколько элементов нам нужно показать (общее количество за вычетов стартовой позиции и конечной позиции)


    const tileURLArray = [];
    const canvas = document.getElementById("canvasImageCut") as HTMLCanvasElement;

    if (canvas) {
        const img = new Image();
        img.src = imgData.src;
        const context = canvas.getContext("2d");
        return new Promise((resolve) => {
            img.onload = () => {
                try {
                    let countingX = startPosition;
                    let countingY = 0;
                    for (let i = 0; i < countTile; i++) {

                        if (countingX === countX) {
                            countingX = 0;
                            countingY++;
                        }

                        const imageFromAtlas = parseTextureAtlas(img, 19, 20, countingX, countingY);
                        canvas.setAttribute('width', (imageFromAtlas.width).toString());
                        canvas.setAttribute('height', (imageFromAtlas.height).toString());
                        context.drawImage(img, imageFromAtlas.positionX, imageFromAtlas.positionY, imageFromAtlas.width, imageFromAtlas.height, 0, 0, imageFromAtlas.width, imageFromAtlas.height);

                        tileURLArray.push(canvas.toDataURL());
                        countingX++;
                    }
                    resolve(tileURLArray);

                } catch (err) {
                    //	выводит необходимую ошибку
                    console.log(err, '_Ошибка');
                }
            };
        })
    }
};