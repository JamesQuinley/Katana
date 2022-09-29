const { Katana } = require("../src/index");
const blade = new Katana("./db", { encrypt: true, saveToDisk: true });

blade.purgeState();
for (let index = 0; index < 1; index++) {
	blade.push("Hello!", `${Math.random() * 10}`);
}