// !!THERE IS EXACLTY THE SAME FUNCTION IN FRONT-END AND THEY NEED TO STAY THE SAME!!
function normaliseAndLowecase(str) {
    return str.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,'')
}

// !!THERE IS EXACLTY THE SAME FUNCTION IN FRONT-END AND THEY NEED TO STAY THE SAME!!
function splitTextInWords(text) {
    const symbolsRegexp = new RegExp('[A-Za-zÀ-ÖØ-öø-ÿ0-9\-_]+','g')
    return [...text.matchAll(symbolsRegexp)].flat()
}


module.exports = {
    normaliseAndLowecase,
    splitTextInWords
};