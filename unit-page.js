(function () {
  const pageEl = document.querySelector('.unit-page');
  if (!pageEl) {
    return;
  }

  const unitId = Number(pageEl.dataset.unitId);
  const unit = quizUnits[unitId];
  if (!unit) {
    return;
  }

  const questionContainer = document.getElementById('question-container');
  const feedbackEl = document.getElementById('feedback');
  const progressText = document.getElementById('progress-text');
  const questionCounter = document.getElementById('question-counter');
  const progressFill = document.getElementById('progress-fill');
  const checkBtn = document.getElementById('check-btn');
  const nextBtn = document.getElementById('next-btn');
  const completionCard = document.getElementById('completion-card');

  let currentIndex = 0;
  let answeredCount = 0;
  const answeredSet = new Set();

  function shuffle(words) {
    const copy = words.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function normalize(text) {
    return String(text).trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function updateProgress() {
    const total = unit.questions.length;
    progressText.textContent = `تمت الإجابة على ${answeredCount} من ${total}`;
    questionCounter.textContent = `السؤال ${Math.min(currentIndex + 1, total)} / ${total}`;
    progressFill.style.width = `${(answeredCount / total) * 100}%`;
  }

  function renderQuestion() {
    const q = unit.questions[currentIndex];
    if (!q) {
      showCompletion();
      return;
    }

    checkBtn.disabled = false;
    feedbackEl.style.display = 'none';
    feedbackEl.className = 'feedback';
    nextBtn.style.display = 'none';

    let inner = `<h3 class="question-title">${q.prompt}</h3>`;

    if (q.type === 'multiple' || q.type === 'truefalse') {
      inner += '<div class="options">';
      q.options.forEach((option, idx) => {
        inner += `
          <label class="option-item">
            <input type="radio" name="answer" value="${option}" ${idx === 0 ? '' : ''} />
            <span>${option}</span>
          </label>
        `;
      });
      inner += '</div>';
    }

    if (q.type === 'fill') {
      inner += '<input id="fill-answer" class="text-input" type="text" placeholder="اكتبي الإجابة هنا" />';
    }

    if (q.type === 'arrange') {
      const shuffled = shuffle(q.words);
      inner += `
        <p class="arrange-hint">اضغطي على الكلمات بالترتيب الصحيح.</p>
        <div class="arrange-bank" id="arrange-bank">
          ${shuffled.map((word) => `<button type="button" class="word-chip" data-word="${word}">${word}</button>`).join('')}
        </div>
        <p class="arrange-hint">الجملة التي كوّنتيها:</p>
        <div class="arrange-answer" id="arrange-answer"></div>
        <input type="hidden" id="arrange-hidden" value="" />
      `;
    }

    if (q.type === 'matching') {
      const rightOptions = shuffle(q.pairs.map((pair) => pair.right));
      inner += '<div class="matching-list">';
      q.pairs.forEach((pair, idx) => {
        inner += `
          <div class="match-row">
            <label for="match-${idx}">${pair.left}</label>
            <select id="match-${idx}" data-left="${pair.left}">
              <option value="">اختاري المعنى</option>
              ${rightOptions.map((opt) => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
          </div>
        `;
      });
      inner += '</div>';
    }

    questionContainer.innerHTML = inner;

    if (q.type === 'arrange') {
      setupArrangeEvents();
    }

    updateProgress();
  }

  function setupArrangeEvents() {
    const bank = document.getElementById('arrange-bank');
    const answerBox = document.getElementById('arrange-answer');
    const hiddenInput = document.getElementById('arrange-hidden');

    if (!bank || !answerBox || !hiddenInput) {
      return;
    }

    function updateHidden() {
      const words = Array.from(answerBox.querySelectorAll('.word-chip')).map((el) => el.dataset.word);
      hiddenInput.value = words.join(' ');
      if (!words.length) {
        answerBox.innerHTML = '<span style="color:#91aab6; font-weight:600;">...</span>';
      }
    }

    bank.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.classList.contains('word-chip')) {
        return;
      }
      const word = target.dataset.word;
      target.remove();

      if (answerBox.textContent.trim() === '...') {
        answerBox.innerHTML = '';
      }

      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'word-chip';
      chip.dataset.word = word;
      chip.textContent = word;
      answerBox.appendChild(chip);
      updateHidden();
    });

    answerBox.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.classList.contains('word-chip')) {
        return;
      }
      const word = target.dataset.word;
      target.remove();

      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'word-chip';
      chip.dataset.word = word;
      chip.textContent = word;
      bank.appendChild(chip);
      updateHidden();
    });

    answerBox.innerHTML = '<span style="color:#91aab6; font-weight:600;">...</span>';
  }

  function readUserAnswer(q) {
    if (q.type === 'multiple' || q.type === 'truefalse') {
      const selected = document.querySelector('input[name="answer"]:checked');
      return selected ? selected.value : '';
    }

    if (q.type === 'fill') {
      const input = document.getElementById('fill-answer');
      return input ? input.value : '';
    }

    if (q.type === 'arrange') {
      const hidden = document.getElementById('arrange-hidden');
      return hidden ? hidden.value : '';
    }

    if (q.type === 'matching') {
      const selected = Array.from(questionContainer.querySelectorAll('select')).map((select) => ({
        left: select.dataset.left,
        right: select.value
      }));
      return selected;
    }

    return '';
  }

  function isCorrectAnswer(q, userAnswer) {
    if (q.type === 'matching') {
      if (!Array.isArray(userAnswer) || userAnswer.some((row) => !row.right)) {
        return false;
      }
      return q.pairs.every((pair) => {
        const row = userAnswer.find((item) => item.left === pair.left);
        return row && normalize(row.right) === normalize(pair.right);
      });
    }

    return normalize(userAnswer) === normalize(q.answer);
  }

  function showFeedback(q, correct) {
    if (correct) {
      feedbackEl.className = 'feedback correct';
      feedbackEl.innerHTML = `
        <strong>أحسنتِ! إجابة رائعة 🌟</strong>
        Great job! Correct answer!
        <img class="small-luma" src="assets/luma-character.jpeg" alt="Luma" />
      `;
    } else {
      feedbackEl.className = 'feedback wrong';
      feedbackEl.innerHTML = `
        <strong>خلينا نجرب مرة ثانية يا بطلة 💫</strong>
        The correct answer is: <strong>${q.answerLabel}</strong><br />
        Reason: ${q.reason}
      `;
    }
    feedbackEl.style.display = 'block';
  }

  function showCompletion() {
    document.querySelector('.quiz-card').style.display = 'none';
    completionCard.style.display = 'block';
    updateProgress();
  }

  checkBtn.addEventListener('click', () => {
    const q = unit.questions[currentIndex];
    if (!q) {
      return;
    }

    const userAnswer = readUserAnswer(q);
    const correct = isCorrectAnswer(q, userAnswer);

    if (!answeredSet.has(currentIndex)) {
      answeredSet.add(currentIndex);
      answeredCount += 1;
    }

    showFeedback(q, correct);
    checkBtn.disabled = true;
    nextBtn.style.display = 'inline-block';
    updateProgress();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex += 1;
    if (currentIndex >= unit.questions.length) {
      showCompletion();
      return;
    }
    renderQuestion();
  });

  renderQuestion();
})();
