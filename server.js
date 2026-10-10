import express from 'express';
import {WebSocketServer} from 'ws';
import {createServer} from 'node:http';
import fs from 'node:fs';
const app=express();app.use(express.static('public'));
app.get('/health',(_,res)=>res.json({ok:true,game:'MineQuest 3D'}));
const server=createServer(app),wss=new WebSocketServer({server});
const file='world.json';let edits={};try{edits=JSON.parse(fs.readFileSync(file,'utf8'))}catch{}
const types=new Set(['grass','dirt','stone','wood','leaves']);
const send=(ws,data)=>ws.readyState===1&&ws.send(JSON.stringify(data));
function broadcast(data){for(const c of wss.clients)send(c,data)}
let dirty=false;setInterval(()=>{if(dirty){fs.writeFile(file,JSON.stringify(edits),()=>{});dirty=false}},5000);
wss.on('connection',ws=>{send(ws,{type:'world',edits});ws.on('message',raw=>{try{const m=JSON.parse(raw);if(m.type!=='block'||!Number.isInteger(m.x)||!Number.isInteger(m.y)||!Number.isInteger(m.z)||Math.abs(m.x)>128||Math.abs(m.z)>128||m.y< -8||m.y>64||!(m.block===null||types.has(m.block)))return;const k=[m.x,m.y,m.z].join(',');edits[k]=m.block;dirty=true;broadcast({type:'block',x:m.x,y:m.y,z:m.z,block:m.block})}catch{}})});
const port=process.env.PORT||3000;server.listen(port,()=>console.log('MineQuest server on '+port));
process.on('SIGTERM',()=>{fs.writeFileSync(file,JSON.stringify(edits));server.close()});