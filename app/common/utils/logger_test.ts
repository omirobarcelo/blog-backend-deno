const { test } = Deno;
import { Logger } from './logger.ts';
import { assertEquals } from '../../../deps.ts';
import { green, red, yellow } from '../../../deps.ts';

const localeStringOptions = {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: '2-digit',
    month: '2-digit'
  };

const logBackup = console.log;
let logLastMsg = '';

console.log = function(...args: any[]) {
    logLastMsg = args.join(' ');
    logBackup.apply(console, args);
};

const getTimestamp = () => new Date(Date.now()).toLocaleString(undefined, localeStringOptions);

test('Object log without context', () => {
    const logger = new Logger();
    logger.log('test message');
    assertEquals(logLastMsg, `${green(getTimestamp())} test message`);
});

test('Object log with context', () => {
    const logger = new Logger('testCtx');
    logger.log('test message');
    assertEquals(logLastMsg, `${green(getTimestamp())} ${yellow('[testCtx] ')}test message`);
});

test('Object log with context override', () => {
    const logger = new Logger('testCtx');
    logger.log('test message', 'newCtx');
    assertEquals(logLastMsg, `${green(getTimestamp())} ${yellow('[newCtx] ')}test message`);
});

test('Static log without context', () => {
    Logger.log('test message');
    assertEquals(logLastMsg, `${green(getTimestamp())} test message`);
});

test('Static log with context', () => {
    Logger.log('test message', 'testCtx');
    assertEquals(logLastMsg, `${green(getTimestamp())} ${yellow('[testCtx] ')}test message`);
});

test('Object error without context', () => {
    const logger = new Logger();
    logger.error('test message', 'test trace');
    assertEquals(logLastMsg, `${red('[ERROR] ')}${green(getTimestamp())} test message test trace`);
});

test('Object error with context', () => {
    const logger = new Logger('testCtx');
    logger.error('test message', 'test trace');
    assertEquals(logLastMsg, `${red('[ERROR] ')}${green(getTimestamp())} ${yellow('[testCtx] ')}test message test trace`);
});

test('Object error with context override', () => {
    const logger = new Logger('testCtx');
    logger.error('test message', 'test trace', 'newCtx');
    assertEquals(logLastMsg, `${red('[ERROR] ')}${green(getTimestamp())} ${yellow('[newCtx] ')}test message test trace`);
});

test('Static error without context', () => {
    Logger.error('test message', 'test trace');
    assertEquals(logLastMsg, `${red('[ERROR] ')}${green(getTimestamp())} test message test trace`);
});

test('Static error with context', () => {
    Logger.error('test message', 'test trace', 'testCtx');
    assertEquals(logLastMsg, `${red('[ERROR] ')}${green(getTimestamp())} ${yellow('[testCtx] ')}test message test trace`);
});
