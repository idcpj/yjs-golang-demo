# Yjs Golang Demo 项目

这是一个使用 Y.Doc 和 WebsocketProvider 实现的实时协作文本编辑器示例。该项目展示了如何使用 Y.Doc 创建一个共享文本类型，并通过 WebsocketProvider 连接到 WebSocket 服务器，以实现多个客户端之间的实时文本同步。

## 项目结构

* `dist/index.html`: 项目的 HTML 文件，包含文本编辑器和 WebSocket 连接的脚本。
* `src/index.js`: 项目的 JavaScript 文件，实现了 Y.Doc 和 WebsocketProvider 的连接和文本同步逻辑。
* `vite.config.js`: Vite 配置文件，用于构建和打包项目。

## 项目特点

* 实时文本同步：多个客户端之间的文本实时同步，确保所有客户端看到的文本内容是一致的。
* 光标位置保持：在文本编辑器中，光标位置会根据文本内容的变化而自动调整，确保用户的编辑体验不受影响。
* awareness 更新监听：监听其他客户端的状态更新，例如光标位置的变化，可以用于实现更多的实时协作功能。


## 使用方法

1. 运行 `go run main.go` 启动 Golang 服务端。
2. 运行 `npm run dev` 启动客户端
3. 打开多个浏览器窗口,访问启动的端口,即可看到实时协作文本编辑器的示例。



## 项目依赖

* `y.Doc`: Y.Doc 是一个实时文档编辑器，用于创建和管理文档。
* `WebsocketProvider`: WebsocketProvider 是一个 WebSocket 连接提供者，用于连接到 WebSocket 服务器，实现实时文本同步。
* `vite`: vite 是一个构建工具，用于快速构建和打包项目。

