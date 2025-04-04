import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );

const loader = new THREE.TextureLoader()

const letters_texture = {}
"абвгдеёжзиклмнопрстуфхцчшщъыьэюя".split("").forEach((l)=>letters_texture[l] = 
    new THREE.MeshBasicMaterial( { color: 0xffffff, map: loader.load('letters/'+l+'.png', (a)=>console.log("Texture '"+l+"' is ready"))} ))

document.addEventListener('keydown', (e) => e.key=='q'? chosenSnake = (chosenSnake+1)%3:0);

function draw_letter(letter, x,y,z){
    const cube = new THREE.Mesh( geometry, letters_texture[letter])
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    scene.add(cube)
}

function draw_word(word, x, y, z, dir){
    let letters = word.split("");
    for (let i=0; i<letters.length; i++){
        draw_letter(letters[i], x, y, z);
        x+=(dir == 1); z+=(dir == 2); y-=(dir == 3);
    }
}

function displayGS(gs){
    //draw_letter('а', 0, 0, 0)
    // if (!gs['tower']){
    //     for (let i = 0; i<gs['tower']['words'].length(); i++){
    //         gs['tower']['words'][i]
    //         draw_cube
    //     }
    // }
}


async function getState(){
    return {}

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
    if (t>100){
        getState()
                //.then(data => data)
                .then(response =>{
                    displayGS(response)

                })
                .catch(error => console.log(error));
                t = 0
                
    }
    //camera.rotation.y+=0.1
    t++;
}

draw_word('онанист', 0, 0, 0, 1)

//camera.rotation.x = 1.5
camera.position.y = 20;
camera.position.z = 30;

const controls = new OrbitControls (camera, renderer.domElement);
controls.target.set( 0, 0, 0 )

renderer.setAnimationLoop( animate );