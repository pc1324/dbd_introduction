<script setup>
import { onMounted, ref } from 'vue'
import ElevatorCom from '@/components/elevator/ElevatorCom.vue'
import { userHomeStore } from '@/stores'

const userHome = userHomeStore()
// 电梯相关数据
const ready = ref(false)
const backBox1 = ref(null)
const backBox2 = ref(null)
const backBox3 = ref(null)
const backBox4 = ref(null)
//  电梯条目数组
const elevatorItemInfo = ref([])

onMounted(() => {
  elevatorItemInfo.value = [
    { offsetTop: backBox1.value.offsetTop, title: '杀机介绍' },
    { offsetTop: backBox2.value.offsetTop, title: '背景设定' },
    { offsetTop: backBox3.value.offsetTop, title: '游戏机制' },
    { offsetTop: backBox4.value.offsetTop, title: '游戏特色' }
  ]
  ready.value = true
})

// 走马灯图片点击事件
const carouseLinkJump = (link) => {
  if (link && link !== '') {
    console.log(link)
  }
}

// created
console.log('created', elevatorItemInfo.value)
</script>

<template>
  <div class="home-page">
    <!-- 走马灯 -->
    <div class="my-carousel block text-center" m="t-4" style="height: 650px">
      <el-carousel trigger="click" height="650px" arrow="always">
        <el-carousel-item
          v-for="item in userHome.carouselList"
          :key="item"
          style="height: 650px"
        >
          <img
            :src="item.image"
            alt=""
            style="height: 100%"
            @click="carouseLinkJump(item.link)"
          />
          <h3 class="small justify-center" text="2xl">{{ item.id }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 介绍区 -->
    <div class="introduction-box">
      <div class="introduction-item" ref="backBox1">
        <h1>什么是黎明杀机？</h1>
        <div class="content">
          <div class="text">
            <p>
              Dead by Daylight 是一款由 Behaviour Interactive
              开发和发行的独立恐怖游戏。《黎明杀机》是一款动作和生存恐怖多人游戏，其中一位疯狂、不可阻挡的杀手在猫捉老鼠的致命游戏中，通过恐怖的噩梦般的世界追捕四名幸存者。它于
              2016 年 6 月 14 日在 PC （Steam） 上发布，并于 2017 年 6 月 20
              日在主机 （XONE/PS4） 上发布。
            </p>
            <!-- 无序列表 -->
            <ul>
              <li>
                作为幸存者，独自一人或与朋友组队面对未知的威胁。使用手头的物品、解锁的能力和环境物体来智取怪物并逃离它的杀戮场。
              </li>
              <li>
                设置在程序生成的地图中，您永远不知道会发生什么、面临什么以及如何逃脱。在压力大的情况下，您将不得不做出绝望的选择。每个决定都会影响您的生存机会。
              </li>
              <li>
                杀手来自各种恐怖类型，从残酷的杀戮者到可怕的超自然实体。掌握这些怪物的独特能力，并利用你的
                “家
                ”的知识来追踪、追捕、破坏和牺牲你的受害者，以免他们有机会逃到安全的地方。
              </li>
              <li>
                人类个体的不对称性、程序因素和独特思维使每一次 Dead by Daylight
                试验都是一个意想不到的场景，每个玩家的综合行为创造了一个真正可怕和惊心动魄的叙事。
              </li>
              <li>
                黎明杀机每个角色都有很深的进步和可解锁内容，可以根据您的个人策略进行定制。利用您的经验、技能和装备，在竞争阶梯上攀升，您最终可能会发现
                The Fog 之外的真相。
              </li>
            </ul>
          </div>
          <div class="image">
            <img src="@/assets/home/dbd-introduction01.jpg" alt="" />
          </div>
        </div>
      </div>
      <div class="introduction-item" ref="backBox2">
        <h1>背景设定</h1>
        <div class="content">
          <div class="image">
            <img src="@/assets/home/dbd-introduction02.webp" alt="" />
          </div>
          <div class="text">
            <p>
              恶灵以强烈的情感为食粮，它创造了各个噩梦世界作为审判之地，让杀手和逃生者都被困在幻境之中。
            </p>
            <p>
              游戏内最经典的三大幻境为迈克米伦庄园、奥托海文废车场（旧译废旧车库）、寒风农场，每个地点都和杀手的生前经历有关。此外，还有其余多个系列的幻境，包括克洛普瑞恩疯人院、哈登菲尔德、黑水沼泽、莱理疗养中心等。
            </p>
            <p>
              大部分杀手生前也是人类，但因为各种现实极端的原因，被恶灵选中进入迷雾，经过无数的折磨，他们最终失去了自我开始替恶灵收割人类的灵魂。
            </p>
            <p>
              游戏的副标题为“Death is not an
              escape”，意为“死亡不是解脱”。玩家扮演的逃生者角色是被困在恶灵创造的这个世界里，不论是成功开启出口大门逃脱、通过地道逃脱或是被杀死，逃生者总是会回到同一个地方。游戏开始画面中的篝火处，刚才发生的一切就好像做梦一样。然后再次被追杀，再次被杀或逃脱，无限循环。
            </p>
          </div>
        </div>
      </div>
      <div class="introduction-item" ref="backBox3">
        <h1>1v4模式游戏机制</h1>
        <div class="content">
          <div class="text">
            <ul>
              <li>
                <h2>开始</h2>
                <p>
                  玩家进入游戏后，默认在主界面地图中。玩家可以在这里加入战局、浏览任务、进入商城等。选择成为逃生者或是成为杀手后，玩家将进入角色界面。在这里，可以通过左侧按钮切换角色，升级血网，设置外观，或是搭配技能与物品。
                </p>
              </li>
              <li>
                <h2>捕猎追逐逃生者</h2>
                <p>
                  扮演杀手，追逐、攻击逃生者是献祭逃生者的必需阶段。杀手追逐逃生者时会获得相应的分数。追逐一个逃生者时间太久，会使其他逃生者快速修理完发电机，让逃生者更容易逃脱，因此这要求杀手要有对战大局观。另外，逃生者被杀手追逐时，也会获得相应分数。
                </p>
              </li>
              <li>
                <h2>挂上钩子并献祭</h2>
                <p>
                  钩子是杀手用于献祭的地点，当逃生者被杀手击倒时，杀手便可以将逃生者搬运至钩子并献祭。当逃生者第一次被挂上钩子时，可以等待队友救援，或是消耗一部分进度以4%的概率试图逃走；第二次被挂上钩子或进入第二阶段时，需要进行检定以挣脱恶灵献祭；第三次被挂上钩子或进度倒计时结束，逃生者就会直接被恶灵吞噬。“绝命终局”倒计时结束也会使任何留在对局中的逃生者直接献祭。除此之外，杀手还可以使用自己的能力或相关祭品处决逃生者。
                </p>
              </li>
              <li>
                <h2>修理发电机</h2>
                <p>
                  扮演逃生者时，玩家需要一边躲避杀手的追杀，一边修理发电机，以开启逃生大门，逃出生天。一般每张地图上都存在7个发电机（这取决于游戏开始时逃生者的人数）。当修理完成7台中的5台发电机时，地图上存在的2个逃生大门便会通电。如果逃生者还未完全修理完毕发电机时，发电机的修理进度会保存。杀手可以破坏未完全修复的发电机，使其修理进度缓慢倒退。修理发电机可以让逃生者获得相应分数。
                </p>
              </li>
              <li>
                <h2>牵制杀手</h2>
                <p>
                  对局过程中，逃生者需要牵制杀手以帮助其他人获得修理发电机的时间。期间，逃生者可以利用木板、窗户等（场景道具）和手电筒、工具箱等（物品道具）来牵制杀手，以吸引杀手注意或救援其他逃生者。牵制杀手，利用道具救下队友会获得相应分数。
                </p>
              </li>
              <li>
                <h2>对局结束</h2>
                <p>
                  当所有逃生者的结局被确定后（逃出生天/成为祭品/死亡），对局就会结束。待恶灵揭示对局结果后，所有玩家将进入结算界面，根据对局情况获得相应的血点奖励，提升或降低勋级。如果游戏中途离开对局，则可能被禁赛一段时间并处罚勋级进度。
                </p>
              </li>
            </ul>
            <p class="redStyle">
              无论是逃生者还是杀手，对局结束后都会回到同一个地方，即游戏开始的篝火处，如此循环往复。
            </p>
          </div>
          <div class="image">
            <img src="@/assets/home/dbd-introduction03.jpg" alt="" />
          </div>
        </div>
      </div>
      <div class="introduction-item" ref="backBox4">
        <h1>游戏特色</h1>
        <div class="content">
          <div class="image">
            <img src="@/assets/home/dbd-introduction04.webp" alt="" />
            <img src="@/assets/home/dbd-introduction05.webp" alt="" />
          </div>
          <div class="text">
            <ul>
              <li>
                <h2>非对称性</h2>
                <p>
                  《黎明杀机》是款非对称性游戏。游戏中的双方阵营分别具有特定的优势与劣势：
                </p>
                <p>
                  杀手犹如强大无比的怪兽，以第一人称视角单独进行游戏。他们都有着敏锐的感官、残暴的武器以及独特的力量，能够帮助自己发现、追杀、攻击、捕获并献祭逃生者。
                </p>
                <p>
                  逃生者们则四人同行。无论合作与否，他们的目的只有一个：活下去。虽然十分弱小，但逃生者可以利用他们的较小的体形迅速翻越窗户、跳过木板或找到藏身之处。逃生者会以第三人称视角进行游戏，因此在判断周围情况的方面具有优势。
                </p>
              </li>
              <li>
                <h2>血网等级</h2>
                <p>
                  血网等级是每个逃生者和杀手独立的等级。5，10，15级会解锁额外的技能槽。30，35，40级会解锁该角色专属技能的传承，解锁之后此技能会在其他逃生者/杀手的血网里出现。
                </p>
                <p>
                  50级满级后，玩家可以选择转生，使角色的转生阶数提高。当一名角色完成1~3阶转生时，将为其他逃生者/杀手解锁相应等级的该名角色的所有可传授技能。
                </p>
                <p>
                  3阶之后的转生奖励将包括该角色可获得独特图标和角色服装、武器等（如血衣、血刀）。转生至多至100阶。
                </p>
                <p>
                  每阶达成50级后，血网仍会刷新，但角色等级维持在50级不再提升。可以继续刷新技能和道具。
                </p>
              </li>
              <li>
                <h2>技能</h2>
                <p>
                  每种技能都有3级，升级会改变技能品质颜色，颜色不同稀有度不同。玩家每次升级时，血网便会刷新，最外圈都会出现0至4个技能。如果此技能玩家已经拥有，那便会出现高一级的技能，解锁后技能升级，最高3级。每个角色都可以学会所有技能。每个角色（逃生者或杀手）在30、35、40等级时，血网中会出现本角色专有技能的传承选项（橙色技能），使用血点解锁后，此角色以外的任意角色升级的新血网中均有几率刷出此技能。
                </p>
              </li>
              <li>
                <h2>勋级</h2>
                <p>勋级系统共有五个大勋级，并分别包含四个小等级：</p>
                <ul>
                  <li>灰烬IV、灰烬III、灰烬II、灰烬I</li>
                  <li>青铜IV、青铜III、青铜II、青铜I</li>
                  <li>白银IV、白银III、白银II、白银I</li>
                  <li>黄金IV、黄金III、黄金II、黄金I</li>
                  <li>荧虹IV、荧虹III、荧虹II、荧虹I</li>
                </ul>
              </li>
              <li>
                <h2>视角</h2>
                <p>
                  杀手在游戏中是以第一视角的形式进行操作的。相反，逃生者则是以第三视角进行操作。这也变相地说明，逃生者有较杀手而言更加宽广的视野覆盖面积，而特殊视角设定则是因为制作方希望逃生者可以在能力弱势的情况下，进行更好的环境勘测，更易察觉周围的变化，以便面对以及规避杀手的追杀。
                </p>
              </li>
              <li>
                <h2>血祭品</h2>
                <p>
                  1.2.1版本中，增加的新游戏机制：血祭品。当进入对局时，某一个逃生者将会被标记为杀手的血祭品。成功触发部分技能时，血祭品则可能会在逃生者中转移。以下信息将详细描述血祭品是如何被分配和体现于游戏中的：
                </p>
                <ul>
                  <li>无论何时，一个血祭品都将在这局游戏中被分配。</li>
                  <li>
                    如果所有逃生者都没有使用与血祭品相关的技能，血祭品会随机分配。
                  </li>
                  <li>
                    如果逃生者使用了与血祭品相关的技能，将会根据技能描述增加或降低成为血祭品的概率。
                  </li>
                  <li>
                    血祭品会在逃生者状态图标（左侧一栏）拥有高亮标示，所有逃生者都可以知道谁是血祭品。
                  </li>
                  <li>血祭品玩法取决于当局游戏中被使用的技能。</li>
                  <li>血祭品实际上是一个触发不同情景效应的条件。</li>
                  <li>
                    血祭品角色在被杀手追逐时，状态栏中该逃生者图标处的爪子会晃动。
                  </li>
                </ul>
              </li>
              <li>
                <h2>秘密圣所</h2>
                <p>
                  在秘密圣所中，玩家可以用“荧虹裂片”购买传承技能。每一周，会有四个传承技能供购买，购买技能消耗的荧虹裂片价格2000-2500不等，新近DLC的传承一般较贵。秘密圣所中的技能只能用荧虹裂片购买。秘密圣所中的所有技能都是传承技能。一旦购买，就会解锁并能出现于所人类或杀手角色的血网中。如果玩家已经拥有此传承技能，在秘密圣所中再次购买会获得额外血点。所有玩家或角色的技能轮换是一样的。
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 电梯组件 -->
    <ElevatorCom
      v-if="ready"
      :itemInfo="elevatorItemInfo"
      subHeight="100"
    ></ElevatorCom>
  </div>
</template>

<style lang="less" scoped>
// 首页
.home-page {
  padding-top: 100px;
  color: white;
  // 介绍盒子
  .introduction-box {
    width: 100%;
    // min-height: 2400px;
    background-color: #ccc;
    // 介绍条目
    .introduction-item {
      padding: 20px;
      width: 100%;
      // min-height: 600px;
      &:nth-child(2n) {
        background-color: #3a3a3a;
        h1 {
          text-align: right;
        }
      }
      &:nth-child(2n + 1) {
        background-color: #878787;
      }
      &:nth-child(1) {
        height: 550px;
      }
      &:nth-child(2) {
        height: 550px;
      }
      &:nth-child(3) {
        height: 950px;
      }
      h1 {
        margin-bottom: 10px;
      }
      .content {
        display: flex;
        .text {
          flex: 1;
          p {
            text-indent: 2em;
            font-size: 18px;
            // 媒体查询,大于1200px
            @media screen and (max-width: 1200px) {
              font-size: 14px;
            }
          }
          // li加上圆点
          ul {
            padding-left: 20px;
            li {
              list-style: disc;
              padding: 5px 0;
            }
          }
        }
        .image {
          flex: 1;
          text-align: center;
          img {
            padding-top: 10px;
            width: 80%;
            border-radius: 25px;
          }
        }
      }
    }
  }
}

// 走马灯
.el-carousel .el-carousel__arrow {
  font-size: 20px;
}

.el-carousel__item {
  text-align: center;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #292d2e;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #292d2e;
}

.redStyle {
  color: rgba(255, 59, 33, 0.804);
  font-weight: 700;
  background-color: black;
}
</style>
