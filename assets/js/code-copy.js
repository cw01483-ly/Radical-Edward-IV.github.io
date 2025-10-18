/**
 * 코드 복사 기능 공통 함수
 * 모든 마크다운 파일에서 사용 가능
 */

function copyCodeToClipboard(codeElementId) {
    const codeBlock = document.getElementById(codeElementId);
    if (!codeBlock) {
        console.error('코드 블록을 찾을 수 없습니다:', codeElementId);
        return;
    }
    
    const codeText = codeBlock.textContent;
    
    // HTML 엔티티를 실제 문자로 변환
    const decodedText = codeText
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
    
    // 더 안전한 복사 방법
    if (navigator.clipboard && window.isSecureContext) {
        // 최신 브라우저의 Clipboard API 사용
        navigator.clipboard.writeText(decodedText).then(function() {
            showCopySuccess(event.target.closest('button'));
        }).catch(function(err) {
            console.error('Clipboard API 실패:', err);
            fallbackCopy(decodedText);
        });
    } else {
        // 구형 브라우저를 위한 대체 방법
        fallbackCopy(decodedText);
    }
}

function fallbackCopy(text) {
    // 임시 textarea 생성
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(event.target.closest('button'));
        } else {
            showCopyError(event.target.closest('button'));
        }
    } catch (err) {
        console.error('execCommand 실패:', err);
        showCopyError(event.target.closest('button'));
    } finally {
        document.body.removeChild(textArea);
    }
}

function showCopySuccess(button) {
    if (!button) return;
    
    const originalBg = button.style.background;
    const originalIcon = button.innerHTML;
    
    button.style.background = '#4CAF50';
    button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
    
    setTimeout(function() {
        button.style.background = originalBg;
        button.innerHTML = originalIcon;
    }, 1500);
}

function showCopyError(button) {
    if (!button) return;
    
    const originalBg = button.style.background;
    const originalIcon = button.innerHTML;
    
    button.style.background = '#f44336';
    button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
    
    setTimeout(function() {
        button.style.background = originalBg;
        button.innerHTML = originalIcon;
    }, 1500);
}

/**
 * 코드 블록과 복사 버튼을 자동으로 생성하는 함수
 * @param {string} codeId - 코드 블록의 ID
 * @param {string} codeContent - 코드 내용
 * @param {string} language - 프로그래밍 언어 (선택사항)
 */
function createCodeBlockWithCopyButton(codeId, codeContent, language = '') {
    const container = document.getElementById(codeId + '-container');
    if (!container) return;
    
    // 코드 블록 생성
    const codeBlock = document.createElement('div');
    codeBlock.id = codeId;
    codeBlock.style.cssText = `
        background: #2d3748; 
        border-radius: 8px; 
        padding: 20px; 
        font-family: 'Fira Code', 'Consolas', 'Monaco', monospace; 
        font-size: 12px; 
        line-height: 1.1; 
        color: #e2e8f0; 
        white-space: pre; 
        overflow-x: auto;
    `;
    codeBlock.textContent = codeContent;
    
    // 복사 버튼 생성
    const copyButton = document.createElement('button');
    copyButton.onclick = () => copyCodeToClipboard(codeId);
    copyButton.style.cssText = `
        position: absolute; 
        top: 10px; 
        right: 10px; 
        background: rgba(0,0,0,0.7); 
        border: none; 
        border-radius: 4px; 
        padding: 8px; 
        cursor: pointer; 
        color: white; 
        font-size: 14px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        width: 32px; 
        height: 32px; 
        transition: background 0.2s;
    `;
    copyButton.title = '코드 복사';
    copyButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
    `;
    
    // 호버 효과
    copyButton.onmouseover = () => copyButton.style.background = 'rgba(0,0,0,0.9)';
    copyButton.onmouseout = () => copyButton.style.background = 'rgba(0,0,0,0.7)';
    
    // 컨테이너에 추가
    container.style.position = 'relative';
    container.appendChild(codeBlock);
    container.appendChild(copyButton);
}
