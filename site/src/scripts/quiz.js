function formatInline(value) {
  const escaped = String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
}

function clearQuestion(question) {
  question.querySelectorAll('.quiz-option').forEach((option) => {
    option.classList.remove('is-correct', 'is-wrong');
  });
  const feedback = question.querySelector('[data-quiz-feedback]');
  if (feedback) {
    feedback.textContent = '';
    feedback.removeAttribute('data-state');
  }
}

function checkQuiz(quiz) {
  const questions = [...quiz.querySelectorAll('[data-quiz-question]')];
  let answered = 0;
  let correct = 0;

  for (const question of questions) {
    const inputs = [...question.querySelectorAll('input[type="radio"]')];
    const selected = inputs.find((input) => input.checked);
    const feedback = question.querySelector('[data-quiz-feedback]');
    if (!selected) {
      if (feedback) {
        feedback.textContent = 'Выберите вариант ответа.';
        feedback.dataset.state = 'empty';
      }
      continue;
    }

    answered += 1;
    const isCorrect = selected.getAttribute('data-correct') === 'true';
    if (isCorrect) correct += 1;

    const correctInput = question.querySelector('input[data-correct="true"]');
    const correctOption = correctInput?.closest('.quiz-option')?.textContent.trim() || '';
    question.querySelectorAll('.quiz-option').forEach((option) => {
      const input = option.querySelector('input[type="radio"]');
      if (input?.getAttribute('data-correct') === 'true') option.classList.add('is-correct');
    });
    selected.closest('.quiz-option')?.classList.toggle('is-wrong', !isCorrect);

    if (feedback) {
      const explanation = question.getAttribute('data-explanation') || '';
      feedback.innerHTML = formatInline(
        isCorrect
          ? `Верно. ${explanation}`
          : `Неверно. Правильный ответ: ${correctOption}. ${explanation}`
      );
      feedback.dataset.state = isCorrect ? 'correct' : 'wrong';
    }
  }

  const summary = quiz.querySelector('[data-quiz-summary]');
  if (summary) {
    summary.textContent =
      answered === 0
        ? 'Ответьте хотя бы на один вопрос.'
        : answered === questions.length
          ? `Правильно ${correct} из ${questions.length}.`
          : `Правильно ${correct} из ${answered}. Отвечено ${answered} из ${questions.length}.`;
  }
}

function resetQuiz(quiz) {
  quiz.querySelectorAll('[data-quiz-question]').forEach(clearQuestion);
  const summary = quiz.querySelector('[data-quiz-summary]');
  if (summary) summary.textContent = '';
}

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  const quiz = target.closest('[data-quiz]');
  if (!quiz) return;
  if (target.closest('[data-quiz-check]')) {
    event.preventDefault();
    checkQuiz(quiz);
  } else if (target.closest('[data-quiz-reset]')) {
    event.preventDefault();
    resetQuiz(quiz);
  }
});

document.addEventListener('change', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target || !target.matches('input[type="radio"]')) return;
  const question = target.closest('[data-quiz-question]');
  if (question) clearQuestion(question);
});
