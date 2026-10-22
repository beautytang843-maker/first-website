// 第一课：JavaScript 负责交互。这里有系统选择和“文件互传”示意。
'use strict';

const platformSelect = document.querySelector('#platform-select');
const downloadHint = document.querySelector('#download-hint');
const platformHints = {
  Windows: '在官方下载页选择 Windows 安装包，按提示安装。',
  macOS: '在官方下载页选择 macOS，按设备和系统要求安装。',
  Linux: '在官方下载页选择适合你的 Linux 发行版的安装方式。',
  Android: '在官方下载页选择 Android 的官方商店入口或安装包。',
  iOS: '在官方下载页选择 iOS，跳转 App Store 安装到 iPhone 或 iPad。'
};

platformSelect.addEventListener('change', () => {
  downloadHint.textContent = platformHints[platformSelect.value];
});

const demoButton = document.querySelector('#demo-button');
const heroArt = document.querySelector('.hero-art');
const transferStatus = document.querySelector('#transfer-status');
const transferProgress = document.querySelector('#transfer-progress');
const phoneSend = document.querySelector('#phone-send');
const demoMessage = document.querySelector('#demo-message');

demoButton.addEventListener('click', () => {
  if (demoButton.disabled) return;
  demoButton.disabled = true;
  heroArt.classList.remove('is-complete');
  heroArt.classList.add('is-transferring');
  transferProgress.style.transition = 'none';
  transferProgress.style.width = '0%';
  transferStatus.textContent = '已选择电脑，等待接收确认';
  phoneSend.textContent = '等待确认…';
  demoMessage.textContent = '演示开始：在手机选择文件和接收电脑，再在电脑上确认接收。';
  demoButton.innerHTML = '<span class="play-icon" aria-hidden="true">▶</span> 正在演示…';

  window.setTimeout(() => {
    transferProgress.style.transition = '';
    transferProgress.style.width = '100%';
    transferStatus.textContent = '已确认，正在传输…';
    phoneSend.textContent = '正在发送…';
  }, 700);

  window.setTimeout(() => {
    heroArt.classList.remove('is-transferring');
    heroArt.classList.add('is-complete');
    transferStatus.textContent = '接收完成 · 演示文件';
    phoneSend.textContent = '已发送 ✓';
    demoMessage.textContent = '演示完成。文件通过本地网络从手机发送到电脑。本演示未传输真实文件。';
    demoButton.innerHTML = '<span class="play-icon" aria-hidden="true">↻</span> 再看一次演示';
    demoButton.disabled = false;
  }, 2500);
});
