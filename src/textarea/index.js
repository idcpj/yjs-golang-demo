import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// 创建一个 Yjs 文档
const ydoc = new Y.Doc();

console.log('Client ID:', ydoc.clientID);

// 创建一个共享的文本类型
const ytext = ydoc.getText('shared-text');

// 连接到 WebSocket 提供程序
const provider = new WebsocketProvider('ws://192.168.0.50:1880/ws', 'my-room', ydoc);

// 获取文本区域元素
const textarea = document.getElementById('editor');
// 将 ytext 绑定到文本区域
ytext.observe((event, transaction) => {
  const cursorPosition = textarea.selectionStart;

  // 更新文本区域的值，但只在变更不是由本地客户端引起的情况下
  if (!transaction.local) {
    // 应用远程变更到文本区域
    textarea.value = ytext.toString();
    
    // 保持光标位置（这可能需要更复杂的逻辑来处理所有情况）
    textarea.setSelectionRange(cursorPosition, cursorPosition);
  }
});

// 监听文本区域的输入事件
textarea.addEventListener('input', (event) => {
  const cursorPosition = textarea.selectionStart;
  
  if (event.inputType === 'insertText') {
    ytext.insert(cursorPosition - 1, event.data);
  } else if (event.inputType === 'deleteContentBackward') {
    ytext.delete(cursorPosition, 1);
  } else {
    // 对于其他类型的输入，可能需要更复杂的逻辑
    ytext.delete(0, ytext.length);
    ytext.insert(0, textarea.value);
  }

  textarea.setSelectionRange(cursorPosition, cursorPosition);
});

// 当连接状态改变时更新 UI
provider.on('status', event => {
  console.log("Connection status:", event.status);
});

// 当文档同步完成时
provider.on('synced', (isSynced) => {
  console.log("Document synced:", isSynced);
  if (isSynced) {
    console.log("Remote document content:", ytext.toString());
    textarea.value = ytext.toString();
  }
});

// 监听awareness更新
provider.awareness.on('change', changes => {
  console.log('Awareness update:', changes);
  // 这里可以处理其他客户端的状态更新，比如光标位置等
});

// abca
