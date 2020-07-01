import * as React from 'react';


export default function ColorPalette() {
    const [viewFile, setviewFile] = React.useState<object[]>('');


    return (
        <div className="colorPalette_container">
            <ColorPicker/>
        </div>
    );
}


function ColorPicker() {

    React.useEffect(() => {


    }, []);

    const canvas = document.getElementById("colorPicker")  as HTMLCanvasElement;

    if (canvas) {


        const mouse = {
            pageX: function (b) {
                let a, c, d;
                d = b || event;
                return null == d.pageX && null != d.clientX ? (
                    a = document.body,
                        c = document.documentElement,
                        b = c.scrollLeft || a && a.scrollLeft || 0) : d.pageX
            },
            pageY: function (b) {
                let a, c, d;
                d = b || event;
                return null == d.pageX && null != d.clientX ? (a = document.body,
                    c = document.documentElement,
                    b = c.scrollTop || a && a.scrollTop || 0) : d.pageY
            }
        };
        const Obj = {
            positX: function (b) {
                let a, c;
                a = 0;
                c = b.getBoundingClientRect();
                b = document.body;
                a = document.documentElement;
                a = c.left + (a.scrollLeft || b && b.scrollLeft || 0) - (a.clientLeft || b.sclientLeft || 0);
                return Math.round(a)
            },
            positY: function (b) {
                let a, c;
                a = 0;
                c = b.getBoundingClientRect();
                b = document.body;
                a = document.documentElement;
                a = c.top + (a.scrollTop || b && b.scrollTop || 0) - (a.clientTop || b.sclientTop || 0);
                return Math.round(a)
            }
        }
        const picker = {
            V: 100,
            S: 100,
            status: false,

            init: function () {

                const colorLine = {height: 180, width: 20, th: 'arrows', bk: 'block_picker', line: 'line'};
                /*
                 Параметры передаваемые через обьект "s" обьекту "Line"
                 h - высота линни Hue
                 w- ширина линни Hue
                 th  - id для елмента в котором находяться стрелки || ползунок для управление шкалой Hue
                 bk - id блока главного блока с изображение и изменяемым фоном
                 */
                Line.init(colorLine);//отрисовка линий hue и привязка событий

                const block = {block: 'block_picker', circle: 'circle'};
                /*
                 Параметры передаваемые через обьект "b" обьекту "Block"
                 id - id блока выбора цвета (основной блок)
                 c - круг для перемещения по основнoму блоку(для выбора цвета)
                 */
                Block.init(block);// привязка событий к блоку и кругу для управления

                picker.out_color = document.getElementById("out_color");

            }
        };
        const Line = {

            Hue: 0,

            init: function (elem) {

                let canvaLine, cAr, pst, bk, t = 0;

                canvaLine = Line.create(elem.height, elem.width, elem.line, "cLine");

                cAr = document.getElementById(elem.th);
                bk = document.getElementById(elem.bk);

                Line.posit = function (e) {
                    let top, rgb;

                    top = mouse.pageY(e) - pst;
                    top = (top < 0 ) ? 0 : top;
                    top = (top > elem.height ) ? elem.height : top;

                    cAr.style.top = top - 2 + "px";
                    t = Math.round(top / (elem.height / 360));
                    t = Math.abs(t - 360);
                    t = (t == 360) ? 0 : t;

                    Line.Hue = t;

                    bk.style.backgroundColor = "rgb(" + convert.hsv_rgb(t, 100, 100) + ")";
                    picker.out_color.style.backgroundColor = "rgb(" + convert.hsv_rgb(t, picker.S, picker.V) + ")";
                };

                cAr.onmousedown = function () {

                    pst = Obj.positY(canvaLine);

                    document.onmousemove = function (e) {
                        Line.posit(e);
                    }
                };

                cAr.onclick = Line.posit;

                canvaLine.onclick = function (e) {
                    Line.posit(e)
                };

                canvaLine.onmousedown = function () {

                    pst = Obj.positY(canvaLine);

                    document.onmousemove = function (e) {
                        Line.posit(e);
                    }
                };
                document.onmouseup = function () {
                    document.onmousemove = null;
                    cAr.onmousemove = null;

                }
            },


            create: function (height, width, line, cN) {


                canvas.width = width;
                canvas.height = height;

                canvas.className = cN;

                document.getElementById(line).appendChild(canvas);

                Line.grd(canvas, height, width);

                return canvas;
            },

            grd: function (canvas, height, width) {
                let gradient, hue, color;

                const context = canvas.getContext("2d");

                gradient = context.createLinearGradient(width / 2, height, width / 2, 0);

                hue = [[255, 0, 0], [255, 255, 0], [0, 255, 0], [0, 255, 255], [0, 0, 255], [255, 0, 255], [255, 0, 0]];

                for (let i = 0; i <= 6; i++) {

                    color = 'rgb(' + hue[i][0] + ',' + hue[i][1] + ',' + hue[i][2] + ')';

                    gradient.addColorStop(i * 1 / 6, color);

                }
                context.fillStyle = gradient;
                context.fillRect(0, 0, width, height);
            }
        };
        const Block = {

            init: function (elem) {

                let circle, block, colorO, bPstX, bPstY, bWi, bHe, cW, cH, pxY, pxX;

                circle = document.getElementById('circle');
                block = document.getElementById('block_picker');
                cW = circle.offsetWidth;
                cH = circle.offsetHeight;
                bWi = block.offsetWidth - cW;
                bHe = block.offsetHeight - cH;
                pxY = bHe / 100;
                pxX = bWi / 100;

                Block.cPos = function (e) {

                    let top, left, S, V;

                    document.ondragstart = function () {
                        return false;
                    };

                    document.body.onselectstart = function () {
                        return false;
                    };

                    left = mouse.pageX(e) - bPstX - cW / 2;
                    left = (left < 0) ? 0 : left;
                    left = (left > bWi  ) ? bWi : left;

                    circle.style.left = left + "px";

                    S = Math.ceil(left / pxX);

                    top = mouse.pageY(e) - bPstY - cH / 2;
                    top = (top > bHe  ) ? bHe : top;

                    top = (top < 0) ? 0 : top;

                    circle.style.top = top + "px";

                    V = Math.ceil(Math.abs(top / pxY - 100));

                    if (V < 50) circle.style.borderColor = "#fff";

                    else circle.style.borderColor = "#000";

                    picker.S = S;

                    picker.V = V;

                    picker.out_color.style.backgroundColor = "rgb(" + convert.hsv_rgb(Line.Hue, S, V) + ")";
                    let _res = convert.hsv_rgb(Line.Hue, S, V);
                    _res = _res[0].toString(16) + "" + _res[1].toString(16) + "" + _res[2].toString(16);
                    console.log(_res);
                };

                block.onclick = function (e) {
                    Block.cPos(e);
                };
                block.onmousedown = function () {
                    document.onmousemove = function (e) {
                        bPstX = Obj.positX(block);
                        bPstY = Obj.positY(block);
                        Block.cPos(e);
                    }
                };

                document.onmouseup = function () {
                    document.onmousemove = null;
                }
            }

        };
        const convert = {

            hsv_rgb: function (H, S, V) {
                let R, G, B;
                var f, p, q, t, lH;

                S /= 100;
                V /= 100;

                lH = Math.floor(H / 60);

                f = H / 60 - lH;
                p = V * (1 - S);
                q = V * (1 - S * f);
                t = V * (1 - (1 - f) * S);

                switch (lH) {

                    case 0:
                        R = V;
                        G = t;
                        B = p;
                        break;
                    case 1:
                        R = q;
                        G = V;
                        B = p;
                        break;
                    case 2:
                        R = p;
                        G = V;
                        B = t;
                        break;
                    case 3:
                        R = p;
                        G = q;
                        B = V;
                        break;
                    case 4:
                        R = t;
                        G = p;
                        B = V;
                        break;
                    case 5:
                        R = V;
                        G = p;
                        B = q;
                        break;
                }

                return [parseInt(R * 255), parseInt(G * 255), parseInt(B * 255)];
            }

        };
        picker.init();
    }


    return (
        <div className="colorPalette_container-picker">
            <div className="picker" id="primary_block">
                <div id="block_picker">
                    <img
                        src="/Client/Editor/img/bgGradient.png"
                        class="bk_img"/>
                    <span className="circle" id="circle"/>
                </div>
                <div id="line">
                    <div id="arrows">
                        <span className="left_arrow"/>
                        <span className="right_arrow"/>
                    </div>
                </div>
                <div className="out_color-container">
                <span id="out_color" className="out_color"/>
                </div>
            </div>
            <canvas id="colorPicker"/>
        </div>
    );
}