const Katana = require("../src");

const blade = new Katana("./store.json", "./libary.json");
process.addListener("beforeExit", () => {
	blade.closeDB();
});

blade.purgeDB();
blade.push("Hello World!", "greeting");
blade.push("Bye World!", "goodbye");
blade.closeDB();
console.log(blade.exportData());
process.exit();

// console.log([blade.get("greeting"), blade.get("goodbye")]);