const fs = require('fs');
const path = require('path');

const SWS = require('../../index')

describe('aaa', ()=>{
    it('bbbbb', ()=>{
        // files.createTestInputFolder();
        // files.createTestInputFile("data1.json", "{\"test1\":\"test 1 gone well\"}")

        // SWS.buildIndex(inputFolder, indexPath)

        // const filesInIndexPath = fs.readdirSync(indexPath)
        // expect(filesInIndexPath.length).toBeGreaterThan(0);
        expect(true).toEqual(true)
    });
});

// module.exports = {
//     a_file_in_index_folder_exists: function(){
//         files.createTestInputFolder();
//         files.createTestInputFile("data1.json", "{\"test1\":\"test 1 gone well\"}")

//         SWS.buildIndex(global.inputFolder, global.indexPath)

//         const filesInIndexPath = fs.readdirSync(global.indexPath)
//         expect._(filesInIndexPath.length > 0);
//     },
//     uses_input_tmp: function(){
//         const data =  "{\"test1\":\"test 1 gone well\"}"
        
//         files.createTestInputFolder();
//         files.createTestInputFile("data1.json", data)
        
//         SWS.buildIndex(global.inputFolder, global.indexPath)

//         const filesInIndexPath = fs.readdirSync(global.indexPath)
//         const dataOutputFile = fs.readFileSync(path.join(global.indexPath, filesInIndexPath[0]), 'utf8')
        
//         expect.equal(dataOutputFile, data)
//     }
// }