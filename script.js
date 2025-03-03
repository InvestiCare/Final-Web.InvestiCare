document.querySelectorAll('.question').forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const arrow = question.querySelector('.arrow');
  
      // Toggle the 'open' class on the answer
      answer.classList.toggle('open');
  
      // Toggle the 'active' class on the question to rotate the arrow
      question.classList.toggle('active');
    });
  });