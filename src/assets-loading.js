var bgPic = new Image();
var brick1Pic = new Image();
var brick2Pic = new Image();
var brick3Pic = new Image();
var brick6Pic = new Image();
var paddlePic = new Image();
var ballPic = new Image();

var imagesToLoad = 0;

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = new Image();
  beginLoadingImage(tilePics[tileCode], fileName);
}

function loadImages() {
  var	imageList	=	[
    {imgNode:paddlePic,	fileName:"paddle.png"},
    {imgNode:brick1Pic, fileName:"brick1.png"},
    {imgNode:brick2Pic, fileName:"brick2.png"},
    {imgNode:brick3Pic, fileName:"brick3.png"},
    {imgNode:brick6Pic, fileName:"brick6.png"},
    {imgNode:ballPic, fileName:"ball.png"},
    {imgNode:bgPic, fileName:"bg.png"},
    ];
    
  imagesToLoad = imageList.length;

  for (img of imageList) {
    beginLoadingImage(img.imgNode,img.fileName);
  }
}

function beginLoadingImage(imgNode, fileName) {
  imgNode.src = "assets/images/" + fileName;
  imgNode.onload = setAssetAsLoadedAndLaunchIfReady();
}

function setAssetAsLoadedAndLaunchIfReady() {
  imagesToLoad--;
  launchIfReady();
}