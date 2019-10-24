import Sprite from '../base/sprite'
// import HttpService from './service/httpService'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg_03.png'
const BG_WIDTH = 290
const BG_HEIGHT = 440
const sX = (screenWidth - BG_WIDTH) / 2
const sY = (screenHeight - BG_HEIGHT) / 2

export default class Personal extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT, sX, sY)

    this.visible = false

    this.closeBtn = {
      startX: sX + 75,
      startY: sY + BG_HEIGHT - 70,
      endX: sX + 35 + 180,
      endY: sY + BG_HEIGHT -40
    }
    this.closeBtn2 = {
      startX: sX + 260,
      startY: sY + 30,
      endX: sX + 35 + 260,
      endY: sY + 70
    }

  }

}