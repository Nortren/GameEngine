import * as React from 'react';
import {useDispatch, useSelector, useEffect} from 'react-redux';
import {connect} from 'react-redux';
import {
    changeImageEditor, changeImageEditorStatus
} from '../../../Store/EditorStore/ImageEditor/Actions';
import Button from "../Button/Button";

/**
 * Крмпонент простмотра изображений(TODO редактирования)
 * @returns {any}
 * @constructor
 */
export const HierarchyContext = React.createContext();

export default function ImageEditor(props) {
    const imageEditorStore = useSelector(state => state.imageEditorStore.imageEditorData);
    const imageEditorStatus = useSelector(state => state.imageEditorStore.imageEditorStatus);
    const [selectedTool, setSelectedTool] = React.useState<object[]>('');

    const dispatch = useDispatch();

    React.useEffect(() => {
        const selectedTool = ['pencil', 'dropper', 'brush', 'tint', 'photo', 'bold', 'scissors', 'eraser'];


        const testTool = (event) => {
            console.log(event);
        };
        selectedTool.forEach((toolName) => {
            document.addEventListener(toolName, (event) => {
                setSelectedTool(event.type);
            });
        });


    }, []);

    React.useEffect(() => {


        document.addEventListener("Draw", (event) => {

        });
        document.addEventListener("off", (event) => {
            dispatch(changeImageEditorStatus(false));
        });

        const canvas = document.getElementById("imageEditorCanvas")  as HTMLCanvasElement;
        if (canvas) {
            let drawStatus = false;
            const img = new Image();
            img.src = imageEditorStore;


            //Тут мы узнаем текущий размер окна где распологается график чтоб отрисовать размеры canvas
            const bodySize = document.getElementsByClassName('imageEditor_container-body')[0] as HTMLCanvasElement;
            const bodySizeWidth = bodySize.offsetWidth * 0.8;
            const bodySizeHeight = bodySize.offsetHeight * 0.8;
            canvas.setAttribute('width', bodySizeWidth.toString());
            canvas.setAttribute('height', bodySizeHeight.toString());

            const context = canvas.getContext("2d");

            img.onload = () => {
                //	оператор try..catch используем для обработки ошибок, например если холст не найден
                //	в некоторых случах было замечено ошибочный вызов исключений при получении холста
                try {
                    //	получаем контент холста

                    //TODO расчитать правильный размер
                    const compressionRatioX = (bodySizeWidth / img.width) * 0.9;
                    const compressionRatioY = (bodySizeHeight / img.height) * 0.9;
                    const finishCompression = compressionRatioX > compressionRatioY ? compressionRatioY : compressionRatioX;
                    const imgWidth = finishCompression * img.width;
                    const imgHeight = finishCompression * img.height;
                    const imageCenterPositionX = bodySizeWidth / 2 - imgWidth / 2;
                    const imageCenterPositionY = bodySizeHeight / 2 - imgHeight / 2;
                    context.drawImage(img, imageCenterPositionX, imageCenterPositionY, imgWidth, imgHeight);

                }
                catch (err) {
                    //	выводит необходимую ошибку
                    console.log(err, '_Ошибка');
                }
            };
            canvas.onmousedown = (event) => {
                startDrawing(event);
            };
            canvas.onmousemove = (event) => {
                drawing(event);
            };
            canvas.onmouseup = (event) => {
                drawStatus = false;
            };
            canvas.onmouseout = (event) => {
                drawStatus = false;
            };
            const startDrawing = (event) => {
                drawStatus = true;
                context.beginPath();
                context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
            };

            const drawing = (event) => {
                if (drawStatus) {



                    // Определяем текущие координаты указателя мыши
                    var x = event.pageX - canvas.offsetLeft;
                    var y = event.pageY - canvas.offsetTop;

                    context.strokeStyle = "red";
                    // Рисуем линию до новой координаты

                    context.lineTo(x, y);
                    context.stroke();
                }
            }

        }
    }, [imageEditorStatus]);


    const closeImageEditor = () => {
        dispatch(changeImageEditorStatus(false));
    };


    return imageEditorStatus ? <div className="imageEditor_container">
        <div className="imageEditor_container-header">

        </div>
        <div className="imageEditor_container-body">
            <div className="imageEditor_container-body_editorTools">
                <div className="imageEditor_container-body_editorTools-tools">
                    <Button options={ {
                        name: 'pencil',
                        iconType: 'PencilAlt',
                        iconSize: '2x',
                        id: 2,
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                    <Button options={ {
                        name: 'dropper',
                        iconType: 'Dropper',
                        iconSize: '2x',
                        id: 1,
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                    <Button options={ {
                        name: 'brush',
                        iconType: 'PaintBrush',
                        iconSize: '2x',
                        id: 3,
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                    <Button options={ {
                        name: 'tint',
                        iconType: 'Tint',
                        id: 1,
                        iconSize: '2x',
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                    <Button options={ {
                        name: 'photo',
                        iconType: 'PhotoVideo',
                        iconSize: '2x',
                        id: 1,
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                    <Button options={ {
                        name: 'bold',
                        iconType: 'Bold',
                        id: 2,
                        iconSize: '2x',
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                    <Button options={ {
                        name: 'scissors',
                        iconType: 'Cut',
                        iconSize: '2x',
                        id: 3,
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                    <Button options={ {
                        name: 'eraser',
                        iconType: 'Eraser',
                        iconSize: '2x',
                        id: 3,
                        componentArray: [],
                        type: 'EditorButton',
                        style: {margin: '5px'}
                    }}/>
                </div>
                <Button options={ {
                    name: 'off',
                    iconType: 'PowerOff',
                    iconSize: '2x',
                    id: 1,
                    componentArray: [],
                    type: 'EditorButton',
                    style: {margin: '5px'}
                }}/>
            </div>
            <div className="imageEditor_container-body_canvas">
                <canvas id="imageEditorCanvas"></canvas>
            </div>
        </div>
    </div> : ''
}

