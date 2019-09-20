import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg_03.png'
const BG_WIDTH = 290
const BG_HEIGHT = 440

export default class Personal extends Sprite {
  constructor() {
    let sX = (screenWidth - BG_WIDTH) / 2
    let sY = (screenHeight - BG_HEIGHT) / 2
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT, sX, sY)
    console.log(sX, sY)
    this.visible = false

    this.closeBtn = {
      startX: sX + 77,
      startY: sY + 360,
      endX: sX + 77 + 16,
      endY: sY + 360 + 25

    }
  }



}