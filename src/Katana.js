/*
	Copyright (c) 2022 Michael Gummere
	All rights reserved.
	Redistribution and use in source and binary forms governed under the terms of the zlib/libpng License with Acknowledgement license.
*/

const fs = require("fs");
const path = require("path");

module.exports = class Katana {
	constructor(dbPath, options) {
		this.strPath = path.join(dbPath, "store.json");
		this.libPath = path.join(dbPath, "library.json");
		this.encryptOpt = {
			enable: options.encrypt,
			seedPath: path.join(dbPath, "seed.txt")
		};
		this.store = [];
		this.library = {};

		if (options.saveToDisk) {
			if (fs.existsSync(this.strPath) && fs.existsSync(this.libPath)) {
				this.library = JSON.parse(fs.readFileSync(this.libPath, "utf8"));
				this.store = JSON.parse(fs.readFileSync(this.strPath, "utf8"));
				if (this.encryptOpt.enable && fs.existsSync(this.encryptOpt.seedPath)) {
					this.encryptOpt.seed = fs.readFileSync(this.encryptOpt.seedPath, "utf8");
					this.decrypt();
				}
				if (this.store.length != Object.keys(this.library).length) throw new Error("Store & Library Size Mismatch, Please manually repair!");
			}

			process.addListener("beforeExit", () => {
				if (this.encryptOpt.enable) this.encrypt();
				this.saveState();
			});
		}
	}

	push(data, key) {
		if (this.library[key]) throw new Error("Key already exists");
		this.store.push(data);
		this.library[key] = this.store.length - 1;
		this.store[this.library[key]] = this.encode(this.store[this.library[key]]);
	}

	get(key) {
		if (this.store[this.library[key]] == undefined) throw new Error("Key does not exist");
		return this.decode(this.store[this.library[key]]);
	}

	encode(entry) {
		return entry.split("").map((char) => char.charCodeAt(0)
		);
	}

	decode(array) {
		return array.map((num) => String.fromCharCode(num)).join("");
	}

	encrypt() {
		let seed = Math.fround(Math.random() * 100000);
		console.log(seed);
		this.store = this.store.map(entry => {
			return entry.map((num) => num * seed);
		});
		fs.writeFileSync(this.encryptOpt.seedPath, `${seed}`);
	}

	decrypt() {
		this.store = this.store.map((entry) => {
			return entry.map((num) => num / this.encryptOpt.seed);
		});
	}


	exportState() {
		return [this.library, this.store, this];
	}

	purgeState() {
		this.store = [];
		this.library = {};
	}

	saveState() {
		fs.writeFileSync(this.strPath, JSON.stringify(this.store));
		fs.writeFileSync(this.libPath, JSON.stringify(this.library));
	}
};