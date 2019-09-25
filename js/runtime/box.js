import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BOX_WIDTH = 25
const BOX_HEIGHT = 25

const PERSIONAL_WIDTH = 290
const PERSIONAL_HEIGHT = 440
const sX = (screenWidth - PERSIONAL_WIDTH) / 2
const sY = (screenHeight - PERSIONAL_HEIGHT) / 2
const dis = 40
export default class Box extends Sprite {

  constructor(src, index) {

    super(src, BOX_WIDTH, BOX_HEIGHT, sX + 40, sY + 114 + dis * index)

  }


  fillContent(ctx, index) {
    // if(!data.length){
    //   return 
    // }

    ctx.fillStyle = "#333"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    // ctx.textBaseline = "middle"
    let sL = sX + 20;
    let sT = sY + 100;
    let src = "images/enemy/1.png"

    let text = '山药: 健脾，补肺，固肾，益精。' + index + '个'
    this.wrapText(ctx, text, sX + 70, sY + 126 + dis * index, 180, 16)

  }

}