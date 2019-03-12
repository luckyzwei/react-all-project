/**
 * Created by jiayi.hu on 7/24/17.
 */
import React, {Component, PropTypes} from 'react'
import $ from 'jquery'
const jobClass = [
    {
        id: 1,
        imgSrc: './images/part1.png',
        imgSrc_hover: './images/part1_hover.png',
        department: '技术',
        positions: [
            {
                position: '算法工程师（NLP方向）',
                duty: '1.搭建在多人多轮会话场景下的意图和主题识别模型；\n' +
                '2.建立会话和内容的相关性模型，为精准投放提供支持。\n',
                request: '1. 扎实的计算机和数学基础，具体包括数据结构与算法、机器学习基本理论、线性代数及概率论；\n' +
                '2. 精通自然语言处理相关领域的知识与技能；\n' +
                '3. 具备扎实的编码和工程能力；\n' +
                '4. 能够从复杂的业务场景中进行算法选型、算法优化以及不断提升效果；\n' +
                '5. 在文本检索、文本分类／聚类、意图识别等NLP相关领域有实际的开发和从业经验者优先；\n' +
                '6. 硕士以上学历，优秀的英语听说读写运用能力（英语6级及以上）；\n' +
                '7. 对技术执着、有热情，沟通、合作能力强。\n',
            },
            {
                position: '大数据开发工程师',
                duty: '1.参与基于hadoop的数据计算平台建设，支持精准广告投放所需的大规模数据计算需求；\n' +
                '2.针对具体业务数据进行数据的离线计算或实时计算。\n',
                request: '1.计算机相关专业，本科及以上学历，2年以上Python数据开发经验；\n' +
                '2.熟悉Hadoop/HBase/Spark/hive生态系统的搭建和管理，掌握相关项目的原理和使用方法；\n' +
                '3.掌握数据分析的基本流程，擅长数据采集、清洗、分析等环节；\n' +
                '4.具有较强的业务理解能力，并能快速应用于数据分析各阶段；\n' +
                '5.善于发现系统的性能瓶颈、设计缺陷，提出改进方案并进行实施；\n' +
                '6.思路敏捷清晰，良好的表达和理解能力，良好的学习能力，强烈的创新意识；\n' +
                '7.有互联网广告行业工作经历者优先考虑。',
            }, {
                position: '高级 Python 研发工程师',
                duty: '1. SaaS 平台底层相关业务逻辑的研发。\n',
                request: '1. 本科以上学历，良好的计算机知识基础，包括网络通信、基础算法、数据结 构等；\n' +
                '2. 至少熟悉关系型数据库中的一种；\n' +
                '3. 使用 Python 至少 2 年以上，良好的编程习惯；\n' +
                '4. 熟悉 Django/Flask 等 Web 框架；\n' +
                '5. 有高并发处理经验、分布式架构经验优先；\n' +
                '6. 拥抱开源，有 Github 项目加分。\n'
            },
            {
                position: '前端开发经理/高级前端开发工程师',
                duty: '1.负责社群 Saas 系统的迭代开发与维护；\n' +
                '2.负责服务号 H5 开发及连调；\n' +
                '3.参与 App Webview 嵌入开发；\n' +
                '4.配合产品、设计、后端完成交互及业务模型梳理开发；\n' +
                '5.制作并维护众多开发中的公共组件，并能进行灵活的修改适应业务需求；\n' +
                '6.制作工具提升团队开发效率。',
                request: '1.本科以上学历，3 年以上开发经验，并拥有完整前端项目经验；\n' +
                '2.精通 javascript，了解 ES6 规范；\n' +
                '3.有响应式布局经验，熟悉 css 动画样式操作，熟悉 canvas 画布操作；\n' +
                '4.熟悉常用 前端框架 React／Vue / Backbone 至少一种，有微信小程序开发经验优先；\n' +
                '5.有部分函数式编程思想，有 Node.js／React／Redux 开发经验优先；\n' +
                '6.有微服务合作开发经验者优先；\n' +
                '7.有较强的抗压能力，工作有激情，具备责任心。'
            },
            {
                position: '高级 Java 研发工程师',
                duty: '1.承接架构师的系统架构设计中的某些独立模块的设计及研发；\n' +
                '2.和产品 Team 一起理解和消化业务逻辑；\n' +
                '3.统筹所负责模块的设计的文档及代码 Review；\n' +
                '4.主导所负责模块的单元测试；\n' +
                '5.配合测试及 QA 做好所负责模块的版本发布及代码和脚本的维护。\n',
                request: '1.计算机及相关专业本科以上学历；\n' +
                '2.Java 语言 3 年+的工作经验；\n' +
                '3.熟悉 Spring 技术体系（Spring MVC，Spring Data, Spring Boot 等；\n' +
                '4.熟悉 Hibernate/MyBatis/TopLink 等 O-R Mapping 技术；\n' +
                '5.熟悉 UML/OO，会用 UML 来进行系统的设计；\n' +
                '6.熟悉 MySQL/Oracle 等关系型数据库，熟悉 SQL 调优，及常见 SQL 脚本书写；\n' +
                '7.有较强的代码联调及 Trouble Shooting 能力；\n' +
                '8.熟悉 MongoDB 等 No-SQL 数据库者优先；\n' +
                '9.熟悉 Redis，MemCached 等缓存技术者优先；\n' +
                '10.熟悉 RabbitMQ/ActiveMQ/Kafka 等 MQ 者优先；\n' +
                '11.熟悉微服务体系结构者优先；\n' +
                '12.熟悉 Java 线程编程及协议编程者优先；\n' +
                '13.有积极的主观能动性，对新技术，新思维有很强的适应及学习能力。'
            }
        ]
    },
    {
        id: 2,
        imgSrc: './images/part2.png',
        imgSrc_hover: './images/part2_hover.png',
        department: '产品&运营',
        positions: [
            {
                position: 'C端高级产品经理/产品总监',
                duty: '1、负责微小宠产品规划与设计，包括需求分析、产品定位、功能及交互设计等；\n' +
                '2、参与项目管理，把控项目进度和质量，与开发、设计、测试等紧密配合完成产品功能的落地；\n' +
                '3、通过数据分析跟踪产品设计效果及业务发展状况，持续改善；\n' +
                '4、负责产品的用户体验，包括不限于功能、性能、交互、视觉等，负责跟进用户反馈并及时优化和落地；\n' +
                '5、研究互联网、移动互联网用户及市场发展趋势，调研竞争产品特性及演进思路，收集各渠道需求，提出自己的想法和建议；\n' +
                '6、联系运营、市场、BD等合作部门，关注协作需求，紧密沟通，做好产品的落地。',
                request: '1、互联网C端产品3～5年经验，社交、游戏、微信小程序等产品经验优先；\n' +
                '2、本科以上学历，计算机、心理学等相关背景优先；\n' +
                '3、对产品和交互设计有深入理解，熟悉交互设计原则，注重交互的合理性；\n' +
                '4、富有创造力和工作热情，热爱互联网，关注移动互联网的发展趋势、模式和用户行为变化，对互联网产品和创新的商业模式有强烈兴趣并有很强的敏锐度；\n' +
                '5、有较强的学习、沟通及问题分析与解决能力，良好的表达能力、组织协调能力，及一定的项目管理能力。'
            },
            {
                position: '高级运营经理/运营总监',
                duty: '1. 理解社群运营的基本逻辑，持续分析社群运营日常指标数据提升用户活跃度；\n' +
                '2. 持续策划并创新社群活动激活用户活跃度；\n' +
                '3. 管理并激活社群内活跃用户，提升用户粘性，提高单一用户价值产出；\n' +
                '4. 持续引入适合社群环境的供应链资源，满足群内用户个性化需求；',
                request: '1. 充分理解微信生态内的行业应用趋势，熟悉社群行业的发展趋势，带领团队持续挖掘最高效的社群商业化价值；\n' +
                '2. 探索适合社群分发的最佳容器与载体，并引入合适的供应链资源；\n' +
                '3. 探索并制定社群自运营的活跃及激励机制，确保社群生态内用户的持续活跃。',
                require: '1.熟悉社交生态及应用；\n' +
                '2.前端运营策划能力；\n' +
                '3.用户和数据洞察力；\n' +
                '4.对接供应链能力；\n' +
                '5.跨部门协作。'
            },
            {
                position: '内容运营/新媒体运营',
                duty: '1. 独立运营新媒体，负责内容推送、活动策划和执行；\n' +
                '2. 负责策划并制定线上活动方案以及定期与粉丝互动，执行相关的推广活动；\n' +
                '3. 跟踪推广效果，分析数据并反馈，总结经验，提升运营手段，增加粉丝数量，保证用户活跃度；\n' +
                '4. 提高新媒体内容的发送质量，根据客户需求制定具有针对性的文章和活动排期计划。',
                request: '1. 大专及以上学历，1年以上新媒体运营和营销经验；\n' +
                '2. 踏实肯干，具备良好的责任心和执行力，抗压能力强，善于学习新技能；\n' +
                '3. 有创新精神，具备较强的文字表达能力和数据分析能力。'
            }
        ]
    },
    {
        id: 3,
        imgSrc: './images/part3.png',
        imgSrc_hover: './images/part3_hover.png',
        department: '品牌营销',
        positions: [
            {
                position: '广告执行',
                duty: '1. 负责客户业务的全程服务，包括项目管理、报告总结等；\n' +
                '2. 协助研发管理客户的数字广告活动、创意需求；\n' +
                '3. 与公司各业务单元合作，确保客户与内部各团队间专业、有效的沟通；\n' +
                '4. 协助完成客户报价，合同谈判及协助财务核对发票和应收账款等。',
                request: '1. 本科以上学历，英语四级以上，广告、市场营销等相关专业，3年以上广告、媒体或公关公司工作经历优先；\n' +
                '2. 熟悉线上市场推广活动的策划实施流程，熟悉办公软件，如Word，Excel，PowerPoint；\n' +
                '3. 亲和力强、善于沟通，注重细节、思路清晰，应变能力强；\n' +
                '4. 具有较强的谈判能力，有独立执行的能力可抗压力。'
            }
        ]
    },
    // {
    //     id: 4,
    //     imgSrc: './images/part4.png',
    //     imgSrc_hover: './images/part4_hover.png',
    //     department: '运营',
    //     positions: [
    //         {
    //             position: '新媒体运营',
    //             duty: '1、通过图文、视频等形式运营淘宝达人账号，内容输出;\n' +
    //             '2、搜罗各种实用单品，以母婴达人身份撰文推荐;\n' +
    //             '3、独立完成专题策划和日常更新与维护,参与相关栏目策划以及日常维护;\n' +
    //             '4、跟商家或者其他达人合作，获取更优曝光度;\n' +
    //             '5、完成上级交代的其他任务; ',
    //             request: '1、本科或以上学历，不限专业\n' +
    //             '2、熟悉电脑操作和PS软件技能，能对图片进行美化和处理，有一定的文字功底；\n' +
    //             '3、能把握时尚潮流，有独到的时尚嗅觉，具有个人理念、创新能力以及较好的搭配眼光\n' +
    //             '4、具有良好的沟通与协调协作能力和思考能力，工作热情高，有良好的团队合作精神，工作有条理会统筹'
    //         },
    //         {
    //             position: '活动运营',
    //             duty: '1、负责社群及新媒体的日常内容维护管理；\n' +
    //             '2、策划新媒体线上活动，制定活动目标，并能整合现有资源，有节奏的落地执行；\n' +
    //             '3、结合时下热点及平台定位、市场需求，创新策划营销活动；\n' +
    //             '4、分析活动关联的数据，跟踪和监测过程和结果，并对结果指标负责，沉淀可复制的案例。',
    //             request: '1、本科及以上学历，2年以上社群或者新媒体相关活动策划经验；\n' +
    //             '2、了解母婴行业、及母婴行业人群特性，对线上转播方式及；\n' +
    //             '3、出色的策划和规划能力以及项目管理能力；\n' +
    //             '4、对数据敏感，善于通过数据分析，了解客户行为和需求，并不断运用创新的方法来实现客户需求；\n' +
    //             '5、热爱互联网，有敬业精神，能够适应公司发展节奏。'
    //         },
    //         {
    //             position: '数据运营',
    //             duty: '1、根据根据运营需求及用户反馈，整合产品需求、收集、评估及跟进落地；\n' +
    //             '2、根据相关数据进行内容质量运营，对稿件进行质量确认等。\n' +
    //             '3、数据的提炼、分析，探寻用户的行为等特征，完成分析报告；\n' +
    //             '4、挖掘数据背后的市场方向、规律、短板，为业务提供决策依据；\n' +
    //             '5、针对具体的落地活动，分析投入产出比、产品转化率等数据，生成活动报表、可优化的方向等；',
    //             request: '1、3年以上互联网产品运营类的岗位经验，关注用户需求和热点事件；\n' +
    //             '2、逻辑能力较强，沟通能力强，工作细心踏实，有责任心与自我驱动力；\n' +
    //             '3、性格开朗活泼，擅长组织协调，推动团队协作；\n' +
    //             '4、对数据敏感，有较强的数据分析能力和方案、报告撰写能力；'
    //         },
    //         {
    //             position: '用户运营',
    //             duty: '1、针对平台产品来迎合用户痛点，策划相关的线上线下营销活动；\n' +
    //             '2、负责运营活动策划和落实，根据产品目标持续策划运营活动并跟踪实际效果；\n' +
    //             '3、关注用户体验，对所有影响用户行为和使用体验的方面进行监控，及时将获得的数据和分析结果反馈相关部门，积极有效地推动活动和产品改进；\n' +
    //             '4、与相关合作方配合绘制用户画像，并能与合作方有效沟通，落实渠道推广计划，提升用户基数； ',
    //             request: '1、本科以上学历\n' +
    //             '2、1年以上互联网平台或产品活动策划经验，具备营销推广经验，相关行业工作背景，高端用户行业或奢侈品行业优先；\n' +
    //             '3、有独立策划、组织、开展推广线上线下活动经验；\n' +
    //             '4、良好的沟通及协调能力,有团队合作精神和管理能力。'
    //         },
    //         {
    //             position: '社群运营',
    //             duty: '1、接听负责微信用户反馈及沟通工作；\n' +
    //             '2、跟踪维护日常微信社群的线上线下活动，处理用户投诉问题；\n' +
    //             '3、负责公司微信公众号的推广模式和渠道探索，收集用户反馈，分析用户行为及需求。\n' +
    //             '4、负责完成领导安排的其他相关微信运营相关工作',
    //             request: '1、能熟悉使用微信多客服后台，对微信客服号的各项功能熟练掌握；\n' +
    //             '2、性格外向、反应敏捷、表达能力强，具有较强的沟通能力及交际技巧，具有亲和力；\n' +
    //             '3、有责任心，能承受较大的工作压力；\n' +
    //             '4、有1年以上微信公众号客服及相关推广营销经验，可优先考虑。'
    //         }
    //     ]
    // },
    {
        id: 4,
        imgSrc: './images/part5.png',
        imgSrc_hover: './images/part5_hover.png',
        department: '商务',
        positions: [
            {
                position: 'BD 经理',
                duty: '1.开发及跟进潜在客户，掌握客户需求，制定销售计划，完成销售目标；\n' +

                '2.结合公司产品，有针对性的为客户定制解决方案，为客户提供合理化建议和意见；\n' +

                '3.维系新老客户关系，对客户的反馈及时处理和协调，增强客户黏性，保持长期合；\n' +

                '4.根据客户需求和市场变化，对公司的产品和服务提出改进建议。',
                request: '1、具有 2 年以上互联网软件，2B SAAS 领域、ERP 软件等行业项目销售经验者优先；\n' +

                '2、有大客户定制项目跟进经验者优先；\n' +

                '3、性格外向，形象气质佳，逻辑思维清晰，商务谈判能力强；\n' +

                '4、酷爱销售工作，抗压能力强，渴望挑战高薪，接受一定程度的出差。'
            }
        ]
    },
    {
        id: 5,
        imgSrc: './images/part6.png',
        imgSrc_hover: './images/part6_hover.png',
        department: '设计',
        positions: [
            {
                position: 'UI设计师',
                duty: '1、 基于对产品设计需求的良好理解能力, 对整体产品视觉风格的定位整体把握；\n' +
                '2、能够准确理解产品需求和交互原型; 负责设计方案、创意设计和 UI 视觉, 把控产品调性并输出相关设计 Demo；\n' +
                '3. 根据项目需求和产品的行业特性及特点, 把控不同的视觉风格并独立完成产品视觉设计；\n' +
                '4. 梳理产品设计框架, 打磨产品UI细节, 提升产品交互体验, 完善设计规范文档。',
                request: '1.喜欢、理解我们正在做的事,并有自己的看法与见解；\n' +
                '2.本科艺术院校以上学历,参与过起码一次完整项目产品系列的相关设计工作,对视觉 UI 设计有激情和创新精神；\n' +
                '3.优秀的视觉审美,了解Web及 Mobile领域在当下的设计趋势；\n' +
                '4.专业的视觉设计表现力和创意能力,能阐述具有说服力的设计理论,有反复打磨设计的耐心；\n' +
                '5.擅长一款可独当一面的设计工具,如 Sketch、 Photoshop、 illustrator…；\n' +
                '6.自主驱动力强,具有跨团队协作能力。',
                require: '1.是 Dribbble Player 有插画能力；\n' +
                    '2.请提供你认为最棒的PDF作品集或链接。'
            }
        ]
    },
    {
        id: 6,
        imgSrc: './images/part7.png',
        imgSrc_hover: './images/part7_hover.png',
        department: '全部',
        positions: [
            {
                position: '算法工程师（NLP方向）',
                duty: '1.搭建在多人多轮会话场景下的意图和主题识别模型；\n' +
                    '2.建立会话和内容的相关性模型，为精准投放提供支持。\n',
                request: '1. 扎实的计算机和数学基础，具体包括数据结构与算法、机器学习基本理论、线性代数及概率论；\n' +
                    '2. 精通自然语言处理相关领域的知识与技能；\n' +
                    '3. 具备扎实的编码和工程能力；\n' +
                    '4. 能够从复杂的业务场景中进行算法选型、算法优化以及不断提升效果；\n' +
                    '5. 在文本检索、文本分类／聚类、意图识别等NLP相关领域有实际的开发和从业经验者优先；\n' +
                    '6. 硕士以上学历，优秀的英语听说读写运用能力（英语6级及以上）；\n' +
                    '7. 对技术执着、有热情，沟通、合作能力强。\n',
            },
            {
                position: '大数据开发工程师',
                duty: '1.参与基于hadoop的数据计算平台建设，支持精准广告投放所需的大规模数据计算需求；\n' +
                    '2.针对具体业务数据进行数据的离线计算或实时计算。\n',
                request: '1.计算机相关专业，本科及以上学历，2年以上Python数据开发经验；\n' +
                    '2.熟悉Hadoop/HBase/Spark/hive生态系统的搭建和管理，掌握相关项目的原理和使用方法；\n' +
                    '3.掌握数据分析的基本流程，擅长数据采集、清洗、分析等环节；\n' +
                    '4.具有较强的业务理解能力，并能快速应用于数据分析各阶段；\n' +
                    '5.善于发现系统的性能瓶颈、设计缺陷，提出改进方案并进行实施；\n' +
                    '6.思路敏捷清晰，良好的表达和理解能力，良好的学习能力，强烈的创新意识；\n' +
                    '7.有互联网广告行业工作经历者优先考虑。',
            }, {
                position: '高级 Python 研发工程师',
                duty: '1. SaaS 平台底层相关业务逻辑的研发。\n',
                request: '1. 本科以上学历，良好的计算机知识基础，包括网络通信、基础算法、数据结 构等；\n' +
                    '2. 至少熟悉关系型数据库中的一种；\n' +
                    '3. 使用 Python 至少 2 年以上，良好的编程习惯；\n' +
                    '4. 熟悉 Django/Flask 等 Web 框架；\n' +
                    '5. 有高并发处理经验、分布式架构经验优先；\n' +
                    '6. 拥抱开源，有 Github 项目加分。\n'
            },
            {
                position: '前端开发经理/高级前端开发工程师',
                duty: '1.负责社群 Saas 系统的迭代开发与维护；\n' +
                    '2.负责服务号 H5 开发及连调；\n' +
                    '3.参与 App Webview 嵌入开发；\n' +
                    '4.配合产品、设计、后端完成交互及业务模型梳理开发；\n' +
                    '5.制作并维护众多开发中的公共组件，并能进行灵活的修改适应业务需求；\n' +
                    '6.制作工具提升团队开发效率。',
                request: '1.本科以上学历，3 年以上开发经验，并拥有完整前端项目经验；\n' +
                    '2.精通 javascript，了解 ES6 规范；\n' +
                    '3.有响应式布局经验，熟悉 css 动画样式操作，熟悉 canvas 画布操作；\n' +
                    '4.熟悉常用 前端框架 React／Vue / Backbone 至少一种，有微信小程序开发经验优先；\n' +
                    '5.有部分函数式编程思想，有 Node.js／React／Redux 开发经验优先；\n' +
                    '6.有微服务合作开发经验者优先；\n' +
                    '7.有较强的抗压能力，工作有激情，具备责任心。'
            },
            {
                position: '高级 Java 研发工程师',
                duty: '1.承接架构师的系统架构设计中的某些独立模块的设计及研发；\n' +
                    '2.和产品 Team 一起理解和消化业务逻辑；\n' +
                    '3.统筹所负责模块的设计的文档及代码 Review；\n' +
                    '4.主导所负责模块的单元测试；\n' +
                    '5.配合测试及 QA 做好所负责模块的版本发布及代码和脚本的维护。\n',
                request: '1.计算机及相关专业本科以上学历；\n' +
                    '2.Java 语言 3 年+的工作经验；\n' +
                    '3.熟悉 Spring 技术体系（Spring MVC，Spring Data, Spring Boot 等；\n' +
                    '4.熟悉 Hibernate/MyBatis/TopLink 等 O-R Mapping 技术；\n' +
                    '5.熟悉 UML/OO，会用 UML 来进行系统的设计；\n' +
                    '6.熟悉 MySQL/Oracle 等关系型数据库，熟悉 SQL 调优，及常见 SQL 脚本书写；\n' +
                    '7.有较强的代码联调及 Trouble Shooting 能力；\n' +
                    '8.熟悉 MongoDB 等 No-SQL 数据库者优先；\n' +
                    '9.熟悉 Redis，MemCached 等缓存技术者优先；\n' +
                    '10.熟悉 RabbitMQ/ActiveMQ/Kafka 等 MQ 者优先；\n' +
                    '11.熟悉微服务体系结构者优先；\n' +
                    '12.熟悉 Java 线程编程及协议编程者优先；\n' +
                    '13.有积极的主观能动性，对新技术，新思维有很强的适应及学习能力。'
            },
            {
                position: 'C端高级产品经理/产品总监',
                duty: '1、负责微小宠产品规划与设计，包括需求分析、产品定位、功能及交互设计等；\n' +
                    '2、参与项目管理，把控项目进度和质量，与开发、设计、测试等紧密配合完成产品功能的落地；\n' +
                    '3、通过数据分析跟踪产品设计效果及业务发展状况，持续改善；\n' +
                    '4、负责产品的用户体验，包括不限于功能、性能、交互、视觉等，负责跟进用户反馈并及时优化和落地；\n' +
                    '5、研究互联网、移动互联网用户及市场发展趋势，调研竞争产品特性及演进思路，收集各渠道需求，提出自己的想法和建议；\n' +
                    '6、联系运营、市场、BD等合作部门，关注协作需求，紧密沟通，做好产品的落地。',
                request: '1、互联网C端产品3～5年经验，社交、游戏、微信小程序等产品经验优先；\n' +
                    '2、本科以上学历，计算机、心理学等相关背景优先；\n' +
                    '3、对产品和交互设计有深入理解，熟悉交互设计原则，注重交互的合理性；\n' +
                    '4、富有创造力和工作热情，热爱互联网，关注移动互联网的发展趋势、模式和用户行为变化，对互联网产品和创新的商业模式有强烈兴趣并有很强的敏锐度；\n' +
                    '5、有较强的学习、沟通及问题分析与解决能力，良好的表达能力、组织协调能力，及一定的项目管理能力。'
            },
            {
                position: '高级运营经理/运营总监',
                duty: '1. 理解社群运营的基本逻辑，持续分析社群运营日常指标数据提升用户活跃度；\n' +
                    '2. 持续策划并创新社群活动激活用户活跃度；\n' +
                    '3. 管理并激活社群内活跃用户，提升用户粘性，提高单一用户价值产出；\n' +
                    '4. 持续引入适合社群环境的供应链资源，满足群内用户个性化需求；',
                request: '1. 充分理解微信生态内的行业应用趋势，熟悉社群行业的发展趋势，带领团队持续挖掘最高效的社群商业化价值；\n' +
                    '2. 探索适合社群分发的最佳容器与载体，并引入合适的供应链资源；\n' +
                    '3. 探索并制定社群自运营的活跃及激励机制，确保社群生态内用户的持续活跃。',
                require: '1.熟悉社交生态及应用；\n' +
                    '2.前端运营策划能力；\n' +
                    '3.用户和数据洞察力；\n' +
                    '4.对接供应链能力；\n' +
                    '5.跨部门协作。'
            },
            {
                position: '内容运营/新媒体运营',
                duty: '1. 独立运营新媒体，负责内容推送、活动策划和执行；\n' +
                    '2. 负责策划并制定线上活动方案以及定期与粉丝互动，执行相关的推广活动；\n' +
                    '3. 跟踪推广效果，分析数据并反馈，总结经验，提升运营手段，增加粉丝数量，保证用户活跃度；\n' +
                    '4. 提高新媒体内容的发送质量，根据客户需求制定具有针对性的文章和活动排期计划。',
                request: '1. 大专及以上学历，1年以上新媒体运营和营销经验；\n' +
                    '2. 踏实肯干，具备良好的责任心和执行力，抗压能力强，善于学习新技能；\n' +
                    '3. 有创新精神，具备较强的文字表达能力和数据分析能力。'
            },
            {
                position: '广告执行',
                duty: '1. 负责客户业务的全程服务，包括项目管理、报告总结等；\n' +
                    '2. 协助研发管理客户的数字广告活动、创意需求；\n' +
                    '3. 与公司各业务单元合作，确保客户与内部各团队间专业、有效的沟通；\n' +
                    '4. 协助完成客户报价，合同谈判及协助财务核对发票和应收账款等。',
                request: '1. 本科以上学历，英语四级以上，广告、市场营销等相关专业，3年以上广告、媒体或公关公司工作经历优先；\n' +
                    '2. 熟悉线上市场推广活动的策划实施流程，熟悉办公软件，如Word，Excel，PowerPoint；\n' +
                    '3. 亲和力强、善于沟通，注重细节、思路清晰，应变能力强；\n' +
                    '4. 具有较强的谈判能力，有独立执行的能力可抗压力。'
            },
            {
                position: 'BD 经理',
                duty: '1.开发及跟进潜在客户，掌握客户需求，制定销售计划，完成销售目标；\n' +

                    '2.结合公司产品，有针对性的为客户定制解决方案，为客户提供合理化建议和意见；\n' +

                    '3.维系新老客户关系，对客户的反馈及时处理和协调，增强客户黏性，保持长期合；\n' +

                    '4.根据客户需求和市场变化，对公司的产品和服务提出改进建议。',
                request: '1、具有 2 年以上互联网软件，2B SAAS 领域、ERP 软件等行业项目销售经验者优先；\n' +

                    '2、有大客户定制项目跟进经验者优先；\n' +

                    '3、性格外向，形象气质佳，逻辑思维清晰，商务谈判能力强；\n' +

                    '4、酷爱销售工作，抗压能力强，渴望挑战高薪，接受一定程度的出差。'
            },
            {
                position: 'UI设计师',
                duty: '1、 基于对产品设计需求的良好理解能力, 对整体产品视觉风格的定位整体把握；\n' +
                    '2、能够准确理解产品需求和交互原型; 负责设计方案、创意设计和 UI 视觉, 把控产品调性并输出相关设计 Demo；\n' +
                    '3. 根据项目需求和产品的行业特性及特点, 把控不同的视觉风格并独立完成产品视觉设计；\n' +
                    '4. 梳理产品设计框架, 打磨产品UI细节, 提升产品交互体验, 完善设计规范文档。',
                request: '1.喜欢、理解我们正在做的事,并有自己的看法与见解；\n' +
                    '2.本科艺术院校以上学历,参与过起码一次完整项目产品系列的相关设计工作,对视觉 UI 设计有激情和创新精神；\n' +
                    '3.优秀的视觉审美,了解Web及 Mobile领域在当下的设计趋势；\n' +
                    '4.专业的视觉设计表现力和创意能力,能阐述具有说服力的设计理论,有反复打磨设计的耐心；\n' +
                    '5.擅长一款可独当一面的设计工具,如 Sketch、 Photoshop、 illustrator…；\n' +
                    '6.自主驱动力强,具有跨团队协作能力。',
                require: '1.是 Dribbble Player 有插画能力；\n' +
                    '2.请提供你认为最棒的PDF作品集或链接。'
            }
        ]
    },
]
class Department extends Component {
    constructor() {
        super()
        this.state = {
            hover: false,
        }
    }

