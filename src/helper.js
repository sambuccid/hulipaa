// !!THERE IS EXACLTY THE SAME FUNCTION IN FRONT-END AND THEY NEED TO STAY THE SAME!!
function normaliseAndLowecase(str) {
    return str.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,'')
}


module.exports = {
    normaliseAndLowecase
};