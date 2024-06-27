
const io = require("socket.io")();
const socketapi = {
    io: io
};


const messagemodel = require("./models/messageschema")
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
    
    
socket.on("sony",async function(messageObject) {
//  console.log(messageObject);
await messagemodel.create({
    receiver: messageObject.receiver,
    sender: messageObject.sender,
    text: messageObject.text
})

        const sender = await User.findOne({
            username: messageObject.sender
        })
        const receiver = await User.findOne({
            username:messageObject.receiver
        })
   

        const messagePacket = {
            sender: sender,
            receiver: receiver,
            text: messageObject.text
        };
        console.log(messagePacket);
        // console.log(messagePacket);

        socket.to(receiver.socketId).emit('max', messagePacket)
        
     })
})




module.exports = socketapi;