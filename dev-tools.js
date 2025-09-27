
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    if (!audioPlayer) return;

    // 建立時間顯示的 UI 元素
    const timeDisplayContainer = document.createElement('div');
    timeDisplayContainer.style.position = 'fixed';
    timeDisplayContainer.style.top = '20px';
    timeDisplayContainer.style.right = '20px';
    timeDisplayContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    timeDisplayContainer.style.padding = '15px';
    timeDisplayContainer.style.border = '1px solid #e2e8f0';
    timeDisplayContainer.style.borderRadius = '8px';
    timeDisplayContainer.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
    timeDisplayContainer.style.zIndex = '2000';
    timeDisplayContainer.style.fontFamily = 'monospace';
    timeDisplayContainer.style.fontSize = '16px';
    timeDisplayContainer.style.color = '#1a202c';
    timeDisplayContainer.style.backdropFilter = 'blur(5px)';

    timeDisplayContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span>Paused at:</span>
            <span id="dev-time" style="font-weight: bold; font-size: 18px; color: #2d3748;">0.00</span>
            <button id="dev-copy-btn" style="padding: 6px 12px; border: 1px solid #cbd5e0; border-radius: 6px; cursor: pointer; background-color: #edf2f7; font-weight: 600;">Copy</button>
        </div>
    `;
    document.body.appendChild(timeDisplayContainer);

    const timeSpan = document.getElementById('dev-time');
    const copyButton = document.getElementById('dev-copy-btn');

    // 監聽 audio 的 'pause' 事件
    audioPlayer.addEventListener('pause', () => {
        const currentTime = audioPlayer.currentTime.toFixed(2);
        timeSpan.textContent = currentTime;
    });

    // 處理複製按鈕點擊事件
    copyButton.addEventListener('click', () => {
        const timeValue = timeSpan.textContent;
        navigator.clipboard.writeText(timeValue).then(() => {
            copyButton.textContent = 'Copied!';
            copyButton.style.backgroundColor = '#c6f6d5';
            setTimeout(() => {
                copyButton.textContent = 'Copy';
                copyButton.style.backgroundColor = '#edf2f7';
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy time: ', err);
            copyButton.textContent = 'Error';
        });
    });
});
