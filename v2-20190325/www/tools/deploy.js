const evJson = JSON.parse(process.env.npm_config_argv)
const param = evJson.original[evJson.original.length-1].slice(2)
console.log(`env--${param}`);
var configJson = require('../configPath.json');
var _  = require('lodash')
var realobj = configJson[param]
var fs = require('fs')

const html = (modules) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Cache" content="no-cache">
    <link rel="icon" href="https://cloud.gemii.cc/v2/favicon.png" type="image/x-icon"/>
    ${modules}
    <script src='https://tj.gemii.cc/tj.js'></script>
    <title>LizCloud</title>
    <script>
      var G_SDK = new SDK('${param}','lizicloud')
      G_SDK.loading()
      window.onload = function(){
          G_SDK.loaded()
      }
    </script>
  </head>
  <body>
    <div class="app" id="root"></div>
    <div class="app" id="modal-root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run "npm start" in this folder.
      To create a production bundle, use "npm run build".
    -->
  </body>
</html>
`
// 插入css
fs.readdir(`${process.cwd()}/public/css`,(err,files) => {
// /(?<=_)(\S*)(?=.css)/g
    let regexp = /_(\S*)(?=.css)/gi;

    const files_sorted = _.sortBy(files.filter(v => v!='.DS_Store'),(o)=>{
      let _value = o.match(regexp)[0]
      return parseInt(_value.slice(1,_value.length))
      }
    )
    const cssLinks =
    files_sorted
    .map(v =>
      `<link rel="stylesheet" href="${realobj.accessPath}/css/${v}">`
    )
    .join('\n')

    const wholeHtml = html(cssLinks)
    fs.writeFile(`${process.cwd()}/public/index.html`, wholeHtml, 'utf8',  (err) => {
       if (err) return console.log(err);
    });

    console.log('css -- inserted');
  })
// 替换pathNam
fs.readFile(`${process.cwd()}/src/constants/OriginName.js`,
'utf8', (err,data) => {
  if (err) {
    return console.log(err);
  }

  var regx = /ORIGIN_NAME = .*/

  var data = data.replace(regx,
    `ORIGIN_NAME = '${realobj.serverPath.originName}'`)

  fs.writeFile(`${process.cwd()}/src/constants/OriginName.js`, data, 'utf8',  (err) => {

     if (err) return console.log(err);

  });

  console.log('pathname -- changed');

})
// 替换image path
fs.readFile(`${process.cwd()}/src/styles/public.scss`,
'utf8', (err,data) => {
  if (err) {
    return console.log(err);
  }

  var regx = /\$img-path: .*/

  var data = data.replace(regx,
    `$img-path: '${realobj.serverPath.imgPath}';`)

  fs.writeFile(`${process.cwd()}/src/styles/public.scss`, data, 'utf8',  (err) => {

     if (err) return console.log(err);

  });

  console.log('imagepath -- changed');

})

// 替换webpack打包path
fs.readFile(`${process.cwd()}/node_modules/react-scripts/config/paths.js`,
'utf8', (err,data) => {
  if (err) {
    return console.log(err);
  }
  var regx = /envPublicUrl = .*/
  var data = data.replace(regx,
    `envPublicUrl = '${realobj.accessPath}'`)

  fs.writeFile(`${process.cwd()}/node_modules/react-scripts/config/paths.js`,   data, 'utf8',  (err) => {

     if (err) return console.log(err);

  });
  console.log('config-path -- changed');
})


// prod 生产
// test 测试
// dev 开发
// cloudinner 升级维护
// local 本地