import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const colors=[
    new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
    new THREE.MeshBasicMaterial( { color: 0xff00ff } ),
    new THREE.MeshBasicMaterial( { color: 0xffaa00 } ),
    new THREE.MeshBasicMaterial( { color: 0xaaaaaa } ),
    new THREE.MeshBasicMaterial( { color: 0xffff00 } ),
    new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
]

let snake_head = [0,0,0]

document.addEventListener('keydown', (e) => e.key=='q'? chosenSnake = (chosenSnake+1)%3:0);
let chosenSnake = 1;

function draw_cube(x,y,z,c){
    const cube = new THREE.Mesh( geometry, colors[c] )
    cube.position.x = x-snake_head[0];
    cube.position.y = y-snake_head[1];
    cube.position.z = z-snake_head[2];
    scene.add(cube)
}

function displayGS(gs){
    if (!gs['tower']){
        for (let i = 0; i<gs['tower']['words'].length(); i++){
            gs['tower']['words'][i]
            draw_cube
        }
    }
}


async function getState(){
    const token = ''
    const server_url = 'https://games.datsteam.dev/play/snake3d'
    
    const api = '/player/move'
    const url = `${server_url}${api}`
    
    const headers = {
        'X-Auth-Token': token,
        'Content-Type': 'application/json'
    }

    const payload = {
        headers,
        method: "GET",
    };
    
    return fetch(url, payload)
}

let t = 0;
function animate() {
	renderer.render( scene, camera );
    if (t>1000){
        getState()
                .then(data => data.json())
                .then(response =>{
                    displayGS(response)

                })
                .catch(error => console.log(error));
                t = 0
                
    }
    //camera.rotation.y+=0.1
    t++;
}

//camera.rotation.x = 1.5
camera.position.y = 160;
camera.position.z = 300;

const controls = new OrbitControls (camera, renderer.domElement);
controls.target.set( 0, 0, 0 )

renderer.setAnimationLoop( animate );