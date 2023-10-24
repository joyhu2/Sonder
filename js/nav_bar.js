document.addEventListener('scroll', function() {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('#main-nav a');
    let buffer = 100; // This is a buffer value in pixels. Adjust as needed.

    sections.forEach((section, index) => {
        let rect = section.getBoundingClientRect();
        if (rect.top <= buffer && rect.top >= -buffer) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
});

// Add click event to nav links to update the active state
navLinks.forEach((link, index) => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
