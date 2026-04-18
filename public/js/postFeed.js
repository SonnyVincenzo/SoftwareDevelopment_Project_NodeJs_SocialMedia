import {Vec2, Vec3, Quaternion, ProjectVertex, ViewVertex} from "./postFeed.lib.js";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ROTATION_FACTOR = 1/75;
const MAX_EXISTING_POST = 20;
const POST_MINIMUM_WIDTH_SHIFT = -500;
const POST_MAXIMUM_WIDTH_SHIFT = -POST_MINIMUM_WIDTH_SHIFT;
const POST_MINIMUM_HEIGHT_SHIFT = -30;
const POST_MAXIMUM_HEIGHT_SHIFT = -POST_MINIMUM_HEIGHT_SHIFT;
const POST_TRANSPARENCY_FACTOR = 6;
const ROTATION_SLOWNESS_FACTOR = 0.985;
const ROTATION_INITIAL_MOMENTUM_HORIZONTAL = 20;
const ROTATION_INITIAL_MOMENTUM_VERTICAL = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*___________________________________________________________
* MOUSE
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
___________________________________________________________*/
class Mouse {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.velocityX = ROTATION_INITIAL_MOMENTUM_HORIZONTAL;
        this.velocityY = ROTATION_INITIAL_MOMENTUM_VERTICAL;
        this.leftClick = false;
        this.leftHandled = false;
        // reserved for right click
        this.rightClick = false;
        this.rightHandled = false;
    }
}
let mouse = new Mouse();

function DecreaseVelocity(mouse){
    mouse.velocityX *= ROTATION_SLOWNESS_FACTOR;
    mouse.velocityY *= ROTATION_SLOWNESS_FACTOR;
    if (Math.abs(mouse.velocityX) < 0.001){
        mouse.velocityX = 0;
    }
    if (Math.abs(mouse.velocityY) < 0.001){
        mouse.velocityY = 0;
    }
}

function UpdateMomentum() {
    DecreaseVelocity(mouse);
    requestAnimationFrame(UpdateMomentum);
}
UpdateMomentum();

let mouseStopTimeout;
let isMouseStopMoving = true;

