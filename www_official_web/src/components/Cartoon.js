import React, { Component, PropTypes } from 'react'
const Cartoon = () => {
  return (
        <div id="robot" className="robot" style = {{width:'406px',height:'393px',float:'right',margin:'102px 63px 0 0',position:'relative'}} >
            <div className="dialog">
                <img src="./cartoonImages/talkForm1.png" alt="" className="dialogbox" style = {{width:'162px',position:'absolute',left:'93px',top:'0',zIndex:'1'}}/>
                <img src="./cartoonImages/talkForm2.png" alt="" className="dialogbox1" style = {{width:'111px',position:'absolute',left:'0',top:'110px',zIndex:'1'}}/>
                <img src="./cartoonImages/talkForm3.png" alt="" className="dialogbox2" style = {{width:'183px',position:'absolute',right:'0',top:'103px',zIndex:'1'}}/>
            </div>
            <div className="robot-bg">
                <div className="wifi" style={{position:'absolute',left:'137px',top:'69px',zIndex:'2',transform:'scale(.7)'}}>
                    <img src="./cartoonImages/signal3.png" className="wifi-pic3" style = {{width:'auto',marginTop:'20px'}}/>
                    <img src="./cartoonImages/signal2.png" className="wifi-pic2" style = {{width:'auto',marginTop:'20px'}}/>
                    <img src="./cartoonImages/signal1.png" className="wifi-pic1" style = {{width:'auto',marginTop:'20px'}}/>
                </div>
                <img src="./cartoonImages/robot.jpg" className="pic-robot" style = {{width:'359px',height:'326px',position:'absolute',left:'0',bottom:'0',zIndex:'0'}}/>
            </div>
        </div>
  )
}

export default Cartoon
