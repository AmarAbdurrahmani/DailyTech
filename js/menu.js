// New modal logic
document.querySelectorAll('.read-more').forEach((button, index) => {
  button.addEventListener('click', () => {
    const titles = [
      "AI Revolution in 2025",
      "iPhone 16 Review",
      "Cybersecurity Trends"
    ];

    const contents = [
      "The AI Revolution in 2025 is reshaping industries around the world. From healthcare and finance to entertainment, AI is pushing boundaries and creating new possibilities for innovation.",
      "The iPhone 16 brings subtle design changes but powerful upgrades like the A18 chip, better cameras, and new on-device AI features focused on user privacy.",
      "In today’s connected world, cybersecurity is critical. Protect yourself from breaches, phishing, and malware by using best practices and staying informed about new threats."
    ];

    document.getElementById('modalTitle').textContent = titles[index];
    document.getElementById('modalContent').textContent = contents[index];
    document.getElementById('articleModal').style.display = 'block';
  });
});

function closeModal() {
  document.getElementById('articleModal').style.display = 'none';
}


  // Card Click
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      alert('More content coming soon!');
    });
  });

  // Category Filter (Advanced)
  function filterByCategory(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const title = card.querySelector('h3').textContent;
      card.style.display = title.toLowerCase().includes(category.toLowerCase()) ? 'block' : 'none';
    });
  }

  // Search Function
  function searchArticles(query) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const content = card.textContent.toLowerCase();
      card.style.display = content.includes(query.toLowerCase()) ? 'block' : 'none';
    });
  }

  // Dark Mode Toggle
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

  // Show Back to Top Button on Scroll
  window.addEventListener('scroll', () => {
    document.body.classList.toggle('scrolled', window.scrollY > 300);
  });

  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });


  const commentSection = document.querySelector('.comment-section');
const textarea = commentSection.querySelector('textarea');
const postButton = commentSection.querySelector('button');

function loadComments() {
  fetch('comments.php')
    .then(response => response.json())
    .then(comments => {
      // Clear existing saved comments (if any)
      const existing = commentSection.querySelectorAll('.saved-comment');
      existing.forEach(el => el.remove());

      comments.forEach(text => {
        addComment(text);
      });
    })
    .catch(console.error);
}

function addComment(text) {
  const div = document.createElement('div');
  div.className = 'saved-comment';
  div.textContent = text;
  div.style.padding = '8px';
  div.style.marginTop = '8px';
  div.style.background = '#eee';
  div.style.borderRadius = '6px';
  commentSection.appendChild(div);
}

postButton.addEventListener('click', () => {
  const commentText = textarea.value.trim();
  if (!commentText) {
    alert('Please write a comment before posting.');
    return;
  }

  fetch('comments.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `comment=${encodeURIComponent(commentText)}`
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        addComment(commentText);
        textarea.value = '';
      } else {
        alert(data.message || 'Failed to post comment');
      }
    })
    .catch(() => alert('Failed to post comment'));
});

// Load comments when page loads
loadComments();


    document.getElementById('newsletterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
      // Redirect to confirmation page
      window.location.href = 'newsletter-confirmation.html'; // Make sure this file exists and path is correct
    } else {
      alert('Please enter a valid email address.');
      emailInput.focus();
    }
  });

    
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    menuToggle.innerHTML = navMenu.classList.contains('show') ? '&times;' : '&#9776;';
  });

  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
      menuToggle.innerHTML = '&#9776;';
    });
  });


  

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Stop page reload

    let formData = new FormData(this);

    fetch("contact.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show PHP response in popup
        this.reset(); // Clear the form
    })
    .catch(error => {
        alert("Error sending message.");
    });
});


