<div align="center">

```
███████╗ ██████╗ ██╗   ██╗██╗ ██████╗██╗  ██╗██╗   ██╗
██╔════╝██╔═══██╗██║   ██║██║██╔════╝██║  ██║╚██╗ ██╔╝
███████╗██║   ██║██║   ██║██║██║     ███████║ ╚████╔╝ 
╚════██║██║▄▄ ██║██║   ██║██║██║     ██╔══██║  ╚██╔╝  
███████║╚██████╔╝╚██████╔╝██║╚██████╗██║  ██║   ██║   
╚══════╝ ╚══▀▀═╝  ╚═════╝ ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   
```

### ⚔ WhatsApp Automation, Made Simple ⚔

**Fast · Reliable · Secure**

![Node](https://img.shields.io/badge/Node.js-18%2B-39FF14?style=for-the-badge&logo=node.js&logoColor=black)
![Status](https://img.shields.io/badge/Status-Active-00cc44?style=for-the-badge)
![License](https://img.shields.io/badge/Made%20by-DsPrimis-004d1a?style=for-the-badge)

</div>

---

## 📖 About Squichy

**Squichy** is a WhatsApp bot ecosystem built around a pool of always-on
worker servers. Each worker holds live WhatsApp sessions and can generate
a pairing code on demand — so connecting a number to Squichy is just a
matter of asking a worker for a code, from wherever is convenient.

```
┌──────────────┐        HTTPS         ┌──────────────────┐
│   Any client  │ ───────────────────▶│  Squichy Workers  │
│ (web/tg/CLI)  │◀─────────────────── │   (VPS pool)      │
└──────────────┘     pairing code     └──────────────────┘
```

---

## ✨ Features

| | |
|---|---|
| 🟢 | Auto-selects the least busy, fastest-responding worker |
| 🔒 | Strict number format validation (rejects `+`, spaces, letters) |
| ⚡ | Multiple ways to connect — same backend, your choice of interface |
| 📴 | Clients make outgoing requests only — nothing to host or expose |

---

## 🌐 Ways to Connect to Squichy

Squichy can be reached from several different places — pick whichever
fits you:

- 🌍 **Website** — browser-based pairing, no install needed
- ✈️ **Telegram Bot** — `/pair` command, works from your phone instantly
- 💻 **CLI Client** — this repo; runs on Termux, Linux, macOS, or any
  machine with Node.js (see below)

All of them talk to the exact same worker pool — none of them host or run
WhatsApp sessions themselves, they just request a pairing code on your
behalf.

---

## 🚀 Running the CLI Client

The CLI in this repo is one of the ways to reach Squichy. It works on any
platform with Node.js — including a phone via **Termux**.

### Termux (Android)

```bash
pkg update && pkg install nodejs git -y
git clone https://github.com/DEVPRIMIS/Squichy-Termux.git
cd Squichy-Termux
npm install
node pair.js
```

### Linux / macOS / WSL

```bash
git clone https://github.com/DEVPRIMIS/Squichy-Termux.git
cd Squichy-Termux
npm install
node pair.js
```

---

## 🖥 Usage

```
$ node pair.js

📱 ENTER YOUR WHATSAPP NUMBER (COUNTRY CODE, NO "+", NO SPACES): 50956880231

⏳ LOOKING FOR AN AVAILABLE SERVER...
⏳ GENERATING PAIRING CODE...

======================================
✅ PAIRING CODE GENERATED
======================================
NUMBER : 50956880231
CODE   : ZF24-TLZS
======================================

OPEN WHATSAPP > LINKED DEVICES > LINK WITH PHONE NUMBER,
AND ENTER THIS CODE.
```

⚠️ **Format matters:** enter the number with the country code, digits
only — no `+`, no spaces, no letters. Example: `50956880231`.

---

## ⚙️ Configuration

The CLI authenticates with the same worker pool used by the website and
the Telegram bot — no setup needed, it's already configured out of the
box in `pair.js`.

The list of workers is defined at the top of `pair.js` — keep it in sync
with the website (`api-routes.js`) and the Telegram bot (`index.js`)
whenever a server or port changes.

---

<div align="center">

**Developed by DsPrimis**

</div>
