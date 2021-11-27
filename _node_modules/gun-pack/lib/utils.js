#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../../../static')
const ifExist = fs.existsSync(dir);

function clearStatic() {
    function deleteAllFiles(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const curPath = path.join(dir, file);
            if (fs.statSync(curPath).isDirectory()) {
                deleteAllFiles(curPath)
            } else {
                fs.unlinkSync(curPath)
            }
        }
        fs.rmdirSync(dir);
    }

    if (ifExist) {
        deleteAllFiles(dir)
    } else {
    }
}


// copy public
const copy = (origin, target) => {
    let paths = fs.readdirSync(origin)
    paths.forEach(p => {
        const o = `${origin}/${p}`
        const t = `${target}/${p}`
        fs.stat(o, (err, stats) => {
            if (stats.isFile()) {
                fs.readFile(o, (err, data) => {
                    fs.writeFileSync(t, data)
                })
            } else {
                fs.access(t, (err) => {
                    if (err) {
                        fs.mkdirSync(t, {recursive: true})
                        copy(o, t)
                    }

                })

            }
        })
    })
}


module.exports = {
    clearStatic,
    copy
}
