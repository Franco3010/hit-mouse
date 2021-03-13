import './index.css';
import {
  createAnimation,
  createBatch,
  createGameLoop,
  createStage,
  createViewport,
  createViewportAwareInputHandler,
  createWhiteTexture,
  loadAtlas,
  loadTexture,
  PlayMode,
  Vector2
} from 'gdxjs';
import { time } from 'console';

// WebGL
const stage = createStage();
const canvas = stage.getCanvas();
const viewport = createViewport(canvas, 50, 100);
let count = 0
const inputHandler = createViewportAwareInputHandler(canvas, viewport);
let store = {
  x: 5,
  y: 5
}
let score = 0;
let Realscore = "";
let hitBoss = 0
let hitted = 1

const init = async () => {
  // const stage = createStage();
  // const canvas = stage.getCanvas();

  // const viewport = createViewport(canvas, 50, 100);

  const gl = viewport.getContext();
  const camera = viewport.getCamera();



  const batch = createBatch(gl);
  const whiteTex = createWhiteTexture(gl);
  const moleImg = await loadTexture(gl, './mole.png');
  const number1 = await loadTexture(gl, './1.png');
  const number2 = await loadTexture(gl, './2.png');
  const number3 = await loadTexture(gl, './3.png');
  const number4 = await loadTexture(gl, './4.png');
  const number5 = await loadTexture(gl, './5.png');
  const number6 = await loadTexture(gl, './6.png');
  const number7 = await loadTexture(gl, './7.png');
  const number8 = await loadTexture(gl, './8.png');
  const number9 = await loadTexture(gl, './9.png');
  const number0 = await loadTexture(gl, './0.png');
  const scoreImg = await loadTexture(gl, './score.png');


  const background = await loadTexture(gl, './background.png');
  const mainAtlas = await loadAtlas(gl, './enemy.atlas', {});
  const runRegions = mainAtlas.findRegions('boss_projectile_A');
  const runRegions1 = mainAtlas.findRegions('boss_die');
  const runAnimation1 = createAnimation(0.4, runRegions1)
  const runAnimation = createAnimation(0.1, runRegions);


  const moles: { x1: number; y: number }[] = [];
  let indexMemo = 0;
  let indexMole = 0;
  const DROP_RATE = 4;
  let accumulate = 0;//?
  const mole_SIZE = 10;

  let oldstore = {
    x: 0,
    y: 0
  }
  let signal = 1
  let drawSignal = 0;
  let stateTime = 0;//?
  let accumulateScore = 0;
  gl.clearColor(0, 0, 0, 1);
  createGameLoop(delta => {

    accumulate += delta;



    if (accumulate > DROP_RATE) {
      accumulate = 0;

      moles.push({
        x1: Math.random() * 50,
        y: 15 / Math.random(),


      });

      signal = 0


    }
    // for (let mole of moles) {
    //   let index = moles.indexOf(mole)
    //   if (mole.x1 <= 5 ||
    //     mole.y >= 90 ||
    //     mole.x1 >= 40 ||
    //     mole.y <= 10) {
    //     moles.splice(index, 1)

    //   }
    // }

    gl.clear(gl.COLOR_BUFFER_BIT);
    batch.setProjection(camera.combined);
    batch.begin();
    batch.draw(whiteTex, 0, 0, 50, 100);
    batch.draw(background, 0, 0, 50, 100);
    stateTime += delta;
    for (let mole of moles) {
      if (hitBoss == 0) {
        runAnimation1
          .getKeyFrame(stateTime, PlayMode.LOOP)
          .draw(batch, mole.x1, mole.y, 10, 10);
      }
      else {
        runAnimation
          .getKeyFrame(stateTime, PlayMode.LOOP)
          .draw(batch, mole.x1, mole.y, 10, 10);

      }

      // batch.draw(
      //   moleImg,
      //   mole.x1,
      //   mole.y,
      //   mole_SIZE,
      //   mole_SIZE
      // );
      if (signal == 0) {
        store.x = mole.x1
        store.y = mole.y
        signal = 1
      }


      setTimeout(function () {


        moles.splice(0, 1)


      }, 2000)
    }








    indexMemo = 1;

    // batch.draw(scoreImg, 2, 0, 10, 10)
    Realscore = score.toString();
    for (var i = Realscore.length - 1; i >= 0; i--) {
      switch (Realscore[i]) {
        case "0":
          batch.draw(number0, 10 + 2 * i, 0, 2, 2)
          break;
        case "1":
          batch.draw(number1, 10 + 2 * i, 0, 2, 2)
          break;
        case "2":
          batch.draw(number2, 10 + 2 * i, 0, 2, 2)
          break;
        case "3":
          batch.draw(number3, 10 + 2 * i, 0, 2, 2)
          break;
        case "4":
          batch.draw(number4, 10 + 2 * i, 0, 2, 2)
          break;
        case "5":
          batch.draw(number5, 10 + 2 * i, 0, 2, 2)
          break;
        case "6":
          batch.draw(number6, 10 + 2 * i, 0, 2, 2)
          break;
        case "7":
          batch.draw(number7, 10 + 2 * i, 0, 2, 2)
          break;
        case "8":
          batch.draw(number8, 10 + 2 * i, 0, 2, 2)
          break;
        case "9":
          batch.draw(number9, 10 + 2 * i, 0, 2, 2)
          break;

      }

    }






    batch.setColor(0.4, 0.4, 0.4, 1);

    batch.setColor(1, 1, 1, 1);




    batch.end();






  });

};


window.addEventListener("click", function (e) {

  let targetY = inputHandler.getTouchedWorldCoord().y;
  const targetX = inputHandler.getTouchedWorldCoord().x;


  if (targetX <= store.x + 6 &&
    targetX >= store.x + 2.7 &&
    targetY >= store.y + 1.5 &&
    targetY <= store.y + 5.2
  ) {
    score++
    console.log(hitBoss)
    hitBoss = 1
    store.x = 3
    store.y = 3

  }

  this.setTimeout(function () {
    hitBoss = 0
  }, 1400)

})

window.addEventListener("touchstart", function (e) {
  let targetY = inputHandler.getTouchedWorldCoord().y;
  const targetX = inputHandler.getTouchedWorldCoord().x;
  let touchX = e.touches[0].screenX
  let touchY = e.touches[0].screenY
  touchX = targetX
  touchY = targetY


  if (touchX <= store.x + 6 &&
    touchX >= store.x + 2.7 &&
    touchY >= store.y + 1.5 &&
    touchY <= store.y + 5.2
  ) {
    score++
    console.log(score)
    hitBoss = 1

    store.x = 3
    store.y = 3

  }
  this.setTimeout(function () {
    hitBoss = 0
  }, 1400)

})

init();

/**
 * 1. Typescript
 * 2. WebGL
 * 3. Async/await, promise
 */
