
const io = require("socket.io")();
const socketapi = {
    io: io
};
const User = require("./models/userschema")
// Add your socket.io logic here!
io.on("connection", function (socket) {
    console.log("A user connected");

    socket.on("join", async function (username) {
        await User.findOneAndUpdate({
            username,
        }
            ,
            {
                socketId: socket.id
            })
    })


    socket.on("disconnect", async function () {
        await User.findOneAndUpdate({
            socketId: socket.id
        },
            {
                socketId: ""
            }
        )
    })
    // console.log(socket.id);

    // io.emit("max","server")

    // socket.on("sony",(msg)=>{

    //     socket.broadcast.emit("sony",function(msg){
    //     console.log(msg);
    // })








})




module.exports = socketapi;