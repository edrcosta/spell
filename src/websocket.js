// export default class SpellWebSocketClient{
//     webSocket
//     initialize = (url, protocols) => {
//         return new Promise((resolve, reject) => {
//             this.webSocket = new WebSocket(url, protocols);
//             this.webSocket.onopen = () => { 
//                 console.log('Websocket connected to', url)
//                 resolve() 
//             }
//             this.webSocket.onerror = () => { 
//                 console.log('Websocket error')
//                 reject() 
//             }

//             this.webSocket.onmessage = function (event) {
//                 console.log('>>recebeu', event.data);
//             }
//         })
//     }

//     send = (data) => {
//         this.webSocket.send(data)
//     }
// }