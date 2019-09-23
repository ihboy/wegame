import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const TALK_BOX_IMG_SRC_01 = 'images/talkbox01.png'
const TALK_BOX_IMG_SRC_02   = 'images/talkbox02.png'
const TALK_BOX_WIDTH     = 100
const TALK_BOX_HEIGHT    = 80

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class TalkBox extends Sprite {
  constructor(type) {
    let img_src = type == 'l' ? TALK_BOX_IMG_SRC_01 : TALK_BOX_IMG_SRC_02
    let sY = screenHeight - 200
    let sX = type == 'l' ? 60 : 200
    super(img_src, TALK_BOX_WIDTH, TALK_BOX_HEIGHT, sX, sY)
    this.type = type
    
    // this.visible = false
  }
   
  renderTalkBoxContent(ctx, text) {
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    this.wrapText(
      ctx,
      text,
      this.type == 'l' ? 80 : 230,
      screenHeight - 160,
      TALK_BOX_WIDTH,
      20
    )

  }


}
