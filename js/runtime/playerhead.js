import Sprite from '../base/sprite'
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const HEAD_SRC = 'images/dog/1.png'
const HEAD_WIDTH     = 60
const HEAD_HEIGHT    = 60

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class PlayerHead extends Sprite {
    constructor() {
      console.log("swswssw")
      // super(TALK_BOX_IMG_SRC_01, TALK_BOX_WIDTH, TALK_BOX_HEIGHT)
      let sY = 30
      let sX = 30
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
