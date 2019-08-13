const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<p>Hello world</p><p>hello</p>`);
console.log(dom.window.document.getElementsByTagName("p")[0].innerHTML);