import {Subject} from 'rxjs';
import { filter } from 'rxjs/operators';

const subject = new Subject();
export const defaultID = 'default-alert'

export const alertService = {
    onAlert,
    success,
    error,
    warning,
    info,
    alert,
    clear
}

export const alertSeverity = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
}

function onAlert(id = defaultID) {
    return subject.asObservable().pipe(filter(alert => alert && alert.id === id));
}

function success(message, options) {
    alert({...options, type: alertSeverity.success, message})
}

function error(message, options) {
    alert({...options, type: alertSeverity.error, message})
}

function warning(message, options) {
    alert({...options, type: alertSeverity.warning, message})
}

function info(message, options) {
    alert({...options, type: alertSeverity.info, message})
}

function alert(alert) {
    alert.id = alert.id || defaultID
    subject.next(alert)
}

function clear(id = defaultID) {
    subject.next({id})
}