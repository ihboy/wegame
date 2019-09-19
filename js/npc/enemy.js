import Animation from '../base/animation'
import DataBus   from '../databus'

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 60
const imgArr = [
    '1.png',
    '2.png',
    '3.png'
]


const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {

  constructor(obj,r) {
      // let _ENEMY_IMG_SRC = obj.ENEMY_IMG_SRC;
      console.log(r);
      var ENEMY_IMG_SRC = "images/enemy/" + imgArr[r];
      super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT);
  }

  init(enemyList) {
    this.x = this.width + window.innerWidth;
    this.y = window.innerHeight - 120;
    this[__.speed] = 6
    this.visible = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }

  // 每一帧更新子弹位置
  update() {
    this.x -= 2
    // 对象回收
    if ( this.x > window.innerWidth + this.width )
      databus.removeEnemey(this)
  }
}
