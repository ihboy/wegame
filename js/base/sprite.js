/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0, sx = 0, sy = 0, sw = 0, sh = 0) {

    // console.log(imgSrc,width,height);
    
    this.img     = new Image()
    this.img.src = imgSrc

    this.width  = width
    this.height = height

    this.x = x
    this.y = y

    this.sx = sx
    this.sy = sy
    this.sw = width
    this.sh = sh

    this.visible = true
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if ( !this.visible )
      return
    
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height / 2
    // if (!this.visible || !sp.visible)
    if ( !sp.visible )
      return false

    return !!(   spX >= this.x
              && spX <= this.x + this.width + 30
              && spY >= this.y
              && spY <= this.y + this.height  )
  }

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {

    let arrText = text.split('')
    let line = ''

    for(let i = 0; i<arrText.length; i++) {
      let testLine = line + arrText[i]
      let metrics = ctx.measureText(testLine)
      let testWidth = metrics.width

      if(testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, y)
        line = arrText[i]
        y += lineHeight
      }else {
        line = testLine
      }
    }
    ctx.fillText(line, x, y)
  }
}
