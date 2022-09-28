const fs = require("fs");
const alphaToNumber = require("./alphaToNumber.json");
const numberToAlpha = require("./numberToAlpha.json");

module.exports = class Katana {
	constructor(storPath, libPath) {
		this.path = storPath;
		this.libPath = libPath;
		this.store = [];
		this.library = {};

		this.store = JSON.parse(fs.readFileSync(this.path, "utf8"));
		this.library = JSON.parse(fs.readFileSync(this.libPath, "utf8"));
	}

	push(data, key) {
		if(this.library[key]) throw new Error("Key already exists");
		this.store.push(data);
		this.library[key] = this.store.length - 1;
		var x = this.encode(key);
		this.store[this.library[key]] = x;
	}

	encode(entry) {
		let newray = [];
		this.store[this.library[entry]].split("").forEach((char) => {
			let x = alphaToNumber[char];
			newray.push(x);
		});
		return newray;
	}

	decode(array) {
		let newray = [];
		array.forEach((num) => {
			let x = numberToAlpha[num];
			newray.push(x);
		});
		newray = newray.join("");
		return newray;
	}

	get(key) {
		return this.decode(this.store[this.library[key]]);
	}

	closeDB() {
		if (this.scrambleSet == true) this.scramble(this.scramKey);
		this.saveState();
		this.library = null;
		this.store = null;
	}

	saveState() {
		fs.writeFileSync(this.path, JSON.stringify(this.store));
		fs.writeFileSync(this.libPath, JSON.stringify(this.library));
	}
};