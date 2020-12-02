class UI {
    setResult(q, val) {
        q.innerHTML = '';
        q.appendChild(document.createTextNode(val));
    }
    setDate(q) {
        const tm = moment().format("dddd, MMMM Do YYYY");
        q.appendChild(document.createTextNode(tm));
    }

}