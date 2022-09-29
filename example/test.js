const Katana = require("../src/index");
const blade = new Katana("./db", { encrypt: true });

// blade.purgeState();
// blade.push("Hello World!", "greeting");
console.log(blade.get("greeting"));