    handleImgHovered() {
        this.setState({
            hover: true
        })
    }

    handleImgUnhovered() {
        this.setState({
            hover: false
        })
    }

    handlePosition() {
        if (this.props.isOpen) {
            this.props.isOpen(this.props.id)
        }
    }

    render() {
        const {hover} = this.state
        const {imgSrc, imgSrc_hover, department, id, checkId} = this.props
        return (
            <div className={`job-field-department ${id % 3 == 0 ? 'departmentMobileRight' : 'departmentMobileLeft'}`}>
                <img className="departmentImg"
                     src={id == checkId ? imgSrc_hover : hover ? imgSrc_hover : imgSrc}
                     width='62.4%'
                     style={{opacity:(hover?id == checkId?'1':'.6':'1')}}
                     onMouseEnter={this.handleImgHovered.bind(this)}
                     onMouseLeave={this.handleImgUnhovered.bind(this)}
                     onClick={this.handlePosition.bind(this)}
                />
                <div className={`${id == 1 ? 'departmentLeft' : id == 6 ? 'departmentRight' : 'departmentState'}`}
                     style={{
                         background: (id == checkId ? '#57A9FF' : '#F5F5F5'),
                         color: (id == checkId ? '#FFFFFF' : '#3B3F44')
                     }}
                     onMouseEnter={this.handleImgHovered.bind(this)}
                     onMouseLeave={this.handleImgUnhovered.bind(this)}
                     onClick={this.handlePosition.bind(this)}
                >{department}</div>
            </div>
        )
    }
}
class Positions extends Component {
    constructor() {
        super()

    }

