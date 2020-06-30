import * as React from 'react';




export default function ColorPalette() {
    const [viewFile, setviewFile] = React.useState<object[]>('');


    return (
        <div className="colorPalette_container">
            ColorPalette
            <ColorPaletteLine/>
        </div>
    );
}

function ColorPaletteLine() {
    const canvas = document.getElementById("colorPaletteLine")  as HTMLCanvasElement;

    if (canvas) {

        const context = canvas.getContext("2d");
        const gradient = context.createLinearGradient(360/2,40,360/2,0);

        const hue = [[255,0,0],[255,255,0],[0,255,0],[0,255,255],[0,0,255],[255,0,255],[255,0,0]];//цвета на шкале hue в rgb

        for (let i=0; i <= 6;i++){

            const color = 'rgb('+hue[i][0]+','+hue[i][1]+','+hue[i][2]+')';

            gradient.addColorStop(i*1/6, color);

        }

        context.fillStyle = gradient;

        context.fillRect(0,0, 360 ,40);
    }

    return (
        <div className="colorPalette_container-line">
          <canvas id="colorPaletteLine"></canvas>
        </div>
    );
}
function ColorPicker() {

    const canvas = document.getElementById("colorPaletteLine")  as HTMLCanvasElement;

    if (canvas) {

        const context = canvas.getContext("2d");
        canvas.width = 300;
        canvas.height = 300;


    }

    return (
        <div className="colorPalette_container-picker">
            <canvas id="colorPicker"></canvas>
        </div>
    );

}