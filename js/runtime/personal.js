import Sprite from '../base/sprite'

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
    console.log(sX, sY)
    this.visible = false

    this.closeBtn = {
      startX: screenWidth - sX - 35,
      startY: sY + 35,
      endX: screenWidth - sX,
      endY: sY + 35 + 25

    }

  }

  fillText(ctx, data) {
    // if(!data.length){
    //   return 
    // }

    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    let sL = 0;
    let sT = 0;
    let src = "images/enemy/1.png"

    for (var i=0;i< 1; i++) {
      // let item = data[i]
      console.log(ctx)
      ctx.drawImage(
        src,
        sL, sT, 60, 60
      )

      ctx.fillText(
        '山药',
        screenWidth / 2 - 40,
        screenHeight / 2 - 100 + 175
      )
    }


  }

}