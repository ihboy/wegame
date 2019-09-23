import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const IMG_SRC = 'images/enemy/1.png'

const BOX_WIDTH = 25
const BOX_HEIGHT = 25

const PERSIONAL_WIDTH = 290
const PERSIONAL_HEIGHT = 440
const sX = (screenWidth - PERSIONAL_WIDTH) / 2
const sY = (screenHeight - PERSIONAL_HEIGHT) / 2

export default class Box extends Sprite {

  constructor() {
    super(IMG_SRC, BOX_WIDTH, BOX_HEIGHT, sX + 40, sY + 114)
  }

}