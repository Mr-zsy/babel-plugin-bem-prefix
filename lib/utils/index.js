function humpToEnDash(name) {
    name = name.replace(/([A-Z])/g,"-$1").toLowerCase();
    if (name[0] === '-') {
        name = name.slice(1)
    }
    return name;
}

module.exports = {
    humpToEnDash
}