const Katana = require("../src/index");
const blade = new Katana("./db", { encrypt: true });

blade.push("Hello World!", "greeting");