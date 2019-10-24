import Player     from './player/index'
import Enemy      from './npc/enemy'
import BackGround from './runtime/background'
import Box from './runtime/box'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import DataBus    from './databus'
import Tool    from './tool'
import TalkBox    from './runtime/talkbox'
import HttpService from './service/httpService'
import PlayerHead from './runtime/playerhead'


import Personal from './runtime/personal'

let ctx   = canvas.getContext('2d')
let databus = new DataBus()

/**
 *
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0
    this.userLogin()
    this.enemyList = new Array();
    var _this = this;
    HttpService.getAll({
        successFun(res){
          console.log("道具列表",res);
          if(res && res.statusCode == 200){
              _this.enemyList = res.data;
          }
        },
        failFun(err){
            console.log(err)
        }
    })
    
  }
  userLogin(){
    var that = this;
    wx.login({
      success (res) {
        if (res.code) {
          HttpService.login({
            data : { code : res.code},
            successFun(res){
              console.log(res);
              that.userid = res.data.data.userid;
              that.restart();

            },
            failFun(err){
              console.log(err);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
  getMyCenterData(){
    let that = this
    HttpService.myCenter({
      data: {
        id: that.userid,
      },
      successFun: function (data) {
        console.log("用户中心", data);
        that.centerData = data.data;

        // // 清除上一局的动画
        // window.cancelAnimationFrame(this.aniId);

        // that.aniId = window.requestAnimationFrame(
        //   that.bindLoop,
        //   canvas
        // )
        // databus.goods = data.data.obsList;
      },
      failFun: function () {
        console.log("获取用户中心数据失败");
      },
    })
  }
  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.clickHandler
    )
    canvas.removeEventListener(
      'touchmove',
      this.touchMoveHandler
    )

    this.bg           = new BackGround(ctx)
    this.player       = new Player(ctx)
    this.gameinfo     = new GameInfo()
    this.music        = new Music()
    this.playerHead   = new PlayerHead()
    this.box          =  new Box()
    this.tool         = new Tool()
    this.bindLoop     = this.loop.bind(this)
    this.hasEventBind = false
    this.hasClickBind = false
    this.personal     = new Personal(ctx)
    this.talkboxFrame = 0
    this.talkboxL     = new TalkBox('l')
    this.talkboxR     = new TalkBox('r')
    this.talkboxContentArr = []
    this.showBoxLength     = 5
    this.touchStart        = {}
    this.moveLine          = 0
    this.startLine         = 0
    this.player.playAnimation(0,true)

    //获取个人中心
    this.getMyCenterData()

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


      databus.enemys = [];
      let enemy = databus.pool.getItemByClass('enemy', Enemy, this.enemyList)

      enemy.init();
      databus.enemys.push(enemy)
      this.round =   enemy.round;
    }
  }

  // 生成获取的资源
  boxGenerate() {
    // if (databus.goods.length && databus.goods.length >= this.enemyList.length) {
    //   return;
    // }
    if(!(this.centerData&&this.centerData.obsList.length>=1)){
      return;
    }
    let length = 4 || this.centerData.obsList.length
    for (var i = 0; i < length; i++) {
      let item = this.centerData.obsList[i]
      let y = i + 1
      let src = item.imgUrl
      // let src = 'images/enemy/'+y+'.png'
      databus.goods.push(new Box(src, i, item))
      // databus.goods.push( new Box(src, i, {}) )
    }
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
      // console.log('宝箱位置：', enemy.x, enemy.y);F
      // this.player.visible = true
      if ( this.player.isCollideWith(enemy) ) {

          console.log(this.round);

          var _obj =   this.enemyList[this.round];
          console.log("当前碰撞对象为",_obj);

          HttpService.setScore({
              data:{
                  "obsid":_obj.properties.id,//障碍物id
                  "obsName":_obj.properties.name,//障碍物名称
                  "userid": that.userid,//用户系统id
                  "score": _obj.properties.score//得分--障碍物重量
              },
              successFun:ret=>{

              },
              failFun:ret=>{

              },
          })
          // this.player.stop();
          // this.visible = false;
          // this.isPlaying = true
          this.player.stop();
          this.player.visible = false;
          this.player = null;
          this.player = new  Player(ctx);
          databus.gameOver = true
          // console.log('对话框');
          this.talkboxFrame = 1
          this.talkboxContentArr = []
          this.enemyList[this.round].speechList.map(item =>  {
            this.talkboxContentArr.push(item.master)
            this.talkboxContentArr.push(item.materail)
           })
          // console.log(this.enemyList[this.round], '----')
          this.personal.visible = false
          break
      }
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
     e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (   x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY  )
      this.restart()
  }

  addClickHandler(e) {
    e.preventDefault()
      var _this = this;
    //对话框切换显示
    if(databus.gameOver){
      if (this.talkboxFrame >= this.talkboxContentArr.length) {
          this.restart()
          return
      }
      if (this.talkboxL.visible || this.talkboxR.visible) {
          this.talkboxFrame++
      }
    }else{
      // console.log("需要触发个人中心");
      
      let x = this.touchStart.x = e.touches[0].clientX
      let y = this.touchStart.y = e.touches[0].clientY

      //显示玩家中心
      let area = this.playerHead.btnArea;
      let closeBtn = this.personal.closeBtn;
      console.log(x, y , closeBtn)
      let userid = this.userid;
      var _this = this;
      if (x >= area.startX && x <= area.endX && y >= area.startY && y <= area.endY   && !this.personal.visible){
        
        this.personal.visible = true
        console.log('显示个人中心------')
        databus.gamePause = true;   //需要将游戏暂停
        this.player.stop();
        this.player.visible = true;
        this.player = new Player();

      }
      // else if (this.personal.visible) {
      if (this.personal.visible && x >= closeBtn.startX && x <= closeBtn.endX && y >= closeBtn.startY && y <= closeBtn.endY) {
        this.startLine = 0
        this.personal.visible = false
        console.log('关闭个人中心------')
        databus.gamePause = false;   //游戏继续
        this.player.playAnimation(0,true);    //人物继续跑动
      }


    }
  }

  scrollHandler(e) {
    if (this.personal.visible) {
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      let ratio = 2
      this.moveLine = Math.floor((y - this.touchStart.y) / ratio)

      //向上滚动
      if(this.moveLine > 0 ) {
        if (-this.moveLine + this.startLine < 0) {
          this.startLine = 0
        }else {
          this.startLine = this.moveLine - this.startLine
        }
      }
      //向下滚动
      if(this.moveLine < 0) {
        if (-this.moveLine + this.startLine > databus.goods.length - this.showBoxLength) {
          this.startLine = databus.goods.length - this.showBoxLength
        }else {
          this.startLine = this.startLine + -this.moveLine
        }        
      }
    }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)
    this.playerHead.drawToCanvas(ctx)

      databus.bullets
          .concat(databus.enemys)
          .forEach((item) => {
            // console.log('item', item)
              item.drawToCanvas(ctx)
            })

    this.player.drawToCanvas(ctx)

    databus.animations.forEach((ani) => {
      if ( ani.isPlaying ) {
        ani.aniRender(ctx)
      }
    })

    if (this.personal.visible) {
      this.personal.drawToCanvas(ctx)
      let top = databus.goods[0].y
      databus.goods.forEach((item, index) => {
        if (index >= this.startLine && index < this.startLine + this.showBoxLength) {
          item.y = top + (index - this.startLine) * 40
          item.drawToCanvas(ctx)
          item.fillContent(ctx, item)
        }
      })

    }
    
    if (this.talkboxFrame > 0) {
      if (this.talkboxFrame % 2 == 0) {
        this.talkboxR.drawToCanvas(ctx)
        this.talkboxR.renderTalkBoxContent(ctx, this.talkboxContentArr[this.talkboxFrame - 1])
      } else {
        this.talkboxL.drawToCanvas(ctx)
        this.talkboxL.renderTalkBoxContent(ctx, this.talkboxContentArr[this.talkboxFrame - 1])
      }
    }

    // this.gameinfo.renderGameScore(ctx, databus.score)

    // 游戏结束停止帧循环
    // if ( databus.gameOver ) {
      // this.gameinfo.renderGameOver(ctx, databus.score)

      // if ( !this.hasEventBind ) {
      //   this.hasEventBind = true
      //   this.touchHandler = this.touchEventHandler.bind(this)
      //   canvas.addEventListener('touchstart', this.touchHandler)
      // }

      if (!this.hasClickBind) {
        this.hasClickBind = true
        this.touchStartHandler = this.addClickHandler.bind(this)
        this.touchMoveHandler = this.scrollHandler.bind(this)
        // this.touchEndHandler = this.touchendHandler.bind(this)

        canvas.addEventListener('touchstart', this.touchStartHandler, false)
        canvas.addEventListener('touchmove', this.tool.throttle(this.touchMoveHandler, 100), false)
        // canvas.addEventListener('touchend', this.touchEndHandler, false)

      }
    // }
  }

  // 游戏逻辑更新主函数
  update() {
    if ( databus.gameOver || databus.gamePause){
        return;
    }else if( databus.gamePause ){
      // this.player.stop();
      // this.player = new Player();
      //   this.player.visible = true;
      //   return;
    }
    console.log("游戏系统更新")

    this.bg.update()

    databus.bullets
           .concat(databus.enemys)
           .forEach((item) => {
              item.update()
            })

    this.enemyGenerate()
    this.collisionDetection()

    if ( databus.frame % 20 === 0 ) {
      this.player.shoot()
      this.music.playShoot()
    }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++
    this.boxGenerate()

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
