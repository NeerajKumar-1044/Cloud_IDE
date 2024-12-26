import express from 'express';
import http from 'http';
import pty from 'node-pty';
import { Server } from "socket.io";
import fs from 'fs';
import path from 'path';
import cors from 'cors';


export const app = express();
export const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(express.static(path.resolve('./User_Folder')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin.includes('localhost')) return callback(null, true);

        const allowedOrigins = [
            /^https?:\/\/.*\.netlify\.app$/,
            /^https?:\/\/.*\.vercel\.app$/ 
        ];
        if (allowedOrigins.some(regex => regex.test(origin))) return callback(null, true);
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));


const ptyProcess = pty.spawn('bash', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: `${process.cwd()}/User_Folder`,
  env: process.env,
});

ptyProcess.onData((data) => {
  io.emit('Terminal-output', data); 
  // console.log(data);
});

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);

  socket.on('Terminal-input', (data) => {
    ptyProcess.write(data);
    // console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/health-check', (req, res) => {
  res.send('Server is running smoothly');
});

// Get the folder structure
const getFolderStructure = async(path) => {
  const files = fs.readdirSync(path);
  const folderStructure = [];
  files.forEach(async (file) => {
    const stats = fs.statSync(`${path}/${file}`);
    if(stats.isDirectory()) {
      folderStructure.push({
        name: file,
        type: 'folder',
        children: await getFolderStructure(`${path}/${file}`)
      });
    } else {
      folderStructure.push({
        name: file,
        type: 'file'
      });
    }
  });
  return folderStructure;
}  

app.get('/get-folder-structure', async(req, res) => {
  const path_ = path.resolve('./User_Folder');
  const folders = await getFolderStructure(path_);
  // console.log(folders);
  res.send(folders);
});

app.get('/get-file-content', (req, res) => {
  const path_ = path.resolve(`./User_Folder${req.query?.path}`);
  // console.log(path_);
  const content = fs.readFileSync(path_, 'utf-8');
  res.send(content);
});

app.post('/save-file-content', (req, res) => {
  const path_ = path.resolve(`./User_Folder${req.body.path_}`);
  console.log(path_);
  fs.writeFileSync (path_, req.body.data);
  res.send('File saved successfully');
});