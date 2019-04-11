import React, {Component} from 'react'
import HelpContent from '../helpContent'
import './index.css'

export default class HelpCenter extends Component {
    constructor(props) {
        super(props)
        this.state={
            data: [
                {
                    introduction: '精准入群需要先设置一个微信群的入群页面，并且设定对应的<span style="color:#5D90C5">【入群规则】</span>生成二维码，用户扫码后填写入群信息就可以进入微信群啦。',
                    title: '新建入群页面建群',
                    where: '',
                    step: [
                        {title: '1. 在<span style="color:#5D90C5">【新建群】</span>里，选择<span style="color:#5D90C5">【精准入群】</span>，编辑入群页面信息；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic1.png"},
                        {title: '2. 点击<span style="color:#5D90C5">【新增微信群】</span>或<span style="color:#5D90C5">【新增多个群】</span>输入群名称，并添加对应的入群规则，点击<span style="color:#5D90C5">【保存】</span>；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic2.png"},
                        {title: '3. 回到<span style="color:#5D90C5">【新建群】</span>-<span style="color:#5D90C5">【建群记录】</span>内查看建群记录、下载入群页面二维码。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic3.png"},
                        {title: '<span style="font-size:24px;font-family: PingFangSC-Medium">选择已有入群页面</span>'},
                        {title: '1. 在新建群页面选择一个已有的精准入群页面，点击<span style="color:#5D90C5">【去建群】</span>；',imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic4.png"},
                        {title: '2. 点击<span style="color:#5D90C5">【新增微信群】</span>或<span style="color:#5D90C5">【新增多个群】</span>输入群名称，并添加对应的入群规则，点击<span style="color:#5D90C5">【保存】</span>；',imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic5.png"},
                        {title: '3. 回到<span style="color:#5D90C5">【新建群】</span>-<span style="color:#5D90C5">【建群记录】</span>内查看建群记录、下载入群页面二维码。',imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic6.png"}
                    ]
                },
                {
                    introduction: '快速入群可以设置微信群入群页面，生成入群二维码，用户扫码后页面里直接显示入群码，待群人数达到100人以上之后，才会显示小助手二维码',
                    title: '新建入群页面',
                    where: '',
                    step: [
                        {title: '1. 在<span style="color:#5D90C5">【新建群】</span>页面选择<span style="color:#5D90C5">【快速入群】</span>，设置入群H5页面；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic7.png"},
                        {title: '2. 创建群名称、群人数、群公告等；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic8.png"},
                        {title: '3. 回到<span style="color:#5D90C5">【新建群】</span>-<span style="color:#5D90C5">【建群记录】</span>内查看建群记录、下载入群页面二维码。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic9.png"},
                        {title: '<span style="font-size:24px;font-family: PingFangSC-Medium">选择已有入群页面</span>'},
                        {title: '1. 在新建群页面创建一个新的快速入群页面，或选择一个已有的快速入群页面，点击<span style="color:#5D90C5">【去建群】</span>；',imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic10.png"},
                        {title: '2. 跳转至该入群页面之前的建群记录页，点击<span style="color:#5D90C5">【新增微信群】</span>；',imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic11.png"},
                        {title: '3. 输入群数量，点击<span style="color:#5D90C5">【确定】</span>，则建群开始；',imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic12.png"},
                        {title: '4. 回到<span style="color:#5D90C5">【新建群】</span>-<span style="color:#5D90C5">【建群记录】</span>内查看建群记录、下载入群页面二维码。',imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic13.png"}
                    ]
                },
                {
                    introduction: '在<span style="color:#5D90C5">【群管理】</span>-<span style="color:#5D90C5">【导入群】</span>页面，我们可以查看已有的小助手。',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 一个小助手最多激活30个群，选择一个有剩余额度的助手，查看<span style="color:#5D90C5">【二维码】</span>；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic14.png"},
                        {title: '2. 根据页面文字提示扫码添加小助手，将验证码私聊发给小助手，然后将小助手拉进你要激活的群内；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic15.png"},
                        {title: '3. 激活成功后，可以在<span style="color:#5D90C5">【群管理】</span>页面查看并编辑管理该群。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic16.png"}
                    ]
                },
                {
                    introduction: '可以在<span style="color:#5D90C5">【群消息】</span>菜单下<span style="color:#5D90C5">【自动回复】</span>新建或编辑关键词自动回复。列表包含关键词触发的次数、人数等数据。',
                    title: '新建关键词步骤',
                    where: '',
                    step: [
                        {title: '1. 点击<span style="color:#5D90C5">【新增关键词】</span>；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic17.png"},
                        {title: '2. 设置关键词，并选择关键词的触发条件；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic18.png"},
                        {title: '3. 编辑回复的素材，每一组关键词支持最多三份回复素材，每份素材最多可包含三条文本（1条链接、1张图片、1个小程序）；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic19.png"},
                        {title: '4. 选择关键词生效的目标群后保存。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic20.png"}
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 点击<span style="color:#5D90C5">【新增内容】</span>；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic21.png"},
                        {title: '2. 输入相应的内容，编辑完后点<span style="color:#5D90C5">【提交】</span>即可。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic22.png"},
                        {title: '3. 编辑完成的内容库，可点击页面右侧<span style="color:#5D90C5">【…】</span>按钮，进行编辑。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic23.png"},
                        {title: '若需要批量上传内容库，可点击页面上方<span style="color:#5D90C5">【批量导入】</span>按钮。<br/>需先下载 Excel 模板，按照模板格式进行信息的填写保存。点击<span style="color:#5D90C5">【上传文件】</span>即可批量上传。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic24.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 在<span style="color:#5D90C5">【群投放】</span>页面，点击<span style="color:#5D90C5">【新增投放】</span>按钮；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic25.png"},
                        {title: '2. 编辑投放内容，包括任务标题和投放时间。一条任务最多投放三段文字，一张图片，一个链接，一个小程序；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic26.png"},
                        {title: '3. 选择投放的群（可以通过标签和群名称精准查询选择）；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic27.png"},
                        {title: '4. 保存成功后，该条任务进入待投放状态，在投放之前都可以再做编辑。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic28.png"}
                    ],
                    remark: true
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title:'1. 在<span style="color:#5D90C5">【朋友圈】</span>⻚页⾯面，点击<span style="color:#5D90C5">【发朋友圈】</span>；',imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic58.png"},
                        {title:'2. 编辑朋友圈的内容。每天只可发送一条朋友圈，其中包括最多9张图片或一个H5链接，图片和H5链接不可同时存在。',imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic59.png"},
                        {title:'<span style="color:#F75A5A">*1.已发送的朋友圈可选择复制素材，择日再次发送。</span>',imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic60.png"},
                        {title:'<span style="color:#F75A5A">*2.未发送的朋友圈可在发送前二次编辑。</span>',imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic61.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '在<span style="color:#5D90C5">【高频词】</span>查看群内产生的高频词汇。支持单群或全选查看，也可调整时间段进行查询。',
                    step: [
                        {imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic29.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 当关键词被群内用户触发时，<span style="color:#5D90C5">【群消息】</span>页面内的群头像上会出现相应的红标和数字，表示提及关键词的次数+@机器人的次数；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic30.png"},
                        {title: '2. 点击编辑框内的<span style="color:#5D90C5">【关键词信息】</span>按钮，则可查看含有关键词的信息。关键词信息会标红。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic31.png"},
                        {imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic32.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 在<span style="color:#5D90C5">【群消息】</span>里点击选择右侧群用户列表的名片，会话框自动显示出该成员的聊天内容。聊天框内点击群用户的头像，可直接查看该用户的聊天记录；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic33.png"},
                        {title: '2. 点击群用户列表户的编辑按钮，在弹出的卡片内选择<span style="color:#5D90C5">【消息】</span>，也可直接查看该用户的聊天记录。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic34.png"},
                        {imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic35.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '在<span style="color:#5D90C5">【群消息】</span>页面右侧的功能栏群用户里，点击用户昵称旁的编辑按钮，弹出的卡片上可编辑该用户的备注名以及标签。',
                    step: [
                        {imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic36.png"},
                        {title: '<span style="font-size:24px;font-family: PingFangSC-Medium">为群打标签的（三种路径）</span>'},
                        {title: '1. 在<span style="color:#5D90C5">【群消息】</span>页面，点击群列表内的<span style="color:#5D90C5">【…】</span>按钮，可为单独的群打标签；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic37.png"},
                        {title: '2. 在<span style="color:#5D90C5">【群管理】</span>页面，点击该群<span style="color:#5D90C5">【编辑】</span>按钮，为单独的群打标签；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic38.png"},
                        {imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic39.png"},
                        {title: '3. 在<span style="color:#5D90C5">【群管理】</span>页面<span style="color:#5D90C5">【更多操作】</span>里，点击<span style="color:#5D90C5">【批量操作】</span>，为单独的群打标签；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic40.png"},
                        {imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic41.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 在<span style="color:#5D90C5">【群消息】</span>页面的信息输入框，可编辑并发送信息；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic42.png"},
                        {title: '2. 点击<span style="color:#5D90C5">【@】</span>按钮，可勾选需要@的用户。也可直接点击用户昵称旁的<span style="color:#5D90C5">【@Ta】</span>按钮；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic43.png"},
                        {title: '3. 点击<span style="color:#5D90C5">【群发】</span>按钮，勾选需要群发的群，点击<span style="color:#5D90C5">【确定】</span>，聊天框跳转至空页面，输入需要群发的内容，点击<span style="color:#5D90C5">【发送】</span>。消息则群发至这些群；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic44.png"},
                        {imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic45.png"},
                        {title: '4. 点击某一条语料，可查看对应的知识库，若没有搜索到相应的内容，可点击<span style="color:#5D90C5">【搜索更多】</span>，进行更准确的查询。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic46.png"},
                        {imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic47.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 在<span style="color:#5D90C5">【群状态】</span>页面默认显示昨日数据，可切换7天的数据维度，查看Dashboard；也可以点击<span style="color:#5D90C5">【导出数据】</span>选择需要导出的数据时间段来导出数据。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic48.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 进入<span style="color:#5D90C5">【群管理】</span>页面，选择一个群，点击<span style="color:#5D90C5">【编辑】</span>；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic49.png"},
                        {title: '2. 在<span style="color:#5D90C5">【编辑】</span>页面，将<span style="color:#5D90C5">【欢迎形式】</span>选择为<span style="color:#5D90C5">【图文】</span>，然后填写入群欢迎语<span style="color:#5D90C5">【文字+图片】</span>。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic50.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 进入<span style="color:#5D90C5">【群管理】</span>页面，选择一个群，点击<span style="color:#5D90C5">【编辑】</span>；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic51.png"},
                        {title: '2. 对群进行各项编辑：<br/><br/>· 设置群管理员：只有设置了管理员，才能在群消息内看到群内会话；<br/><br/>· 设置替换用的群：当群人数到达上限，或入群状态改为暂停入群时，会将用户引导进⼊新的群；<br/><br/>· 设置群名、群人数上限；<br/><br/>· 设置群标签：给群打上某个标签，给群做分类；<br/><br/>· 设置新人入群后的欢迎语；<br/><br/>· 设置护群功能。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic52.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 进入<span style="color:#5D90C5">【群管理】</span>页面，点击<span style="color:#5D90C5">【批量设置】</span>；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic53.png"},
                        {title: '2. 群卡片右上角出现多选框，选择需要批量设置的群，点击<span style="color:#5D90C5">【批量操作】</span>；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic54.png"},
                        {title: '3. 针对所选的群进行各项编辑：<br/><br/>· 设置新人入群后发送的欢迎图片和文字；<br/><br/>· 设置群管理员：只有设置了管理员，才能在群消息内看到群内会话；<br/><br/>· 设置群标签：给群打标签，给群做分类。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic55.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1.  进入<span style="color:#5D90C5">【群管理】</span>-<span style="color:#5D90C5">【导入群】</span>，找到需要注销的那个群内的小助手；'},
                        {title: '2. 点击该小助手的<span style="color:#5D90C5">【群列表】</span>，可查看机器人所激活的群明细；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic56.png"},
                        {title: '3. 找到该群，点击<span style="color:#5D90C5">【注销】</span>，则可解除该群与小助手的绑定关系，这个群将从系统内删除。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic57.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 在<span style="color:#5D90C5">【入群页】</span>页面，点击<span style="color:#5D90C5">【编辑】</span>，进入页面编辑页面；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic62.png"},
                        {title: '2. 编辑已有的入群页面，可修改背景图、标题等。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic63.png"}
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 在<span style="color:#5D90C5">【入群页】</span>页面，点击<span style="color:#5D90C5">【修改规则】</span>，进入规则编辑页面；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic64.png"},
                        {title: '2. 修改已有的规则。不可新增群及规则。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic65.png"}
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 在<span style="color:#5D90C5">【用户管理】</span>页面下，点击<span style="color:#5D90C5">【新增用户】</span>；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic66.png"},
                        {title: '2. 填写子账号的信息，选择子账号的角色（如管理员或普通用户），选择这个账号可以管理的微信群；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic67.png"},
                        {title: '3. 修改已有的子账号，可点击子账号列表内<span style="color:#5D90C5">【编辑】</span>按钮，进行修改。', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic68.png"},
                    ]
                },
                {
                    introduction: '',
                    title: '',
                    where: '',
                    step: [
                        {title: '1. 在<span style="color:#5D90C5">【用户权限】</span>页面，点击<span style="color:#5D90C5">【新增角色】</span>；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic69.png"},
                        {title: '2. 输入角色名，勾选该角色可使用的模块；', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic70.png"},
                        {title: '<span style="color:#F75A5A">*已建好的角色，如不再使用，可点击【停用】。</span>', imgUrl: process.env.PUBLIC_URL+"/images/bj/hp-pic71.png"},
                    ]
                },
            ],
            list: ['- 精准入群','- 快速入群','- 导入已有的微信群','- 设置关键词自动回复','- 自建内容库','- 设置定时群发','- 发朋友圈','- 查看群内高频词汇','- 查看关键词被触发场景','- 查看群内个人会话','- 设置用户备注名、标签','- 查看、回复群内对话','- 查看群数据','- 设置入群欢迎语','- 设置群信息','- 批量设置群信息','- 注销已激活的群','- 编辑入群页面','- 修改已有的入群规则','- 添加子账号','- 修改账号权限'],
            select: 0
        }
    }

    componentDidMount() {}
    componentWillUnmount() {}

    changeContent (i) {
        this.setState({select: i})
    }
    render() {
        const {data,select,list} = this.state
        return ( 
            <div className='hp-nav'>
                <ul className='hp-nav-list'>
                    {
                        list.map((v,i) => (
                            <li className={select == i ? 'active' : ''} onClick={() => this.changeContent(i)}>
                                <div className='shift-right'></div>
                                <span>{v}</span>
                            </li>
                        ))
                    }
                </ul>
                <HelpContent
                    data={data[select]}
                />
            </div>
        )
    }
}