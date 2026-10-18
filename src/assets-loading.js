var bgPic = new Image();
var brick1Pic = new Image();
var brick2Pic = new Image();
var brick3Pic = new Image();
var brick6Pic = new Image();
var paddlePic = new Image();
var ballPic = new Image();

// type -> Image for power-ups that have a sprite configured in ASSETS.powerUpIcons
var powerUpPics = {};

var imagesToLoad = 0;

function loadImages() {
  // Paths come from ASSETS (assets-config.js)
  var imageList = [
    {imgNode:paddlePic, fileName:ASSETS.images.paddle},
    {imgNode:brick1Pic, fileName:ASSETS.images.brick1},
    {imgNode:brick2Pic, fileName:ASSETS.images.brick2},
    {imgNode:brick3Pic, fileName:ASSETS.images.brick3},
    {imgNode:brick6Pic, fileName:ASSETS.images.brick6},
    {imgNode:ballPic,   fileName:ASSETS.images.ball},
    {imgNode:bgPic,     fileName:ASSETS.images.bg},
  ];

  // Optional power-up sprites; a failed load just falls back to the vector drawing
  for (const type in ASSETS.powerUpIcons) {
    if (ASSETS.powerUpIcons[type]) {
      powerUpPics[type] = new Image();
      imageList.push({imgNode:powerUpPics[type], fileName:ASSETS.powerUpIcons[type], optionalType:type});
    }
  }

  imagesToLoad = imageList.length;

  for (const img of imageList) {
    beginLoadingImage(img.imgNode, img.fileName, img.optionalType);
  }
}

function beginLoadingImage(imgNode, fileName, optionalType) {
  imgNode.onload = setAssetAsLoadedAndLaunchIfReady;
  imgNode.onerror = function() {
    // Missing optional icon -> drop it so the vector placeholder is used
    if (optionalType) delete powerUpPics[optionalType];
    setAssetAsLoadedAndLaunchIfReady();
  };
  imgNode.src = ASSETS.imageDir + fileName;
}

function setAssetAsLoadedAndLaunchIfReady() {
  imagesToLoad--;
  launchIfReady();
}
