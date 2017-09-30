"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var NativeStorageServiceProvider = (function () {
    function NativeStorageServiceProvider(storage) {
        this.storage = storage;
    }
    NativeStorageServiceProvider.prototype.add = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.set(key, value)
                .then(function () { return resolve(value); }, function (error) { return reject(error); });
        });
    };
    NativeStorageServiceProvider.prototype.get = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.ready().then(function () {
                _this.storage.get(key)
                    .then(function (data) { return resolve(data); }, function (error) { return reject(error); });
            });
        });
    };
    NativeStorageServiceProvider.prototype.remove = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.remove(key)
                .then(function () { return resolve(true); }, function (error) { return reject(error); });
        });
    };
    NativeStorageServiceProvider.prototype.clear = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.clear()
                .then(function () { return resolve(true); }, function (error) { return reject(error); });
        });
    };
    return NativeStorageServiceProvider;
}());
NativeStorageServiceProvider = __decorate([
    core_1.Injectable()
], NativeStorageServiceProvider);
exports.NativeStorageServiceProvider = NativeStorageServiceProvider;
