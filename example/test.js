const Katana = require("../src");

const blade = new Katana("./store.json", "./libary.json");
process.addListener("beforeExit", () => {
	blade.closeDB();
});

console.log(blade.get("greeting"));
// blade.push("Hello World!", "greeting");
// let x = blade.encode("greeting");
// console.log(x);
// let z = blade.decode(x);
// console.log(z);
