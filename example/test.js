const Katana = require("../src/index");
const blade = new Katana("./store.json", "./library.json");

process.addListener("beforeExit", () => {
	blade.saveState();
});