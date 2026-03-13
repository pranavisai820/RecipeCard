let currentVisible = null;

function showContent(id) {
  const content = document.getElementById(id);
  const isCurrentlyVisible = content.style.display === 'block';
  document.querySelectorAll('.content').forEach(c => c.style.display = 'none');
  if (!isCurrentlyVisible) {
    content.style.display = 'block';
    currentVisible = id;
    if (id === 'steps') highlightStep();
  } else {
    currentVisible = null;
  }
}

  let timerInterval;
  let seconds = 0;
  let step = 0;
  const totalSteps = 6;

  function startCooking() {
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        seconds++;
        document.getElementById("timer").innerText = `Time: ${seconds}s`;
      }, 1000);
    }
  }

  function pauseCooking() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function nextStep() {
    if (step < totalSteps) {
      step++;
      const progress = (step / totalSteps) * 100;
      document.getElementById("progressBar").style.width = progress + "%";
      highlightStep();
      if (step === totalSteps) showCelebration();
    }
  }

  function highlightStep() {
    const steps = document.querySelectorAll('#steps ol li');
    steps.forEach((li, index) => {
      li.classList.remove('highlight-step');
      if (index === step - 1) {
        li.classList.add('highlight-step');
      }
    });
  }

function printRecipe() {
  // Force timer and content to be visible
  document.getElementById("ingredients").style.display = "block";
  document.getElementById("steps").style.display = "block";
  document.getElementById("timer").style.display = "block";

  // Update print-timer only (will be shown via CSS in print)
  const timerContent = document.getElementById("timer").innerText;
  document.getElementById("print-timer").innerText = timerContent;
  window.print();
}



  function showRecipe() {
    document.getElementById("expandSection").style.display = "flex";
    document.querySelector(".container").classList.add("flat-bottom");
    document.getElementById("expandSection").classList.add("round-top");
  }

 function showCelebration() {
    const canvas = document.getElementById('celebration');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];

    for (let i = 0; i < 200; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 10 + 5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach(c => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
        ctx.stroke();
      });
      updateConfetti();
    }

    function updateConfetti() {
      confetti.forEach(c => {
        c.y += Math.cos(c.d) + 1 + c.r / 2;
        c.tiltAngle += c.tiltAngleIncremental;
        c.tilt = Math.sin(c.tiltAngle) * 15;

        if (c.y > canvas.height) {
          c.y = -20;
          c.x = Math.random() * canvas.width;
        }
      });
    }

    function animateConfetti() {
      drawConfetti();
      requestAnimationFrame(animateConfetti);
    }

    animateConfetti();

    // Optional: stop confetti after 5 seconds
    setTimeout(() => {
      canvas.remove();
    }, 5000);
  }