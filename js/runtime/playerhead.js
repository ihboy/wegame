import Sprite from '../base/sprite'
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const HEAD_SRC = 'images/header.png'
const HEAD_WIDTH     = 50
const HEAD_HEIGHT    = 50

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class PlayerHead extends Sprite {
    constructor() {
      console.log("swswssw")
      // super(TALK_BOX_IMG_SRC_01, TALK_BOX_WIDTH, TALK_BOX_HEIGHT)
      let sY = 10
      let sX = 10
      super(HEAD_SRC, HEAD_WIDTH, HEAD_HEIGHT, sX, sY)
      // this.visible = true
    

      /**
       * 重新开始按钮区域
       * 方便简易判断按钮点击
       */
      this.btnArea = {
        startX: sX,
        startY: sY,
        endX: sX + HEAD_WIDTH,
        endY: sY + HEAD_HEIGHT
      }
    
    }

    

}
