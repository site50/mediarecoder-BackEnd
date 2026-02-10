const express = require(`express`);
const cors = require(`cors`);
const WebSocket = require(`ws`);

const wss = new WebSocket.Server({ port: 3001 }, () => {
    console.log(`websocket running on ws://localhost:3001`)
});

const fakeTextTranslate = (text) => {
    return text.split(``).join(``)
}

wss.on(`connection`, (ws) => {
    console.log(`client connected`)
    ws.on(`message`, (message) => {
        try {
            const data = JSON.parse(message)
            if (data.text) {
                const translation = fakeTextTranslate(data.text)

                ws.send(JSON.stringify({ translation }))
            }

        } catch (err) {
            console.error(`invalid message:`, message)

        }
    })
    ws.on(`close`, () => console.log(`disconnected`))
})