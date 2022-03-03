import {Subject} from 'rxjs';
import { filter } from 'rxjs/operators';

const subject = new Subject();
export const defaultID = 'default-alert'

export const severity = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
}

export function onAlert(id = defaultID) {
    return subject.asObservable().pipe(filter(alert => alert && alert.id === id));
}

export function success(message, options) {
    alert({...options, type: severity.success, message})
}

export function error(message, options) {
    alert({...options, type: severity.error, message})
}

export function warning(message, options) {
    alert({...options, type: severity.warning, message})
}

export function info(message, options) {
    alert({...options, type: severity.info, message})
}

export function alert(alert) {
    alert.id = alert.id || defaultID
    subject.next(alert)
}

export function clear(id = defaultID) {
    subject.next({id})
}