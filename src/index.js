const fs = require("fs");

module.exports = class Katana {
	constructor(storPath, libPath) {
		this.path = storPath;
		this.libPath = libPath;
		this.store = [];
		this.library = {};

		if (fs.existsSync(this.path) && fs.existsSync(this.libPath)) {
			this.library = JSON.parse(fs.readFileSync(this.libPath, "utf8"));
			this.store = JSON.parse(fs.readFileSync(this.path, "utf8"));
			if (this.store.length != Object.keys(this.library).length) throw new Error("Store & Library Size Mismatch, Please manually repair!");
		}
	}

	push(data, key) {
		if (this.library[key]) throw new Error("Key already exists");
		this.store.push(data);
		this.library[key] = this.store.length - 1;
		var x = this.encode(this.store[this.library[key]]);
		this.store[this.library[key]] = x;
	}

	get(key) {
		if (this.store[this.library[key]] == undefined) throw new Error("Key does not exist");
		return this.decode(this.store[this.library[key]]);
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

	exportData() {
		return [this.library, this.store];
	}

	purgeState() {
		this.store = [];
		this.library = {};
		this.saveState();
	}

	saveState() {
		fs.writeFileSync(this.path, JSON.stringify(this.store));
		fs.writeFileSync(this.libPath, JSON.stringify(this.library));
	}
};