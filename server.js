let express=require('express')
let app=express()
let http=require('http').createServer(app)
let io=require('socket.io')(http)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/board.html")
})

app.get('/admin',(req,res)=>{
    res.sendFile(__dirname+"/public/admin.html")
})

io.on('connection',(socket)=>{
    console.log("newConnection established");
    socket.on('disconnect',()=>{
        console.log('socket disconnected')
    })
    socket.on("message",(message)=>{
        io.emit('boardContent',message)
    })
})

http.listen(3000,()=>{
    console.log('server started')
})