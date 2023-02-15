export function bindFunction(fun,...params) {
    return fun.bind(null,...params);
}

// Shortens text adding '...' where it cuts
// it doesn't cut the text midword, it will exclude the word from the text
// if from and to are the same indexes it throws an exception
// if the to index is outside the string it won't cut any text, eg.
// - if to is less than 0 it doesn't cut the text
// - if to is bigger than the string lenght it doesn't cut the text
export function shortenText({ from,to,text }) {
    if (from == to) throw "Unexpected parameter"
    if (from > to) {
        if (to <= 0) return text

        //try to avoid half-words in text, when cutting text it should not cut words in half
        //find first index not mid word
        while (to < text.length && isIndexMidWord(to,text)) {
            to++
        }
        text = text.substring(to)
        text = '...' + text
    } else if (to > from) {
        if (to >= text.length) return text

        //try to avoid half-words in formatted text, when cutting text it should not cut words in half
        //find first index not mid word
        while (to != 0 && isIndexMidWord(to,text)) {
            to--
        }
        text = text.substring(0,to)
        text = text + '...'
    }

    return text
}



export function isIndexMidWord(idx,text) {
    if (!isCharPartOfWord(text[idx])) {
        return false
    }
    if (idx > 0 && isCharPartOfWord(text[idx - 1])) {
        return true
    }
    if (idx > text.length && isCharPartOfWord(text[idx + 1])) {
        return true
    }

    return false;
}

export function isCharPartOfWord(char) {
    if (char.length > 1) throw "passed input contains more than 1 character"

    if (char === '_' || char === '-' || char === "'") {
        return true;
    }
    if (new RegExp('[A-Za-zÀ-ÖØ-öø-ÿ]').test(char)) {
        return true
    }

    return false
}