const fs = require('fs')
const path = require('path')

const filesToUpdate = ["tutorial.md"]
const newVersion = process.argv[2]

for (let fileToUpdate of filesToUpdate) {
    const fullPath = path.join('.',fileToUpdate)
    const fileContent = fs.readFileSync(fullPath,'utf8')

    const updatedContent = updateVersion(fileContent)

    fs.writeFileSync(fullPath,updatedContent)
}

function updateVersion(fileContent) {
    const regex = /npm\/hulipaa-ui@\d+[\.\d]*[\.\d]*/g;
    const newString = `npm/hulipaa-ui@${newVersion}`

    return fileContent.replaceAll(regex,newString)
}
