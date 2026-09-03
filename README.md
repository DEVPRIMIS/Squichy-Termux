<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com/?font=Fira+Code&weight=700&size=30&pause=1000&color=39FF14&center=true&vCenter=true&width=440&lines=Squichy+Bot;By+DsPrimis;Squichy+Bot)](https://git.io/typing-svg)

![Node.js CI](https://github.com/DEVPRIMIS/Squichy-Termux/actions/workflows/node-ci.yml/badge.svg)
![Node](https://img.shields.io/badge/Node.js-18%2B-39FF14?style=for-the-badge&logo=node.js&logoColor=black)
![Status](https://img.shields.io/badge/Status-Active-00cc44?style=for-the-badge)

[![Fork Repo](https://img.shields.io/badge/Fork-Repo-39FF14?style=for-the-badge&logo=github&logoColor=black)](https://github.com/DEVPRIMIS/Squichy-Termux/fork)
[![Site Pairing](https://img.shields.io/badge/Site-Pairing-00cc44?style=for-the-badge&logo=googlechrome&logoColor=white)](https://squichy-bot.zone.id)
[![Telegram Pairing](https://img.shields.io/badge/Telegram-Pairing-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/squichy_bot)

</div>

---

## 🚀 Quick Start

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

### Windows (PowerShell / CMD)

```bash
git clone https://github.com/DEVPRIMIS/Squichy-Termux.git
cd Squichy-Termux
npm install
node pair.js
```

### Kali Linux

```bash
sudo apt update && sudo apt install nodejs npm git -y
git clone https://github.com/DEVPRIMIS/Squichy-Termux.git
cd Squichy-Termux
npm install
node pair.js
```

---

## ⚙️ Continuous Integration

Every push and pull request to `main` is checked automatically:

```yaml
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Verify syntax
      run: node --check pair.js
```

---

## ❤️ Credits

[![GitHub - DEVPRIMIS](https://img.shields.io/badge/GitHub-DEVPRIMIS-181717?style=for-the-badge&logo=github)](https://github.com/DEVPRIMIS)

---

![MADE BY DSPRIMIS](https://img.shields.io/badge/MADE%20BY-DSPRIMIS-blueviolet?style=for-the-badge&logo=markdown)
