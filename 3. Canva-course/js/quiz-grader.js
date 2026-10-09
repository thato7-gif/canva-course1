document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".js-quiz").forEach(quiz => {
    const correct = quiz.dataset.correct.split(",").map(s => s.trim().toUpperCase());
    const submitBtn = quiz.querySelector(".quiz-submit");
    const resetBtn  = quiz.querySelector(".quiz-reset");
    const resultBox = quiz.querySelector(".quiz-result");

    function grade() {
      const questions = quiz.querySelectorAll(".quiz-question");
      let score = 0;
      questions.forEach((q, i) => {
        const chosen = q.querySelector("input[type=radio]:checked");
        const feedback = q.querySelector(".feedback");
        const correctAns = correct[i];

        q.querySelectorAll("label").forEach(l => l.classList.remove("correct","wrong"));

        if (!chosen) {
          feedback.textContent = "⚠️ Not answered";
          feedback.className = "feedback text-warning";
          return;
        }
        const chosenLabel = chosen.closest("label");
        const correctLabel = q.querySelector(`input[value="${correctAns}"]`).closest("label");

        if (chosen.value.toUpperCase() === correctAns) {
          score++;
          chosenLabel.classList.add("correct");
          feedback.textContent = "✅ Correct!";
          feedback.className = "feedback text-success";
        } else {
          chosenLabel.classList.add("wrong");
          correctLabel.classList.add("correct");
          feedback.textContent = `❌ Correct answer: ${correctAns}`;
          feedback.className = "feedback text-danger";
        }
      });

      const pct = Math.round((score / questions.length) * 100);
      let msg = `You scored ${score}/${questions.length} (${pct}%) — `;
      if (pct === 100) msg += "Perfect! 🏆";
      else if (pct >= 60) msg += "Great job! 👏";
      else msg += "Keep practising! 💪";

      resultBox.textContent = msg;
      resultBox.className = "quiz-result alert " +
        (pct === 100 ? "alert-success" : pct >= 60 ? "alert-primary" : "alert-warning");
      resultBox.classList.remove("d-none");
    }

    submitBtn.addEventListener("click", grade);
    resetBtn.addEventListener("click", () => {
      quiz.querySelectorAll("input[type=radio]").forEach(i => i.checked = false);
      quiz.querySelectorAll("label").forEach(l => l.classList.remove("correct","wrong"));
      quiz.querySelectorAll(".feedback").forEach(f => f.textContent = "");
      resultBox.classList.add("d-none");
    });
  });
});