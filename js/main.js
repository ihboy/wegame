import Player     from './player/index'
import Enemy      from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import DataBus    from './databus'
import TalkBox    from './runtime/talkbox'

let ctx   = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0

    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.clickHandler
    )

    this.bg       = new BackGround(ctx)
    this.player   = new Player(ctx)
    this.gameinfo = new GameInfo()
    this.music    = new Music()
    // this.talkbox  = new TalkBox('r')
    this.bindLoop     = this.loop.bind(this)
    this.hasEventBind = false
    this.hasClickBind = false
    this.talkboxL = new TalkBox('l')
    this.talkboxR = new TalkBox('r')
    this.talkboxFrame = 0
    
    this.talkboxContentArr = ['咦,宝箱', '有什么?', '马蹄金?', '答对了']
    

    this.player.playAnimation(0,true);

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    if ( databus.frame % 300 === 0 ) {

      console.log("refresh emeny")

      databus.enemys = [];
      let enemy = databus.pool.getItemByClass('enemy', Enemy)
      enemy.init(6)
      databus.enemys.push(enemy)
    }
  }

  // 生成对话框背景
  enemyTalkBox() {
    this.talkboxL = new TalkBox('l')
    this.talkboxR = new TalkBox('r')

    // databus.talkboxs.push([talkboxL, talkboxR])

  }

  // 全局碰撞检测
  collisionDetection() {
    let that = this

    // databus.bullets.forEach((bullet) => {
    //   for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
    //     let enemy = databus.enemys[i]

    //     if ( !enemy.isPlaying && enemy.isCollideWith(bullet) ) {
    //       enemy.playAnimation()
    //       that.music.playExplosion()

    //       bullet.visible = false
    //       databus.score  += 1

    //       break
    //     }
    //   }
    // })

    for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
      let enemy = databus.enemys[i]
      // console.log('人物位置：', this.player.x, this.player.y);
      // console.log('宝箱位置：', enemy.x, enemy.y);
      // this.player.visible = true
      if ( this.player.isCollideWith(enemy) ) {
        databus.gameOver = true
        console.log('对话框');
        // databus.talkboxs[0].visible = true
        // this.talkboxL.visible = true
        this.talkboxFrame = 1
        break
      }
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  // touchEventHandler(e) {
  //    e.preventDefault()

  //   let x = e.touches[0].clientX
  //   let y = e.touches[0].clientY

  //   let area = this.gameinfo.btnArea

  //   if (   x >= area.startX
  //       && x <= area.endX
  //       && y >= area.startY
  //       && y <= area.endY  )
  //     this.restart()
  // }

  addClickHandler(e) {
    if (this.talkboxFrame >= 4) {
      this.restart()
      return
    }
    if(this.talkboxL.visible || this.talkboxR.visible) {
      this.talkboxFrame++
    }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)
    // this.talkbox.drawToCanvas(ctx)


    databus.bullets
          .concat(databus.enemys)
          .forEach((item) => {
              item.drawToCanvas(ctx)
            })

    this.player.drawToCanvas(ctx)

    databus.animations.forEach((ani) => {
      if ( ani.isPlaying ) {
        ani.aniRender(ctx)
      }
    })

    if(this.talkboxFrame) {

      if(this.talkboxFrame % 2 == 0) {
        this.talkboxR.drawToCanvas(ctx)
        this.talkboxR.renderTalkBoxContent(ctx, this.talkboxContentArr[this.talkboxFrame-1])
      }else {
        this.talkboxL.drawToCanvas(ctx)
        this.talkboxL.renderTalkBoxContent(ctx, this.talkboxContentArr[this.talkboxFrame - 1])
      }

    }

    // this.gameinfo.renderGameScore(ctx, databus.score)


    // 游戏结束停止帧循环
    if ( databus.gameOver ) {
      // this.gameinfo.renderGameOver(ctx, databus.score)



      // if ( !this.hasEventBind ) {
      //   this.hasEventBind = true
      //   this.touchHandler = this.touchEventHandler.bind(this)
      //   canvas.addEventListener('touchstart', this.touchHandler)
      // }

      if (!this.hasClickBind) {
        this.hasClickBind = true
        this.clickHandler = this.addClickHandler.bind(this)
        
        canvas.addEventListener('touchstart', this.clickHandler, false)

      }
    }else {
 
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if ( databus.gameOver )
      return;

    this.bg.update()

    databus.bullets
           .concat(databus.enemys)
           .forEach((item) => {
              item.update()
            })

    this.enemyGenerate()
    // this.enemyTalkBox()
    this.collisionDetection()

    if ( databus.frame % 20 === 0 ) {
      this.player.shoot()
      this.music.playShoot()
    }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
