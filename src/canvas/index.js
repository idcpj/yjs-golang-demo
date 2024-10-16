import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

// 创建一个 Yjs 文档
const ydoc = new Y.Doc();

// 创建一个共享的 Map 类型
const ymap = ydoc.getMap('shared-canvas');

// 连接到 WebSocket 提供程序
const provider = new WebsocketProvider('ws://localhost:1880/ws', 'my-room', ydoc);

// 获取画布元素
const canvas = document.getElementById('canvas');
canvas.width = 500
canvas.height = 500
const ctx = canvas.getContext('2d');

// 监听画布的鼠标事件
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDrawing);

let drawing = false;
// 修改 draw 函数以记录线条
let lastPoint = { x: 0, y: 0 };

// 开始绘制
function startDrawing(e) {
  drawing = true;
  lastPoint = { x: e.layerX, y: e.layerY };
}

// 结束绘制
function endDrawing(e) {
    if(drawing){
        draw(e);
        drawing = false;
        console.log("drawing",drawing);
    }
}


// 当开始绘制时，清除之前的线条
// 监听 ymap 的变化
ymap.observe((event, transaction) => {
    const lines = ymap.get("lines");
    // console.log("output  lines", lines);
    if (!transaction.local) {
        event.changes.keys.forEach((key) => {

            if (key.action === 'update') {
                const lines = ymap.get('lines');
                if (lines) {
                    
                    ctx.beginPath();
                    lines.forEach((line) => {
                        ctx.moveTo(line.startX, line.startY);
                        ctx.lineTo(line.endX, line.endY);
                    });

                    ctx.stroke();

                }
            }
        });
    }
});





function draw(e) {
  if (!drawing) return;

  const x = e.layerX;
  const y = e.layerY;

  ctx.moveTo(lastPoint.x, lastPoint.y);

  ctx.lineTo(x, y);
  ctx.stroke();


  recordLine(lastPoint.x, lastPoint.y, x, y);
  
  lastPoint = { x, y };

}


// 当绘制时，记录线条
function recordLine(startX, startY, endX, endY) {
    const exist = ymap.has("lines");
    let lines;
    if(!exist){
        lines=[];
    }else{
        lines=ymap.get("lines");
    }
    lines.push({ startX, startY, endX, endY });

    ymap.set("lines",lines);

  }

provider.on('status', (event) => {
  console.log('Connection status:', event.status);
});
