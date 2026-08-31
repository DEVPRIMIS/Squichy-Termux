#!/usr/bin/env node

const readline = require('readline');
const chalk = require('chalk');
const figlet = require('figlet');
const gradient = require('gradient-string');

const squichyGreen = gradient(['#39FF14', '#00cc44', '#004d1a']);

const WORKER_SERVERS = [
    'http://198.71.59.43:3000',
    'http://198.71.59.43:3001',
    'http://198.71.59.43:3002',
    'http://198.71.59.43:3004',
    'http://198.71.59.43:3005',
    'http://198.71.59.43:3006',
    'http://198.71.59.43:3007',
    'http://198.71.59.43:3008',
    'http://198.71.59.43:3009',
    'http://169.58.37.185:25576',
];

const WORKER_SECRET = process.env.WORKER_SECRET || 'smd_worker_4f8a1c7e2b9d3f60';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

function cleanNumber(raw) {
    return String(raw || '').replace(/[^0-9]/g, '');
}

function printBanner() {
    let art;
    try {
        art = figlet.textSync('SQUICHY BOT', { font: 'ANSI Shadow' });
    } catch (e) {
        art = figlet.textSync('SQUICHY BOT', { font: 'Standard' });
    }
    console.log(squichyGreen.multiline(art));
    console.log(chalk.greenBright.bold('             ⚔  𝙵𝙰𝚂𝚃 . 𝚁𝙴𝙻𝙸𝙰𝙱𝙻𝙴 . 𝚂𝙴𝙲𝚄𝚁𝙴  ⚔'));
    console.log(chalk.gray('                  𝙿𝙰𝙸𝚁 𝙲𝙻𝙸 . 𝚃𝙴𝚁𝙼𝚄𝚇 𝙲𝙻𝙸𝙴𝙽𝚃\n'));
}

async function findAvailableWorker() {
    const checks = WORKER_SERVERS.map(async base => {
        const start = Date.now();
        try {
            const r = await fetch(`${base}/api/status`, { signal: AbortSignal.timeout(4000) });
            const data = await r.json();
            if (!data.available) return null;
            return { base, count: typeof data.count === 'number' ? data.count : Infinity, latency: Date.now() - start };
        } catch (e) {
            return null;
        }
    });
    const results = (await Promise.all(checks)).filter(Boolean);
    if (results.length === 0) return null;
    results.sort((a, b) => (a.count - b.count) || (a.latency - b.latency));
    return results[0].base;
}

async function requestPairCode(base, number) {
    const r = await fetch(`${base}/api/generate-pair`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-worker-secret': WORKER_SECRET },
        body: JSON.stringify({ number }),
        signal: AbortSignal.timeout(25000)
    });
    return r.json();
}

async function main() {
    printBanner();

    const rawInput = await ask(chalk.cyanBright('📱 𝙴𝙽𝚃𝙴𝚁 𝚈𝙾𝚄𝚁 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙽𝚄𝙼𝙱𝙴𝚁 (𝙲𝙾𝚄𝙽𝚃𝚁𝚈 𝙲𝙾𝙳𝙴, 𝙽𝙾 "+", 𝙽𝙾 𝚂𝙿𝙰𝙲𝙴𝚂): '));
    const number = cleanNumber(rawInput);

    if (rawInput.trim() !== number) {
        console.log(chalk.redBright('\n❌ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝙵𝙾𝚁𝙼𝙰𝚃. 𝚁𝙴𝙼𝙾𝚅𝙴 𝙰𝙽𝚈 "+", 𝚂𝙿𝙰𝙲𝙴𝚂 𝙾𝚁 𝙻𝙴𝚃𝚃𝙴𝚁𝚂.'));
        console.log(chalk.gray('   𝙴𝚇𝙰𝙼𝙿𝙻𝙴: 50912345678\n'));
        rl.close();
        return;
    }

    if (number.length < 7) {
        console.log(chalk.redBright('\n❌ 𝙽𝚄𝙼𝙱𝙴𝚁 𝚃𝙾𝙾 𝚂𝙷𝙾𝚁𝚃. 𝙸𝙽𝙲𝙻𝚄𝙳𝙴 𝚃𝙷𝙴 𝙲𝙾𝚄𝙽𝚃𝚁𝚈 𝙲𝙾𝙳𝙴.'));
        console.log(chalk.gray('   𝙴𝚇𝙰𝙼𝙿𝙻𝙴: 50912345678\n'));
        rl.close();
        return;
    }

    console.log(chalk.yellow('\n⏳ 𝙻𝙾𝙾𝙺𝙸𝙽𝙶 𝙵𝙾𝚁 𝙰𝙽 𝙰𝚅𝙰𝙸𝙻𝙰𝙱𝙻𝙴 𝚂𝙴𝚁𝚅𝙴𝚁...'));
    const base = await findAvailableWorker();

    if (!base) {
        console.log(chalk.redBright('❌ 𝙽𝙾 𝚂𝙴𝚁𝚅𝙴𝚁 𝙰𝚅𝙰𝙸𝙻𝙰𝙱𝙻𝙴 𝚁𝙸𝙶𝙷𝚃 𝙽𝙾𝚆. 𝚃𝚁𝚈 𝙰𝙶𝙰𝙸𝙽 𝚂𝙷𝙾𝚁𝚃𝙻𝚈.\n'));
        rl.close();
        return;
    }

    console.log(chalk.yellow('⏳ 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙸𝙽𝙶 𝙿𝙰𝙸𝚁𝙸𝙽𝙶 𝙲𝙾𝙳𝙴...'));
    try {
        const data = await requestPairCode(base, number);
        if (!data.success) {
            console.log(chalk.redBright(`❌ 𝙵𝙰𝙸𝙻𝙴𝙳 𝚃𝙾 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴 𝙲𝙾𝙳𝙴: ${data.error || '𝚄𝙽𝙺𝙽𝙾𝚆𝙽 𝙴𝚁𝚁𝙾𝚁'}\n`));
            rl.close();
            return;
        }

        console.log(chalk.green(logLine()));
        console.log(chalk.greenBright.bold('✅ 𝙿𝙰𝙸𝚁𝙸𝙽𝙶 𝙲𝙾𝙳𝙴 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳'));
        console.log(chalk.green(logLine()));
        console.log(chalk.white(`𝙽𝚄𝙼𝙱𝙴𝚁 : ${chalk.cyanBright(number)}`));
        console.log(chalk.white(`𝙲𝙾𝙳𝙴   : ${chalk.yellowBright.bold(data.code)}`));
        console.log(chalk.green(logLine()));
        console.log(chalk.gray('\n𝙾𝙿𝙴𝙽 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 > 𝙻𝙸𝙽𝙺𝙴𝙳 𝙳𝙴𝚅𝙸𝙲𝙴𝚂 > 𝙻𝙸𝙽𝙺 𝚆𝙸𝚃𝙷 𝙿𝙷𝙾𝙽𝙴 𝙽𝚄𝙼𝙱𝙴𝚁,'));
        console.log(chalk.gray('𝙰𝙽𝙳 𝙴𝙽𝚃𝙴𝚁 𝚃𝙷𝙸𝚂 𝙲𝙾𝙳𝙴.\n'));
    } catch (e) {
        console.log(chalk.redBright(`❌ 𝙴𝚁𝚁𝙾𝚁 𝚆𝙷𝙸𝙻𝙴 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙸𝙽𝙶 𝚃𝙷𝙴 𝙲𝙾𝙳𝙴: ${e.message}\n`));
    }

    rl.close();
}

function logLine() {
    return '='.repeat(38);
}

main();
