const fs = require('fs');
const csv = require('csvtojson');

const getBytes = async filepath => {
    let bytes = await csv({
        ignoreColumns: /^$/,
        output: 'csv'
    }).fromFile(filepath);

    return JSON.stringify([].concat.apply([], bytes).filter(str => !!str));
};

(async () => {
    let uBytes = await getBytes('./BA Docs - U.csv');
    let jBytes = await getBytes('./BA Docs - J.csv');

    let output = (
`data = {
    "U": ${uBytes},
    "J": ${jBytes}
}
`
    );
    let outputPath = '../data.js';
    fs.writeFile(outputPath, output, 'utf8', err => {
        if (err) {
            throw err;
        }
        console.log(`done ➡️    ${outputPath}`);
    });
})();
