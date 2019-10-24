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

  constructor(src, index, data) {

    super(src, BOX_WIDTH, BOX_HEIGHT, sX + 40, sY + 114 + dis * index)
    this.data = data
  }


  fillContent(ctx, obj) {
    console.log(obj)
    ctx.fillStyle = "#333"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    // ctx.textBaseline = "middle"

    let text = obj.data.name + ':' + obj.data.des + ',' + obj.data.score + '分'
    this.wrapText(ctx, text, this.x + 30, this.y + 12, 180, 16)

  }

}