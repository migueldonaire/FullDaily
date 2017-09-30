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
var Errors_module_1 = require("../../../error/Errors.module.");
var LocalStorageServiceProvider = (function () {
    function LocalStorageServiceProvider() {
        this.localStorageSupported = typeof window['localStorage'] != "undefined" && window['localStorage'] != null;
    }
    LocalStorageServiceProvider.prototype.add = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.localStorageSupported) {
                localStorage.setItem(key, value);
                resolve(value);
            }
            else {
                reject(new Errors_module_1.Errors.NotLocalStorage());
            }
        });
    };
    LocalStorageServiceProvider.prototype.get = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.localStorageSupported) {
                var item = localStorage.getItem(key);
                if (item == null) {
                    reject(new Errors_module_1.Errors.DataNotExist());
                }
                else {
                    resolve(item);
                }
            }
            else {
                reject(new Errors_module_1.Errors.NotLocalStorage());
            }
        });
    };
    LocalStorageServiceProvider.prototype.remove = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.localStorageSupported) {
                localStorage.removeItem(key);
                resolve(true);
            }
            else {
                reject(new Errors_module_1.Errors.NotLocalStorage());
            }
        });
    };
    LocalStorageServiceProvider.prototype.clear = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.localStorageSupported) {
                localStorage.clear();
                resolve(true);
            }
            else {
                reject(new Errors_module_1.Errors.NotLocalStorage());
            }
        });
    };
    return LocalStorageServiceProvider;
}());
LocalStorageServiceProvider = __decorate([
    core_1.Injectable()
], LocalStorageServiceProvider);
exports.LocalStorageServiceProvider = LocalStorageServiceProvider;
