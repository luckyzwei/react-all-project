import React from 'react'

export const LoadingSVG = () => {
    return (
        <svg className="lds-microsoft" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0)"><circle cx="73.801" cy="68.263" fill="#eef7ff" r="3" transform="rotate(17.6826 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.4s" begin="0s"></animateTransform>
            </circle><circle cx="68.263" cy="73.801" fill="#cde6ff" r="3" transform="rotate(28.874 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.4s" begin="-0.062s"></animateTransform>
            </circle><circle cx="61.481" cy="77.716" fill="#bdddff" r="3" transform="rotate(43.8374 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.4s" begin="-0.125s"></animateTransform>
            </circle><circle cx="53.916" cy="79.743" fill="#a1cfff" r="3" transform="rotate(62.4507 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.4s" begin="-0.187s"></animateTransform>
            </circle><circle cx="46.084" cy="79.743" fill="#83c0ff" r="3" transform="rotate(85.4577 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.4s" begin="-0.25s"></animateTransform>
            </circle><circle cx="38.519" cy="77.716" fill="#57aaff" r="3" transform="rotate(111.901 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.4s" begin="-0.312s"></animateTransform>
            </circle><circle cx="31.737" cy="73.801" fill="#3397ff" r="3" transform="rotate(141.905 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.4s" begin="-0.375s"></animateTransform>
            </circle><circle cx="26.199" cy="68.263" fill="#288bf2" r="3" transform="rotate(174.986 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.4s" begin="-0.437s"></animateTransform>
            </circle><animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;0 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.4s"></animateTransform></g>
        </svg>
    )
}

 const LoadingAnimationS = () => {
    return(
        <div className="LoadingAnimation loadingMoving" style = {{background:'white'}}>
            <div className="loadBox" style = {{top:'40%'}} style={{width:'80px'}}>
                <LoadingSVG />
                <div className="loadText" style={{color: "#58a7f8",fontSize: "14px",textAlign: "center",marginTop: "0px"}}>加载中...</div>
            </div>
        </div>
    )
}
export default LoadingAnimationS
