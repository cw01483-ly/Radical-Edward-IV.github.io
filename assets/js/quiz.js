/**
 * 퀴즈 정답 확인 함수
 * @param {string} quizId - 퀴즈 고유 ID
 * @param {string} correctAnswersString - 정답 문자열 (여러 정답은 |로 구분)
 */
function checkQuizAnswer(quizId, correctAnswersString) {
    const userAnswer = document.getElementById(`${quizId}-answer`).value.trim();
    const button = document.getElementById(`${quizId}-button`);
    const resultDiv = document.getElementById(`${quizId}-result`);

    // 정답 목록 (여러 정답 허용)
    const correctAnswers = correctAnswersString.split('|').map(ans => ans.trim());

    // 버튼 숨기기
    button.style.display = "none";

    // 원문자(㉠㉡㉢...) → 한글 자음(ㄱㄴㄷ...) 및 숫자 매핑
    const circleToJaeum = {
        '㉠': ['ㄱ', '1', 'ㄱ', 'ㅈ'],
        '㉡': ['ㄴ', '2', 'ㄴ'],
        '㉢': ['ㄷ', '3', 'ㄷ'],
        '㉣': ['ㄹ', '4', 'ㄹ'],
        '㉤': ['ㅁ', '5', 'ㅁ'],
        '㉥': ['ㅂ', '6', 'ㅂ'],
        '㉦': ['ㅅ', '7', 'ㅅ'],
        '㉧': ['ㅇ', '8', 'ㅇ'],
        '㉨': ['ㅈ', '9', 'ㅈ'],
        '㉩': ['ㅊ', '10', 'ㅊ']
    };

    // 사용자 입력을 정규화
    const normalizedUserAnswer = normalizeAnswer(userAnswer, circleToJaeum);

    // 정답 확인 (대소문자 구분 없이, 공백 무시)
    const isCorrect = correctAnswers.some(answer => {
        const normalizedCorrectAnswer = normalizeAnswer(answer, circleToJaeum);
        return normalizedUserAnswer === normalizedCorrectAnswer;
    });

    if (isCorrect) {
        resultDiv.innerHTML = '<span style="color: #448F52; font-weight: bold;">✓ 정답입니다!</span>';
    } else {
        resultDiv.innerHTML = `<span style="color: #D53C41; font-weight: bold;">✗ 오답입니다.</span><br><span style="color: #666; font-size: 0.9em;">정답: ${correctAnswers[0]}</span>`;
    }
}

/**
 * 답안을 정규화하여 비교 가능하도록 변환
 * @param {string} answer - 원본 답안
 * @param {object} mapping - 원문자 매핑 객체
 * @returns {string} 정규화된 답안
 */
function normalizeAnswer(answer, mapping) {
    let normalized = answer.toLowerCase();

    // 원문자(㉠㉡㉢...)를 표준 형태로 변환
    for (const [circle, alternatives] of Object.entries(mapping)) {
        // 원문자 자체를 첫 번째 대안으로 변환
        normalized = normalized.replace(circle, alternatives[0]);

        // 각 대안을 표준 형태로 변환
        alternatives.forEach(alt => {
            normalized = normalized.replace(alt.toLowerCase(), alternatives[0]);
        });
    }

    return normalized;
}

/**
 * 태그별 문제 필터링 함수
 * @param {string} tag - 필터링할 태그 이름 (빈 문자열이면 전체 표시)
 */
function filterQuizByTag(tag) {
    const quizContainers = document.querySelectorAll('.quiz-container');
    const filterButtons = document.querySelectorAll('.tag-filter-btn');

    // 모든 필터 버튼의 active 클래스 제거
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // 클릭된 버튼에 active 클래스 추가
    if (tag === '') {
        document.querySelector('.tag-filter-btn[data-tag=""]').classList.add('active');
    } else {
        document.querySelector(`.tag-filter-btn[data-tag="${tag}"]`).classList.add('active');
    }

    // 문제 필터링
    quizContainers.forEach(container => {
        const tags = container.getAttribute('data-tags');

        if (tag === '' || (tags && tags.includes(tag))) {
            container.style.display = 'block';
            // 부드러운 애니메이션
            container.style.opacity = '0';
            setTimeout(() => {
                container.style.transition = 'opacity 0.3s';
                container.style.opacity = '1';
            }, 10);
        } else {
            container.style.display = 'none';
        }
    });

    // 필터링 결과 업데이트
    updateFilterStats(tag);
}

/**
 * 필터링 통계 업데이트
 * @param {string} activeTag - 현재 활성화된 태그
 */
function updateFilterStats(activeTag) {
    const quizContainers = document.querySelectorAll('.quiz-container');
    let visibleCount = 0;

    quizContainers.forEach(container => {
        if (container.style.display !== 'none') {
            visibleCount++;
        }
    });

    const statsDiv = document.getElementById('filter-stats');
    if (statsDiv) {
        if (activeTag === '') {
            statsDiv.innerHTML = `전체 <strong>${visibleCount}개</strong> 문제`;
        } else {
            statsDiv.innerHTML = `<strong>${activeTag}</strong>: ${visibleCount}개 문제`;
        }
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    updateFilterStats('');
});

/**
 * 체크박스형 퀴즈 정답 확인 함수
 * @param {string} quizId - 퀴즈 고유 ID
 * @param {string} correctAnswerString - 정답 배열 (1,0,1,0 형식)
 */
function checkCheckboxAnswer(quizId, correctAnswerString) {
    const correctAnswer = correctAnswerString.split(',').map(val => val === '1');
    const checkboxes = document.getElementsByClassName(`${quizId}-answer`);
    const userAnswer = Array.from(checkboxes).map(cb => cb.checked);

    const button = document.getElementById(`${quizId}-button`);
    const resultDiv = document.getElementById(`${quizId}-result`);

    button.style.display = "none";

    const isCorrect = userAnswer.every((value, index) => value === correctAnswer[index]);

    if (isCorrect) {
        resultDiv.innerHTML = '<span style="color: #448F52; font-weight: bold;">✓ 정답입니다!</span>';
    } else {
        resultDiv.innerHTML = '<span style="color: #D53C41; font-weight: bold;">✗ 오답입니다.</span>';
    }
}
