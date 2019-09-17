import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const TALK_BOX_IMG_SRC_01 = 'images/talkbox01.png'
const TALK_BOX_IMG_SRC_02   = 'images/talkbox02.png'
const TALK_BOX_WIDTH     = 150
const TALK_BOX_HEIGHT    = 120

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class TalkBox extends Sprite {
  constructor(type) {
    // super(TALK_BOX_IMG_SRC_01, TALK_BOX_WIDTH, TALK_BOX_HEIGHT)


    let img_src = type == 'l' ? TALK_BOX_IMG_SRC_02 : TALK_BOX_IMG_SRC_02
    let sY = screenHeight - 230
    let sX = 70
    super(img_src, TALK_BOX_WIDTH, TALK_BOX_HEIGHT, sX, sY)
    
    this.visible = false
  }



}
