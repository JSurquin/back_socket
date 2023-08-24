const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Importer CORS

const app = express();
app.use(cors()); // Utiliser le middleware CORS

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200", // Assurez-vous que cela correspond à l'URL de votre client Angular
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Un utilisateur s'est connecté");

  // Envoi de l'ID unique du client
  socket.emit("connected", { id: socket.id });

  socket.on("chat message", (data) => {
    console.log("Message reçu:", data);
    data.id = socket.id; // Ajoutez l'ID du socket pour chaque message
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

server.listen(3000, () => {
  console.log("Écoute sur le port 3000");
});
