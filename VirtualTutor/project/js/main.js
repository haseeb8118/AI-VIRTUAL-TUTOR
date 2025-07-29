document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to set active link
    function setActiveLink(hash) {
        // Remove 'active' class from all links
        navLinks.forEach(item => item.classList.remove('active'));

        // Add 'active' class to the matching link
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        // If no hash or hash is empty, set home as active
        if (!hash || hash === '#') {
            const homeLink = document.querySelector('a[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }

    // Click event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const hash = this.getAttribute('href');
            setActiveLink(hash);
        });
    });

    // Set initial active link based on current hash
    const currentHash = window.location.hash;
    if (currentHash) {
        setActiveLink(currentHash);
    } else {
        // If no hash, set home as active by default
        setActiveLink('#home');
    }

    // Listen for hash changes (when user navigates with browser back/forward)
    window.addEventListener('hashchange', () => {
        const newHash = window.location.hash;
        setActiveLink(newHash);
    });
});