document.addEventListener('mousemove', (event) => {
    // if mouse stops moving while still holding the left button
    // then we reset the velocity value so the rotation will not be triggerd
    // 5 ms
    clearTimeout(mouseStopTimeout);
     mouseStopTimeout = setTimeout(() => {
        if (mouse.leftClick === true) {
            mouse.velocityX = 0;
            mouse.velocityY = 0;
        }
    }, 5); 
    // only track when holding the left button
    if (mouse.leftClick === true) {
        mouse.dx = (event.clientX - mouse.x);
        mouse.dy = (event.clientY - mouse.y);
        mouse.leftHandled = false;
        // keep rotating follow by the momemtum
        if (Math.abs(mouse.dx) > Math.abs(mouse.velocityX)) {
            mouse.velocityX = mouse.dx;
        }
        if (Math.abs(mouse.dy) > Math.abs(mouse.velocityY)) {
            mouse.velocityY = mouse.dy;
        }
    }
    // update the mouse position as previous postion for the next loop
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

document.addEventListener('mousedown', (event) => {
    if (event.button === 0){
        mouse.leftClick = true;
    } 
    if (event.button === 2){
        mouse.rightClick = true;
    } 
});

document.addEventListener('mouseup', (event) => {
    if (event.button === 0) mouse.leftClick = false;
    if (event.button === 2) mouse.rightClick = false;
});

/*___________________________________________________________
* Draw cube
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
___________________________________________________________*/
// cube vertices in canoncial view
// directx coordinate system
const vertices = [  // x-y-z
    new Vec3(-1, -1, -1),   // left-botton  -near
    new Vec3(1, -1, -1),    // right-botton -near
    new Vec3(1, 1, -1),     // right-top    -near
    new Vec3(-1, 1, -1),    // left-top     -near

    new Vec3(-1, -1, 1),    // left-botton  -far
    new Vec3(1, -1, 1),     // right-botton -far
    new Vec3(1, 1, 1),      // right-top    -far
    new Vec3(-1, 1, 1)      // left-top     -far
];

// cube edges represented by indices
const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // front face
    [4, 5], [5, 6], [6, 7], [7, 4], // back face
    [0, 4], [1, 5], [2, 6], [3, 7]  // connecting edges
];

function TrackBallRotation(dx,dy,array,size){
    // prevent flatten arbitrary axis
    const vDelta2d = new Vec2(dx, dy);
    if (Vec2.Magnitude(vDelta2d) > 0){

        // trackball rotation initialization
        const vInitTrackball = new Vec3(0,0,-1);
        const vFinishTrackball = new Vec3(dx, dy, -1);
        // normal vector of the 2d plane acts as axis
        const vArbitraryAxis = Vec3.CrossProduct(vInitTrackball, vFinishTrackball);
        const vNormalizedArbitraryAxis = Vec3.Normalize(vArbitraryAxis);
        // calculate rotation angle around that arbitrary axis
        // cos(phi) = dot / magnitudeX / magnitudeY
        const dotProductTrackball = Vec3.DotProduct(vInitTrackball, vFinishTrackball);
        const magInitTrackball = Vec3.Magnitude(vInitTrackball);
        const magFinishTrackball = Vec3.Magnitude(vFinishTrackball);
        const cosPhi = dotProductTrackball / magInitTrackball / magFinishTrackball;
        const radianRotation = Math.acos(cosPhi) * ROTATION_FACTOR;
        // get quaternion
        const quaternion = new Quaternion(0,0,0,0,vNormalizedArbitraryAxis, radianRotation);

        // apply rotation
        for (let i = 0; i < size; i++){
            array[i] = Quaternion.Rotate(array[i], quaternion);
        }
    }
}

function Draw(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // rotate only when draging with the mouse
    if (mouse.leftClick === true && mouse.leftHandled === false) {
        // handled shall set to true on the last function that reads it
        // so not here
        // mouse.leftHandled = true;
        TrackBallRotation(mouse.dx, mouse.dy, vertices, 8);
    }
    else {
        TrackBallRotation(mouse.velocityX, mouse.velocityY, vertices, 8);
    }
    

    // apply view matrix + projection matrix + scale + translate
    const projectedVertices = [];
    const fov = 90;
    const aspectRatio = canvas.width / canvas.height;
    const nearPlane = 0;
    const farPlane = 100;
    for (let i = 0; i < 8; i++){
        const halfWidth = canvas.width / 2;
        const halfHeight = canvas.height / 2;
        const viewed = ViewVertex(vertices[i], 4);
        const projected = ProjectVertex(viewed, fov, aspectRatio, nearPlane, farPlane);
        const canoncialToScreen =  new Vec2(projected.x * halfWidth, -projected.y * halfHeight);
        const moveToCenter = new Vec2(canoncialToScreen.x + halfWidth, -canoncialToScreen.y + halfHeight)
        projectedVertices[i] = moveToCenter;
    }

    // draw edges
    // reminder: understand how this works
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    
    for (let edge of edges){
        const p1 = projectedVertices[edge[0]];
        const p2 = projectedVertices[edge[1]];
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
}


// what is this ? and why do we need this ?
// what is this ? and why do we need this ?
// what is this ? and why do we need this ?
function animate() {
    Draw();
    requestAnimationFrame(animate);
}
animate();

/*___________________________________________________________
* Post
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
*============================================================
___________________________________________________________*/

const posts = [];

for (let i = 0; i < MAX_EXISTING_POST; i++) {
    const response = await fetch('/postFeed'); // adjust URL to your endpoint
    const postData = await response.json();

    const maxWidth = canvas.width;
    const maxHeight = canvas.height;
    const element = document.createElement("span");
    element.style.position = "fixed";
    element.style.top = (Math.random() * (maxHeight + POST_MAXIMUM_HEIGHT_SHIFT) - POST_MAXIMUM_HEIGHT_SHIFT / 2) + "px";
    element.style.left = (Math.random() * (maxWidth + POST_MAXIMUM_WIDTH_SHIFT) - POST_MAXIMUM_WIDTH_SHIFT / 2) + "px";
    element.style.speed = (Math.random() * 0.5 + 0.5) + "px";
    element.style.color = "white";
    element.style.backgroundColor = "transparent";
    element.style.fontSize = "30px";
    element.style.userSelect = "none"; // prevent marking 
    element.style.whiteSpace = "nowrap"; // no warp

    // element.textContent  = "test post:" + (Math.random() + 1).toString(36).substring(7);
    element.textContent = postData[i].postTitle;
    posts.push(element);
    document.body.appendChild(element);
}


function ShiftRight(elements, amountPixel) {
    for (let i = 0; i < elements.length; i++){
        const currentLeft = parseFloat(elements[i].style.left);
        const currentSpeed = parseFloat(elements[i].style.speed);
        const randomizedAmountPixel = amountPixel * currentSpeed; 
        let newPos = currentLeft + randomizedAmountPixel;
        if (newPos > canvas.width + POST_MAXIMUM_WIDTH_SHIFT) newPos = 0 + POST_MINIMUM_WIDTH_SHIFT;
        if (newPos < 0 + POST_MINIMUM_WIDTH_SHIFT) newPos = canvas.width + POST_MAXIMUM_WIDTH_SHIFT;
        elements[i].style.left = (newPos) + "px";
    }
}

function ShiftUp(elements, amountPixel) {
    for (let i = 0; i < elements.length; i++){
        const currentTop = parseFloat(elements[i].style.top);
        const currentSpeed = parseFloat(elements[i].style.speed);
        const randomizedAmountPixel = amountPixel * currentSpeed; 
        let newPos = currentTop - randomizedAmountPixel;
        if (newPos > canvas.height + POST_MAXIMUM_HEIGHT_SHIFT) newPos = 0 + POST_MINIMUM_HEIGHT_SHIFT;
        if (newPos < 0 + POST_MINIMUM_HEIGHT_SHIFT) newPos = canvas.height + POST_MAXIMUM_HEIGHT_SHIFT;
        elements[i].style.top = (newPos) + "px";
    }
}

function AdjustTransparencyByRange(elements, v, radius){
    for (let i = 0; i < elements.length; i++){
        const currentLeft = parseFloat(elements[i].style.left);
        const currentTop = parseFloat(elements[i].style.top);
        const vE = new Vec2(currentLeft, currentTop);
        const vDelta = Vec2.Delta(vE, v);
        const range = Vec2.Magnitude(vDelta);
        elements[i].style.opacity = range/radius;
    }
}

function DrawPost(){
    // shift only when draging with the mouse
    if (mouse.leftClick === true && mouse.leftHandled === false) {
        mouse.leftHandled = true;
        const dx = mouse.dx;
        const dy = mouse.dy;
        ShiftRight(posts, dx );
        ShiftUp(posts, -dy );
        const centerScreen = new Vec2(canvas.width / 2, canvas.height / 2);
        AdjustTransparencyByRange(posts, centerScreen, 100 * POST_TRANSPARENCY_FACTOR);
    }
    else {
        const dx = mouse.velocityX;
        const dy = mouse.velocityY;
        ShiftRight(posts, dx );
        ShiftUp(posts, -dy );
        const centerScreen = new Vec2(canvas.width / 2, canvas.height / 2);
        AdjustTransparencyByRange(posts, centerScreen, 100 * POST_TRANSPARENCY_FACTOR);
    }
}

function animatePosts() {
    DrawPost();
    requestAnimationFrame(animatePosts);
}
animatePosts();