const Katana = require("../src");

const blade = new Katana("./store.json", "./libary.json");
process.addListener("beforeExit", () => {
	blade.closeDB();
});

blade.eraseEverythingIGiveUp();
blade.push("Hello World!", "greeting");
blade.push("Bye World!", "goodbye");

console.log([blade.get("greeting"), blade.get("goodbye")]);