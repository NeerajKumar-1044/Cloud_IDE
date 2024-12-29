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
    origin: "https://codeforge.netlify.app",
  }
});

app.use(express.static(path.resolve('./User_Folder')));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://codeforge.netlify.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


const ptyProcess = pty.spawn('bash', [], {
  name: 'xterm-color',
  cols: 100,
  rows: 40,
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
    if (data === '\u0003') {
      ptyProcess.kill('SIGINT');
    } else {
      ptyProcess.write(data);
    }
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
  if(path_.endsWith('.json')) {
    res.send(JSON.parse(content));
    return;
  }
  res.send(String(content));
});

app.post('/save-file-content', (req, res) => {
  const path_ = path.resolve(`./User_Folder${req.body.path_}`);
  console.log(path_);
  fs.writeFileSync (path_, req.body.data);
  res.send('File saved successfully');
});