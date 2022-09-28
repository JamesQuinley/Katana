const Katana = require("../src");

const blade = new Katana("./store.json", "./libary.json");
process.addListener("beforeExit", () => {
	blade.closeDB();
});

blade.push("Hello World!", "greeting");
console.log(blade.get("greeting"));
