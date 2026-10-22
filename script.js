// JavaScript handles the platform hints, demo, and language links.
'use strict';

const isEnglish = document.documentElement.lang.startsWith('en');
const copy = isEnglish ? {
  platforms: {
    Windows: 'Choose the Windows installer on the official download page, then follow the setup instructions.',
    macOS: 'Choose macOS on the official download page and check the requirements for your Mac.',
    Linux: 'Choose the installation method for your Linux distribution on the official download page.',
    Android: 'Choose an official Android store link or the installer on the official download page.',
    iOS: 'Choose iOS on the official download page to install from the App Store on your iPhone or iPad.'
  },
  waiting: 'Computer selected. Waiting for approval.',
  phoneWaiting: 'Awaiting approval…',
  demoStart: 'Demo: choose a file and the receiving computer on your phone, then accept the transfer on the computer.',
  playing: 'Demo in progress…',
  sending: 'Accepted. Transferring…',
  phoneSending: 'Sending…',
  received: 'Received · demo file',
  phoneSent: 'Sent ✓',
  demoEnd: 'Demo complete. The illustration shows a file sent from a phone to a computer over a local network. No real file was transferred.',
  replay: 'Replay demo'
} : {
  platforms: {
    Windows: '在官方下载页选择 Windows 安装包，按提示安装。',
    macOS: '在官方下载页选择 macOS，按设备和系统要求安装。',
    Linux: '在官方下载页选择适合你的 Linux 发行版的安装方式。',
    Android: '在官方下载页选择 Android 的官方商店入口或安装包。',
    iOS: '在官方下载页选择 iOS，跳转 App Store 安装到 iPhone 或 iPad。'
  },
  waiting: '已选择电脑，等待接收确认',
  phoneWaiting: '等待确认…',
  demoStart: '演示开始：在手机选择文件和接收电脑，再在电脑上确认接收。',
  playing: '正在演示…',
  sending: '已确认，正在传输…',
  phoneSending: '正在发送…',
  received: '接收完成 · 演示文件',
  phoneSent: '已发送 ✓',
  demoEnd: '演示完成。文件通过本地网络从手机发送到电脑。本演示未传输真实文件。',
  replay: '再看一次演示'
};

const platformSelect = document.querySelector('#platform-select');
const downloadHint = document.querySelector('#download-hint');
platformSelect.addEventListener('change', () => {
  downloadHint.textContent = copy.platforms[platformSelect.value];
});

// Both pages share section IDs, so switching language can keep your place.
const languageLinks = document.querySelectorAll('.language-link');
function updateLanguageLinks() {
  for (const link of languageLinks) {
    const target = new URL(link.href);
    target.hash = window.location.hash;
    link.href = target.href;
  }
}
updateLanguageLinks();
window.addEventListener('hashchange', updateLanguageLinks);

const demoButton = document.querySelector('#demo-button');
const heroArt = document.querySelector('.hero-art');
const transferStatus = document.querySelector('#transfer-status');
const transferProgress = document.querySelector('#transfer-progress');
const phoneSend = document.querySelector('#phone-send');
const demoMessage = document.querySelector('#demo-message');

function setDemoButton(label, icon) {
  const symbol = document.createElement('span');
  symbol.className = 'play-icon';
  symbol.setAttribute('aria-hidden', 'true');
  symbol.textContent = icon;
  demoButton.replaceChildren(symbol, document.createTextNode(' ' + label));
}

demoButton.addEventListener('click', () => {
  if (demoButton.disabled) return;
  demoButton.disabled = true;
  heroArt.classList.remove('is-complete');
  heroArt.classList.add('is-transferring');
  transferProgress.style.transition = 'none';
  transferProgress.style.width = '0%';
  transferStatus.textContent = copy.waiting;
  phoneSend.textContent = copy.phoneWaiting;
  demoMessage.textContent = copy.demoStart;
  setDemoButton(copy.playing, '▶');

  window.setTimeout(() => {
    transferProgress.style.transition = '';
    transferProgress.style.width = '100%';
    transferStatus.textContent = copy.sending;
    phoneSend.textContent = copy.phoneSending;
  }, 700);

  window.setTimeout(() => {
    heroArt.classList.remove('is-transferring');
    heroArt.classList.add('is-complete');
    transferStatus.textContent = copy.received;
    phoneSend.textContent = copy.phoneSent;
    demoMessage.textContent = copy.demoEnd;
    setDemoButton(copy.replay, '↻');
    demoButton.disabled = false;
  }, 2500);
});
