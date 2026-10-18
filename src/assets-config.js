// Central asset manifest.
// Every image / sound path used by the game lives here, so swapping art or audio
// only means editing this file (or replacing the files at these paths).

const ASSETS = {
  // Folder that all entries in `images` and `powerUpIcons` are relative to.
  imageDir: 'assets/images/',

  // Core sprites. Keys map to the global Image variables in assets-loading.js.
  images: {
    paddle: 'paddle.png',
    brick1: 'brick1.png',
    brick2: 'brick2.png',
    brick3: 'brick3.png',
    brick6: 'brick6.png',
    ball:   'ball.png',
    bg:     'bg.png',
  },

  // Optional power-up icons (drawn ~18x18 px).
  // null = use the built-in vector placeholder; set a file name to use a sprite.
  powerUpIcons: {
    fireball:    null,
    superpaddle: null,
    slowball:    null,
    extralife:   null,
  },

  // Sound paths WITHOUT extension; ".mp3" / ".ogg" is appended automatically.
  sounds: {
    hit:           'assets/sounds/hit',
    miss:          'assets/sounds/miss',
    bonus:         'assets/sounds/bonus',
    powerUpPickup: 'assets/sounds/bonus', // placeholder: reuses the bonus sound
  },

  music: 'assets/sounds/music',
};
