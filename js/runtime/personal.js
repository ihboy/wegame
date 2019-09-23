import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg_03.png'
const BG_WIDTH = 290
const BG_HEIGHT = 440
const sX = (screenWidth - BG_WIDTH) / 2
const sY = (screenHeight - BG_HEIGHT) / 2

const IMG = 'images/enemy/1.png'

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



    // this.fillContent(ctx);
  }

  fillContent(ctx, data) {
    // if(!data.length){
    //   return 
    // }

    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    let sL = sX + 20;
    let sT = sY + 100;
    let src = "images/enemy/1.png"

    let text = '山药: 健脾，补肺，固肾，益精。治脾虚泄泻，久痢，虚劳咳嗽，消渴，遗精、带下，小便频数'
    this.wrapText(ctx, text, sX + 160, sY + 126, 180, 16)

    for (var i=0;i< 1; i++) {
      // let item = data[i]

      let img = new Image()
      img.src = IMG
      img.onload = function() {
        
        ctx.drawImage(
          img,
          sL, sT, 60, 60
        )
  
        // ctx.fillText(
        //   '山药',
        //   screenWidth / 2 - 40,
        //   screenHeight / 2 - 100 + 175
        // )

      }

    }


  }

}