const fs = require('fs');
const join = require('path').join;

// 在 ./controllers 目录下直接写 js 文件
// // 获取 ./controllers 目录下所有除了 index.js 文件的文件名称
// const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js');
// // 创建一个 controllers Object对象
// const controllers = {};
// // 循环存储文件的数组
// for (const file of files) {
//     // 判断该数组下的文件是否是 js 文件
//     if (file.toLowerCase().endsWith('js')) {
//         // 是 js 文件，循环引入文件
//         const controller = require(`./${file}`);
//         // 获取 js 文件中的方法，统一向外暴露出去
//         controllers[`${file.replace(/\.js/, '')}`] = controller;
//     }
// }

// 在 ./controllers 目录下新建文件夹编写 js 文件，只能新建一级文件夹，不可以文件夹下再建文件夹，也不可以直接在 ./controllers 目录下新建 js 文件
// 保存 ./controllers 目录下，所有文件夹中的 js 文件的数组
let files = [];
// 保存 ./controllers 目录下所有文件夹的名称
let folder = [];
// 保存文件夹名称的 Flag 标识
let folderNameFlag = '';

/**
 * 循环拿到 ./controllers 目录下所有文件夹的名称和文件夹中的 js 文件
 * @param directoriesPath { String } [ 目录路径 ]
 */
let getAllDirs = (directoriesPath) => {
    let result = [];
    // 获取 ./controllers 目录下所有文件夹的名称
    const items = fs.readdirSync(directoriesPath).filter(file => file !== 'index.js');
    // map一个新数组
    items.map(item => {
        let temp = join(directoriesPath, item);
        // 判断当前路径目录下的内容是文件夹还是文件
        if(fs.statSync(temp).isDirectory()){
            // 文件夹
            // 存储当前文件夹的名字
            result.push( item );
            // 将文件夹的名称存储到文件夹文明标识中
            folderNameFlag = item;
            // 进入下一级文件夹访问
            result = result.concat(getAllDirs(temp));
        } else {
            // 文件
            // 将当前文件的目录名称存储到数组中
            folder.push(folderNameFlag);
            // 将文件名称存储到数组中
            files.push(item);
        }
    });
};
getAllDirs('./controllers');

// 创建一个 controllers Object对象
const controllers = {};
// 循环存储文件的数组
for (const i in files) {
    // 判断该数组下的文件是否是 js 文件
    if (files[i].toLowerCase().endsWith('js')) {
        // 是 js 文件，循环引入文件
        const controller = require(`./${folder[i]}/${files[i]}`);
        // 获取 js 文件中的方法，统一向外暴露出去
        controllers[`${files[i].replace(/\.js/, '')}`] = controller;
    }
}

module.exports = controllers;