    render() {
        const {device} = this.props
        const {positions} = this.props
        return (
            <div className="job-field-positions">
                <div className="positionsLeft">
                    {
                        positions.filter((item,i) => (i%2==0)).map((data,index) => (
                            <Position  key={index}
                                       position={data.position}
                                      duty={data.duty}
                                      request={data.request}
                                      require={data.require}
                            />
                        ))
                    }
                </div>
                <div className="positionsRight">
                    {
                        positions.filter((item,i) => (i%2==1)).map((data,index) => (
                            <Position key={index}
                                      position={data.position}
                                      duty={data.duty}
                                      request={data.request}
                                      require={data.require}
                            />
                        ))
                    }
                </div>
                <div className="bottom" style={{
                    height: (device <= 750 ? '34.5px' : '80px'),
                    borderTop: (device <= 750 ? '0' : '0'),

                }}></div>
            </div>
        )
    }
}
class Position extends Component {
    constructor() {
        super()
        this.state = {
            spread: false
        }
    }

    handleSpread() {
        this.setState({
            spread: !this.state.spread
        })
    }

    render() {
        const {spread} = this.state
        const {position, duty, request, require} = this.props
        return (
            <div className="positionItem">
                {document.documentElement.clientWidth > 750 ?
                    <div className="position"
                         style={{
                             background: (spread ? 'url(./images/aboutImg/arrow_up_web.png)95% center / 20px no-repeat' :
                                 'url(./images/aboutImg/arrow_down_web.png)95% center / 20px no-repeat'),
                             backgroundSize: '20px'
                         }}
                         onClick={this.handleSpread.bind(this)}
                    >{position}</div>
                    :
                    <div className="position"
                         style={{
                             background: (spread ? 'url(./images/aboutImg/arrow_up_mobile.png)95% center / 20px no-repeat' :
                                 'url(./images/aboutImg/arrow_down_mobile.png)95% center / 20px no-repeat'),
                             backgroundSize: '20px'
                         }}
                         onClick={this.handleSpread.bind(this)}
                    >{position}</div>}
                <div className="detailBox"
                     style={{display: (spread ? 'block' : 'none')}}
                >
                    <p>{position == '高级运营经理/运营总监' ? '运营经理级别' : '岗位职责'}</p>
                    <pre className="detail-field-tab"
                    >{duty}</pre>
                    <p>{position == '高级运营经理/运营总监' ? '运营总监级别' : '任职要求'}</p>
                    <pre className="detail-field-tab">{request}</pre>
                    {require!=null ? <div><p>{position == '高级运营经理/运营总监' ? '胜任力模型' : '投简历要求'}</p>
                        <pre className="detail-field-tab">{require}</pre></div> : <div></div>}
                </div>
            </div>
        )
    }
}
class JobBox extends Component {
    constructor() {
        super()
        this.state = {
            checkId: 1
        }
    }

    handleOpen(id) {
        this.setState({
            checkId: id
        })
    }

    render() {
        const {device} = this.props
        const {checkId} = this.state
        return (
            <div className="JobBox">
                <div className="departmentBox">
                    {
                        jobClass.map((item, i) => (
                            <Department
                                key={i}
                                department={item.department}
                                id={item.id}
                                checkId={checkId}
                                isOpen={this.handleOpen.bind(this)}
                            />
                        ))
                    }
                </div>
                <Positions positions={jobClass[checkId - 1].positions}
                           device={device}
                />
            </div>
        )
    }
}
export default JobBox