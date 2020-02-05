/**
 * Декоратор проверяет авторизацию у пользователя и кидает ошибку если ее нет
 * @param errorMessage Сообщение ошибки авторизации
 */
import {AppModule} from "../app/app.module";

export function authRequired(errorMessage?: string) {
  return (target, propertyKey, descriptor) => _authRequired(target, propertyKey, descriptor, errorMessage);
}

function _authRequired(target: any, propertyKey: string, descriptor: PropertyDescriptor, errorMessage?: string) {
  let authService: any = null;

  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    const returnValue = originalMethod.apply(this, args);

    // Вызывает сервис авторизации, нельзя вызвать до инициализации AppModule
    try {
      authService = AppModule.injector.get('AuthService');
    } catch (e) {
      if (e.message === 'Cannot access \'AppModule\' before initialization') {
        return;
      }
    }

    if (authService && !authService.user.family_name) {
      throw new Error(errorMessage ? errorMessage : 'Необходима авторизация');
    }

    return returnValue;
  };
}
