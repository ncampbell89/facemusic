function socket(io) {
    io.on('connection', socket => {
        console.log('user connected')
        socket.emit('connected', 'you are connected')

        socket.on('new message', msg => {
            let currentTime = new Date();
            let newMsg = {
                username: msg.username,
                message: msg.message,
                date: currentTime.toLocaleTimeString()
            }
            socket.emit('message box', newMsg)
        })
        socket.on('disconnect', () => {
            console.log(`user ${socket.id} has been disconnected`)
        })
    })
}
module.exports = socket;