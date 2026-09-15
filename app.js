const donationForm = document.querySelector('.donation-form');
const amountInputs = document.querySelectorAll('input[name="amount"]');
const customAmount = document.querySelector('.custom-amount input');
const formMessage = document.querySelector('.form-message');
customAmount.disabled = true;

amountInputs.forEach((input) => {
  input.addEventListener('change', () => {
    customAmount.disabled = input.value !== 'Custom amount';
    if (input.value !== 'Custom amount') customAmount.value = '';
  });
});

donationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const selected = document.querySelector('input[name="amount"]:checked').value;
  const amount = selected === 'Custom amount' ? customAmount.value : selected;
  const numericAmount = selected === 'Custom amount' ? Number(amount) : Number.parseFloat(amount.replace('$', ''));

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    formMessage.textContent = 'Choose an amount before leaving your gift.';
    customAmount.focus();
    return;
  }

  formMessage.textContent = `Offering recorded: ${amount}. Thank you, friend.`;
  donationForm.classList.add('is-complete');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.quest-card, .world-strip, .support-block, .contact-block').forEach((section) => {
  revealObserver.observe(section);
});
