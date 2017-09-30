export module Errors{

  export function DefaultError() {
    this.name = "DefaultError";
    this.message = "DefaultError";
  }

  DefaultError.prototype = new Error();

  export function NotNativeStorage() {
    this.name = "NotNativeStorage";
    this.message = "NotNativeStorage";
  }

  NotNativeStorage.prototype = new Error();

  export function NotLocalStorage() {
    this.name = "NotLocalStorage";
    this.message = "NotLocalStorage";
  }
  NotLocalStorage.prototype = new Error();

  export function DataNotExist() {
    this.name = "DataNotExist";
    this.message = "ERROR_DATA_NOT_EXIST";
  }

  DataNotExist.prototype = new Error();

  export function Userdisabled() {
    this.name = "Userdisabled";
    this.message = "Userdisabled";
  }

  Userdisabled.prototype = new Error();

  export function UserNotFound() {
    this.name = "UserNotFound";
    this.message = "UserNotFound";
  }

  UserNotFound.prototype = new Error();

  export function WrongPassword() {
    this.name = "WrongPassword";
    this.message = "WrongPassword";
  }

  WrongPassword.prototype = new Error();

  export function EmailAlreadyExists() {
    this.name = "EmailAlreadyExists";
    this.message = "EmailAlreadyExists";
  }

  EmailAlreadyExists.prototype = new Error();

  export function InvalidEmail() {
    this.name = "InvalidEmail";
    this.message = "InvalidEmail";
  }

  InvalidEmail.prototype = new Error();

  export function WeakPassword() {
    this.name = "WeakPassword";
    this.message = "WeakPassword";
  }

  WeakPassword.prototype = new Error();

  export function UserNotLogin() {
    this.name = "UserNotLogin";
    this.message = "UserNotLogin";
  }

  UserNotLogin.prototype = new Error();

  export function NotLocationPermission() {
    this.name = "NotLocationPermission";
    this.message = "NotLocationPermission";
  }

  NotLocationPermission.prototype =  new Error();
}
