const fs = require("fs");

module.exports = class Katana {
	constructor(storPath, libPath) {
		this.path = storPath;
		this.libPath = libPath;
		this.store = [];
		this.library = {};

		this.library = JSON.parse(fs.readFileSync(this.libPath, "utf8"));
		this.store = JSON.parse(fs.readFileSync(this.path, "utf8"));
		if(this.store.length != Object.keys(this.library).length) throw new Error("Store & Library Size Mismatch, Please manually repair!");
	}

	push(data, key) {
		if(this.library[key]) throw new Error("Key already exists");
		this.store.push(data);
		this.library[key] = this.store.length - 1;
		var x = this.encode(this.store[this.library[key]]);
		this.store[this.library[key]] = x;
	}

	encode(entry) {
		let newray = [];
		entry.split("").forEach((char) => {
			newray.push(char.charCodeAt(0));
		});
		return newray;
	}

	decode(array) {
		let newray = [];
		array.forEach((num) => {
			newray.push(String.fromCharCode(num));
		});
		newray = newray.join("");
		return newray;
	}

	get(key) {
		if(this.store[this.library[key]] == undefined) throw new Error("Key does not exist");
		let x = this.store[this.library[key]];
		return this.decode(x);
	}

	exportData() {
		return [this.library, this.store];
	}

	eraseEverythingIGiveUp() {
		this.store = [];
		this.library = {};
		this.saveState();
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