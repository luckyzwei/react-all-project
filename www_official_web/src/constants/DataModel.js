export const animationDatas = [
    {
        title: '高效便捷的客群管理工具',
        text: '便捷的 24 小时顾客社群自动化管理与服务平台\n智能 AI 与人工对话无缝衔接，提高顾客响应效率\n高效管理比例，顾客服务覆盖可超 1：10,000 人',
        imgArr: ["./cartoonImages/rocket.png", "./cartoonImages/1.png", "./cartoonImages/smog.png", "./cartoonImages/ring.png", "./cartoonImages/card.png", "./cartoonImages/ball.png"],
        canvasBoxStyle:{top:'18.33%'},
        animation: function (canvas, imgs) {
            var ctx2 = canvas.getContext('2d'); //手动卡片+火箭

            var rocket = imgs[0];
            var computer = imgs[1];
            var smog = imgs[2];
            var ring = imgs[3];
            var card = imgs[4];
            var ball = imgs[5];
            var rockUp = true;
            var rocketH = 160; //3：火箭上升
            var ringA = 10;
            var cardR = true;
            var cardW = 20;
            var ballY = 235;

            function init() {
                // 动画3：手动卡片+火箭
                ctx2.drawImage(computer, 25, 15, 370, 290);
                rocketUp();
            }

            function rocketUp() { //火箭
                ringA += 10;
                ctx2.clearRect(0, 0, 480, 320);
                ctx2.drawImage(computer, 25, 15, 398, 290);
                ctx2.save();
                ctx2.translate(73, 240);
                ctx2.rotate(ringA * Math.PI / 180);
                ctx2.drawImage(ring, -27.2, -27, 54, 54);
                ctx2.restore();

                //火箭
                if (rockUp) {
                    rocketH -= 1.5;
                    if (rocketH > 120) {
                        ctx2.drawImage(rocket, 345, rocketH, 50, 80);
                        ctx2.drawImage(ball, 360, rocketH + 90, 20, 20);
                        ctx2.save();
                        ctx2.globalAlpha = (160 - rocketH) / 60;
                        ctx2.drawImage(smog, 320, 235, 110, 48);
                        ctx2.restore();
                    } else if (rocketH == 119.5) {
                        ctx2.drawImage(rocket, 345, rocketH, 50, 80);
                        ctx2.drawImage(ball, 360, rocketH + 90, 20, 20);
                        rockUp = false;

                    } else {
                        rockUp = false;
                    }
                } else {
                    rocketH += 1.5;
                    if (rocketH < 160) {
                        ctx2.drawImage(rocket, 345, rocketH, 50, 80);
                        ctx2.drawImage(ball, 360, rocketH + 90, 20, 20);
                        ctx2.save();
                        ctx2.globalAlpha = (160 - rocketH) / 60;
                        ctx2.drawImage(smog, 320, 235, 110, 48);
                        ctx2.restore();
                    } else if (rocketH == 160) {
                        ctx2.drawImage(rocket, 345, rocketH, 50, 80);
                        ctx2.drawImage(ball, 360, rocketH + 90, 20, 20);
                        rockUp = true;
                    } else {
                        rockUp = true;
                    }

                }
                //卡片
                if (cardR) {
                    if (cardW < 80) {
                        cardW += 2;
                        ctx2.drawImage(card, cardW, 35, 120, 100);
                    } else if (cardW == 80) {
                        ctx2.drawImage(card, cardW, 35, 120, 100);
                        cardR = false;
                    } else {
                        cardR = false;
                    }
                } else {
                    if (cardW > 20) {
                        cardW -= 2;
                        ctx2.drawImage(card, cardW, 35, 120, 100);
                    } else if (cardW == 20) {
                        ctx2.drawImage(card, cardW, 35, 120, 100);
                        cardR = true;
                    } else {
                        cardR = true;

                    }
                }
                setTimeout(rocketUp, 50)
            }
            init();
        }
    },
    {
        title: '您随身携带的销售百科全书',
        text: '自定义行业和产品知识库，人工智能辅助问答服务\n分享同行业权威专家知识库，共享话术并实时学习\nAPI 连接第三方工具和内容平台',
        imgArr: ["./cartoonImages/2.png", "./cartoonImages/book.png", "./cartoonImages/pao.png", "./cartoonImages/arrow.png"],
        canvasBoxStyle:{top:'21.33%'},
        animation: function (canvas, imgs) {
            var ctx1 = canvas.getContext('2d'); //书本+箭头+时钟

            var upY = 170; //2：上升箭头位置Y
            var pW = 15; //2：气泡宽度
            var dx = 400; //2：书本位置x
            var bx = 327;
            var flag = true;
            var arrowUp = true;
            var arrowbg = imgs[0];
            var book = imgs[1];
            var pao = imgs[2];
            var arrow = imgs[3];

            function init() {
                //动画2：书本+箭头+时钟
                ctx1.translate(30, 0)
                ctx1.drawImage(arrowbg, 0, 10, 370, 290);
                ctx1.drawImage(book, 327, 140, 60, 76);
                arrowBg();
            }

            function arrowBg() { //箭头
                pW += 2;
                ctx1.clearRect(-30, 0, 720, 480);
                ctx1.drawImage(arrowbg, 0, 10, 370, 290);

                //书本平移
                if (flag) {
                    dx -= 1.5;
                    bx += 1.5;

                    //book1右移
                    if (bx > 327) {
                        ctx1.drawImage(book, bx, 140, 60, 76);
                    } else if (bx = 363) {
                        ctx1.drawImage(book, bx, 140, 60, 76);
                        flag = false;
                    } else {
                        flag = false;
                    }
                    //书本2左移
                    if (dx > 373) {
                        ctx1.drawImage(book, dx, 160, 60, 76);

                    } else if (dx = 373) {
                        ctx1.drawImage(book, dx, 160, 60, 76);
                        flag = false;
                    } else {
                        flag = false;
                    }
                } else {
                    dx += 1.5;
                    bx -= 1.5;
                    //book1左移
                    if (bx <= 363) {
                        ctx1.drawImage(book, bx, 140, 60, 76);
                    } else if (bx = 363) {
                        ctx1.drawImage(book, bx, 140, 60, 76);

                        flag = false;
                    } else {
                        flag = false;
                    }
                    // 书本2右移
                    if (dx <= 400) {
                        ctx1.drawImage(book, dx, 160, 60, 76);

                    } else if (dx = 400) {
                        ctx1.drawImage(book, dx, 160, 60, 76);
                        flag = true;
                    } else {
                        flag = true;
                    }

                }

                // 箭头上升
                if (arrowUp) {
                    upY -= 1;
                    if (upY > 150) {
                        ctx1.drawImage(arrow, 150, upY, 76, 86);

                    } else if (upY == 150) {
                        ctx1.drawImage(arrow, 150, upY, 76, 86);
                        arrowUp = false;
                    } else {
                        // upY = 188;
                        arrowUp = false;
                    }
                } else {
                    upY += 1;
                    if (upY < 180) {
                        ctx1.drawImage(arrow, 150, upY, 76, 86);
                    } else if (upY == 180) {
                        ctx1.drawImage(arrow, 150, upY, 76, 86);
                        arrowUp = true;
                    } else {
                        arrowUp = true;
                    }
                }


                // 气泡膨胀
                if (pW <= 61) {
                    ctx1.drawImage(pao, 63 - pW, 193 - pW, pW, pW + 2);
                } else {
                    pW = 15;
                }
                setTimeout(arrowBg, 50);

            }
            init()
        }
    },
    {
        title: '贴心的顾客个性化服务',
        text: '为每一位销售人员装备 Mini 个性化推荐引擎\n连接线上线下用户洞察，提供专属顾客服务\n多场景触发 Push ，决不放过任何销售机会',
        imgArr: ["./cartoonImages/roll.png", "./cartoonImages/3.png"],
        canvasBoxStyle:{top:'24.33%'},
        animation: function (canvas, imgs) {
            var ctx = canvas.getContext("2d"); //滚轴+折线图

            var x = 375; //1：折线位置x
            var angle = 10;
            var gouX = 50;
            var arrowX = 443;

            var roll = imgs[0];
            var img = imgs[1];

            function init(imgs) {
                //动画1:滚轴
                myRotate();
            }

            function myRotate() { //滚轴
                angle += 10;
                ctx.clearRect(0, 0, 480, 300);
                ctx.drawImage(img, 36, 7, 405, 290);
                ctx.save();
                ctx.translate(340, 170);
                ctx.rotate(angle * Math.PI / 180);
                ctx.drawImage(roll, -45, -45, 88, 88);
                ctx.restore();

                ctx.strokeStyle = "#5bc88c"; //对勾描边
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(50, 235);
                gouX += 1;

                if (gouX <= 57) {
                    ctx.lineTo(50 + 7 / 10 * (gouX - 50), 235 + 10 / 10 * (gouX - 50));
                } else if (gouX <= 68) {
                    ctx.lineTo(57, 244);
                    ctx.lineTo(57 + 11 / 10 * (gouX - 57), 244 - 18 / 10 * (gouX - 57));
                } else {
                    gouX = 50;
                }

                ctx.stroke();
                ctx.strokeStyle = "#2D9EFA"; //折线图
                ctx.lineCap = "round";
                ctx.beginPath();
                ctx.moveTo(375, 253);


                x += 1.1;
                if (x <= 385) {
                    ctx.lineTo(375 + 10 / 10 * (x - 375), 253 - 18 / 10 * (x - 375));
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(370 + 10 / 10 * (x - 375), 254 - 18 / 10 * (x - 375)); // 上描边箭头
                    ctx.lineTo(375 + 10 / 10 * (x - 375), 253 - 18 / 10 * (x - 375));
                    ctx.lineTo(376 + 10 / 10 * (x - 375), 260 - 18 / 10 * (x - 375));
                    ctx.stroke();

                } else if (x <= 405) {
                    ctx.lineTo(385, 235);
                    ctx.lineTo(385 + 20 / 20 * (x - 385), 235 + 15 / 20 * (x - 385));
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(383 + 20 / 20 * (x - 385), 228 + 15 / 20 * (x - 385)); // 描边箭头
                    ctx.lineTo(385 + 20 / 20 * (x - 385), 235 + 15 / 20 * (x - 385));
                    ctx.lineTo(380 + 20 / 20 * (x - 385), 236 + 15 / 20 * (x - 385));
                    ctx.stroke();

                } else if (x <= 420) {
                    ctx.lineTo(385, 235);
                    ctx.lineTo(405, 250);
                    ctx.lineTo(405 + 15 / 15 * (x - 405), 250 - 20 / 15 * (x - 405));
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(400 + 15 / 15 * (x - 405), 250 - 20 / 15 * (x - 405)); // 上描边箭头
                    ctx.lineTo(405 + 15 / 15 * (x - 405), 250 - 20 / 15 * (x - 405));
                    ctx.lineTo(406 + 15 / 15 * (x - 405), 257 - 20 / 15 * (x - 405));
                    ctx.stroke();

                } else if (x <= 433) {
                    ctx.lineTo(385, 235);
                    ctx.lineTo(405, 250);
                    ctx.lineTo(420, 230);
                    ctx.lineTo(420 + 13 / 13 * (x - 420), 230 + 10 / 13 * (x - 420));
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(420 + 13 / 13 * (x - 420), 225 + 10 / 13 * (x - 420)); // 描边箭头
                    ctx.lineTo(420 + 13 / 13 * (x - 420), 230 + 10 / 13 * (x - 420));
                    ctx.lineTo(415 + 13 / 13 * (x - 420), 231 + 10 / 13 * (x - 420));
                    ctx.stroke();

                } else if (x <= 448) {
                    ctx.lineTo(385, 235);
                    ctx.lineTo(405, 250);
                    ctx.lineTo(420, 230);
                    ctx.lineTo(433, 240);
                    ctx.lineTo(433 + 15 / 15 * (x - 433), 240 - 20 / 15 * (x - 433));
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(427 + 15 / 15 * (x - 433), 240 - 20 / 15 * (x - 433)); // 上描边箭头
                    ctx.lineTo(433 + 15 / 15 * (x - 433), 240 - 20 / 15 * (x - 433));
                    ctx.lineTo(434 + 15 / 15 * (x - 433), 247 - 20 / 15 * (x - 433));
                    ctx.stroke();

                } else {
                    x = 375;
                    ctx.stroke();
                }

                setTimeout(myRotate, 50);

            }
            init()
        }
    }
]

export const basePath = '';