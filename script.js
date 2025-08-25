// V3.8 "GOD MODE" SCRIPT (Page Transitions)

// --- Function to initialize all our scripts ---
function initScripts() {
    console.log("Scripts re-initialized");

    // --- 1. CURSOR FOLLOWER ---
    const cursorDot = document.querySelector("#cursor-dot");
    const cursorOutline = document.querySelector("#cursor-outline");

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 250, fill: "forwards" });
    });

    // --- 3. INTERACTIVE 3D CARDS WITH SPOTLIGHT ---
    const cards = document.querySelectorAll(".course-card, .philosophy-item, .detailed-course-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    });

    // --- 4. CURSOR INTERACTION ---
    const interactiveElements = document.querySelectorAll('a, button, .course-card, .philosophy-item, .detailed-course-card, .nav-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
}

// --- Scrollbar function (kept separate) ---
function handleScroll() {
    const scrollProgressBar = document.querySelector('#scroll-progress-bar');
    if (scrollProgressBar) {
        let h = document.documentElement;
        let st = h.scrollTop || document.body.scrollTop;
        let sh = h.scrollHeight || document.body.scrollHeight;
        let percent = st / (sh - h.clientHeight) * 100;
        scrollProgressBar.style.width = percent + "%";
    }
}

// --- Main execution ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial script load
    initScripts();
    window.addEventListener('scroll', handleScroll);

    // BARBA.JS INITIALIZATION
    barba.init({
        sync: true,
        transitions: [{
            name: 'default-transition',
            leave(data) {
                // Animate the old page out
                return gsap.to(data.current.container, {
                    opacity: 0,
                    y: -50,
                    duration: 0.25
                });
            },
            enter(data) {
                // Animate the new page in
                window.scrollTo(0, 0); // Scroll to top of new page
                return gsap.from(data.next.container, {
                    opacity: 0,
                    y: 50,
                    duration: 0.25
                });
            }
        }]
    });

    // Re-initialize scripts after each transition
    barba.hooks.after(() => {
        initScripts();
    });
});