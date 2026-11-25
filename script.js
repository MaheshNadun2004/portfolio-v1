function initMatrixRain() {

    const canvas = document.getElementById('matrix-bg');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const chars = '01';
    const fontSize = 14;

    let columns = 0;
    let drops = [];

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        columns = Math.ceil(canvas.width / fontSize);

        drops = Array(columns).fill(1);
    }

    function drawMatrix() {

        ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff88';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {

            const char = chars[
                Math.floor(Math.random() * chars.length)
            ];

            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(char, x, y);

            if (
                y > canvas.height &&
                Math.random() > 0.975
            ) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    setInterval(drawMatrix, 50);
}

function handleScroll() {

    const header = document.getElementById('header');

    const backToTop = document.getElementById('backToTop');

    if (header) {

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    if (backToTop) {

        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}

function setupContactForm() {

    const contactForm = document.getElementById('contactForm');

    const formStatus = document.getElementById('formStatus');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const submitBtn = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (!submitBtn) return;

        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> SENDING...';

        submitBtn.disabled = true;

        setTimeout(() => {

            if (formStatus) {

                formStatus.textContent =
                    "✓ Demo message completed. Connect a form service to send real messages.";

                formStatus.style.color = '#00ff88';
            }

            contactForm.reset();

            submitBtn.innerHTML = originalText;

            submitBtn.disabled = false;

            setTimeout(() => {

                if (formStatus) {
                    formStatus.textContent = '';
                }

            }, 5000);

        }, 1500);

    });
}

function animateSkillLevels() {

    const levelDots = document.querySelectorAll(
        '.level-dot.active'
    );

    levelDots.forEach((dot, index) => {

        setTimeout(() => {

            dot.style.transform = 'scale(1.2)';
            dot.style.boxShadow = '0 0 10px #00ff88';

            setTimeout(() => {

                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = 'none';

            }, 300);

        }, index * 100);

    });
}


function observeSkillsSection() {

    const skillsSection = document.getElementById('skills');

    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateSkillLevels();

                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.5
    });

    observer.observe(skillsSection);
}


function terminalAnimation() {

    const commands = [
        '> scanning network...',
        '> I am Mahesh Nadun...',
        '> University of Vavuniya...',
        '> Aspiring to become a cybersecurity engineer'
    ];

    const terminalDiv = document.createElement('div');

    terminalDiv.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: rgba(5, 8, 17, 0.9);
        border: 1px solid #00d4ff;
        border-radius: 4px;
        padding: 15px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #00ff88;
        z-index: 1000;
        max-width: 300px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(terminalDiv);

    let currentCommand = 0;
    let currentChar = 0;

    function typeCommand() {

        if (currentCommand < commands.length) {

            if (currentChar === 0) {

                terminalDiv.style.opacity = '1';
                terminalDiv.style.transform = 'translateY(0)';

                terminalDiv.textContent = '';
            }

            if (currentChar < commands[currentCommand].length) {

                terminalDiv.textContent +=
                    commands[currentCommand].charAt(currentChar);

                currentChar++;

                setTimeout(typeCommand, 50);

            } else {

                currentCommand++;
                currentChar = 0;

                setTimeout(() => {

                    terminalDiv.style.opacity = '0';

                    terminalDiv.style.transform = 'translateY(20px)';

                    setTimeout(typeCommand, 1000);

                }, 1500);
            }

        } else {

            setTimeout(() => {
                terminalDiv.remove();
            }, 1000);
        }
    }

    setTimeout(typeCommand, 3000);
}



function updateCopyrightYear() {

    const copyrightElement = document.querySelector(
        '.copyright p'
    );

    if (copyrightElement) {

        const currentYear = new Date().getFullYear();

        copyrightElement.innerHTML =
            copyrightElement.innerHTML.replace(
                /2024|2025|2026/,
                currentYear
            );
    }
}


function initScrambleText() {

    const container = document.getElementById('scramble-text');

    if (!container) return;

    const originalText = container.textContent;

    const scrambleChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';

    container.textContent = '';

    originalText.split('').forEach(() => {

        const span = document.createElement('span');

        span.textContent = '';

        container.appendChild(span);

    });

    const spans = container.querySelectorAll('span');

    let iterations = 0;

    const maxIterations = 15;

    function startScramble() {

        iterations = 0;

        const scrambleInterval = setInterval(() => {

            spans.forEach((span, index) => {

                if (iterations < maxIterations) {

                    span.textContent = scrambleChars.charAt(
                        Math.floor(Math.random() * scrambleChars.length)
                    );

                    span.style.color = '#00ff88';

                } else {

                    span.textContent = originalText[index];

                    span.style.color = '';
                }

            });

            iterations++;

            if (iterations > maxIterations) {

                clearInterval(scrambleInterval);

                spans.forEach((span, index) => {

                    setTimeout(() => {

                        span.style.transform = 'scale(1.1)';
                        span.style.color = '#00d4ff';

                        setTimeout(() => {

                            span.style.transform = 'scale(1)';
                            span.style.color = '';

                        }, 150);

                    }, index * 30);

                });
            }

        }, 60);
    }

    setTimeout(startScramble, 500);

    container.addEventListener('mouseenter', () => {

        spans.forEach(span => {
            span.textContent = '';
        });

        startScramble();
    });
}



function scrambleSectionTitle(titleElement) {

    const originalHTML = titleElement.innerHTML;

    const originalText = titleElement.textContent;

    const scrambleChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';

    titleElement.textContent = '';

    originalText.split('').forEach(() => {

        const span = document.createElement('span');

        titleElement.appendChild(span);

    });

    const spans = titleElement.querySelectorAll('span');

    let iterations = 0;

    const maxIterations = 12;

    const scrambleInterval = setInterval(() => {

        spans.forEach((span, index) => {

            if (iterations < maxIterations) {

                span.textContent = scrambleChars.charAt(
                    Math.floor(Math.random() * scrambleChars.length)
                );

                span.style.color = '#00ff88';

            } else {

                span.textContent = originalText[index];

                span.style.color = '';
            }

        });

        iterations++;

        if (iterations > maxIterations) {

            clearInterval(scrambleInterval);

            
            titleElement.innerHTML = originalHTML;
        }

    }, 50);
}


function initSectionTitleScramble() {

    
    const sectionTitles = document.querySelectorAll(
        '.section-title[id]:not(#education .section-title):not(#experience .section-title)'
    );

    sectionTitles.forEach(title => {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    scrambleSectionTitle(entry.target);

                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.5
        });

        observer.observe(title);
    });
}


function initSelectedSectionAnimations() {

    const titles = document.querySelectorAll(
        '#education .section-title, #experience .section-title'
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const title = entry.target;

            if (title.dataset.animated === 'true') return;

            title.dataset.animated = 'true';

            scrambleSectionTitle(title);

            observer.unobserve(title);

        });

    }, {
        threshold: 0.5
    });

    titles.forEach(title => {

        observer.observe(title);

    });
}



function setupMobileMenu() {

    const navContainer = document.querySelector('.nav-container');

    const navLinks = document.querySelector('.nav-links');

    if (!navContainer || !navLinks) return;

    let menuBtn = document.querySelector('.mobile-menu-btn');

    function closeMenu() {

        navLinks.style.display = 'none';

        if (menuBtn) {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }

    function openMenu() {

        navLinks.style.display = 'flex';

        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(10, 14, 23, 0.95)';
        navLinks.style.backdropFilter = 'blur(10px)';
        navLinks.style.padding = '1rem';
        navLinks.style.borderBottom =
            '1px solid rgba(0, 212, 255, 0.2)';

        navLinks.style.zIndex = '1000';

        if (menuBtn) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
        }
    }

    function initializeMenu() {

        if (window.innerWidth <= 992) {

            if (!menuBtn) {

                menuBtn = document.createElement('button');

                menuBtn.className = 'mobile-menu-btn';

                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';

                menuBtn.style.cssText = `
                    background: transparent;
                    border: 1px solid var(--cyber-blue);
                    color: var(--cyber-blue);
                    width: 44px;
                    height: 44px;
                    border-radius: 4px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;

                navContainer.appendChild(menuBtn);

                menuBtn.addEventListener('click', () => {

                    if (navLinks.style.display === 'flex') {
                        closeMenu();
                    } else {
                        openMenu();
                    }

                });
            }

        } else {

            if (menuBtn) {
                menuBtn.remove();
                menuBtn = null;
            }

            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.width = '';
            navLinks.style.background = '';
            navLinks.style.backdropFilter = '';
            navLinks.style.padding = '';
            navLinks.style.borderBottom = '';
        }
    }

    initializeMenu();

    window.addEventListener('resize', initializeMenu);

    navLinks.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', () => {

            if (window.innerWidth <= 992) {
                closeMenu();
            }

        });

    });
}



function setupCertScrollIndicator() {

    const certsWrapper = document.querySelector('.certs-wrapper');

    if (!certsWrapper) return;

    certsWrapper.addEventListener('scroll', function () {

        const scrollTop = this.scrollTop;

        const scrollHeight = this.scrollHeight;

        const clientHeight = this.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 10) {

            this.classList.add('scrolled-bottom');

        } else {

            this.classList.remove('scrolled-bottom');
        }

    });
}



function setupCertificateAutoScroll() {

    const wrapper = document.getElementById('certs-wrapper');

    const grid = document.getElementById('certs-grid');

    if (!wrapper || !grid || grid.children.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const originalCards = Array.from(grid.children);

    originalCards.forEach(card => {

        const clone = card.cloneNode(true);

        clone.setAttribute('aria-hidden', 'true');

        clone.querySelectorAll(
            'a, button, input, [tabindex]'
        ).forEach(el => {

            el.setAttribute('tabindex', '-1');

        });

        grid.appendChild(clone);

    });

    let paused = false;

    let previousTime = 0;

    const speed = 35;

    function animate(time) {

        if (!previousTime) previousTime = time;

        const delta = Math.min(
            (time - previousTime) / 1000,
            0.05
        );

        previousTime = time;

        if (!paused) {

            wrapper.scrollLeft += speed * delta;

            const loopPoint = grid.scrollWidth / 2;

            if (
                loopPoint > 0 &&
                wrapper.scrollLeft >= loopPoint
            ) {
                wrapper.scrollLeft -= loopPoint;
            }
        }

        requestAnimationFrame(animate);
    }

    wrapper.addEventListener('mouseenter', () => {
        paused = true;
    });

    wrapper.addEventListener('mouseleave', () => {
        paused = false;
        previousTime = 0;
    });

    wrapper.addEventListener('focusin', () => {
        paused = true;
    });

    wrapper.addEventListener('focusout', () => {
        paused = false;
        previousTime = 0;
    });

    wrapper.addEventListener('touchstart', () => {
        paused = true;
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
        paused = false;
        previousTime = 0;
    }, { passive: true });

    wrapper.addEventListener('wheel', () => {

        paused = true;

        clearTimeout(wrapper._scrollResumeTimer);

        wrapper._scrollResumeTimer = setTimeout(() => {

            paused = false;

            previousTime = 0;

        }, 1800);

    }, { passive: true });

    requestAnimationFrame(animate);
}



function setupTHMSliders() {

    document.querySelectorAll(
        '#skills .thm-rooms, #skills .thm-badges'
    ).forEach(slider => {

        let isDragging = false;

        let startX = 0;

        let startScrollLeft = 0;

        let moved = false;

        let pauseAutoScroll = false;

        const speed = 0.35;

        const isBadges = slider.classList.contains('thm-badges');

        function autoScroll() {

            if (!isDragging && !pauseAutoScroll) {

                const maxScroll =
                    slider.scrollWidth - slider.clientWidth;

                if (maxScroll > 0) {

                    if (isBadges) {

                        slider.scrollLeft -= speed;

                        if (slider.scrollLeft <= 0) {
                            slider.scrollLeft = maxScroll;
                        }

                    } else {

                        slider.scrollLeft += speed;

                        if (slider.scrollLeft >= maxScroll) {
                            slider.scrollLeft = 0;
                        }
                    }
                }
            }

            requestAnimationFrame(autoScroll);
        }

        slider.addEventListener('pointerdown', event => {

            if (event.pointerType === 'mouse' && event.button !== 0) {
                return;
            }

            isDragging = true;

            moved = false;

            startX = event.clientX;

            startScrollLeft = slider.scrollLeft;

            slider.classList.add('dragging');

        });

        slider.addEventListener('pointermove', event => {

            if (!isDragging) return;

            const distance = event.clientX - startX;

            if (Math.abs(distance) > 5) {
                moved = true;
            }

            if (moved) {
                slider.scrollLeft = startScrollLeft - distance;
            }

        });

        function stopDragging() {

            isDragging = false;

            slider.classList.remove('dragging');
        }

        slider.addEventListener('pointerup', stopDragging);

        slider.addEventListener('pointercancel', stopDragging);

        slider.addEventListener('mouseenter', () => {
            pauseAutoScroll = true;
        });

        slider.addEventListener('mouseleave', () => {
            pauseAutoScroll = false;
            stopDragging();
        });

        slider.querySelectorAll('a').forEach(link => {

            link.addEventListener('click', event => {

                if (moved) {

                    event.preventDefault();

                    event.stopPropagation();

                    moved = false;
                }

            });

        });

        requestAnimationFrame(autoScroll);

    });
}


function setupProjectSlider() {

    const slider = document.getElementById('projectsSlider');

    const track = document.getElementById('projectsTrack');

    if (!slider || !track) return;

    if (track.children.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

   
    if (track.dataset.loopReady === 'true') return;

    track.dataset.loopReady = 'true';

    const originalCards = Array.from(track.children);

    originalCards.forEach(card => {

        const clone = card.cloneNode(true);

        clone.setAttribute('aria-hidden', 'true');

        clone.querySelectorAll('a, button').forEach(link => {

            link.setAttribute('tabindex', '-1');

        });

        track.appendChild(clone);

    });

    let isDragging = false;

    let isHovering = false;

    let isTouching = false;

    let startX = 0;

    let startScrollLeft = 0;

    let previousTime = 0;

    let animationFrame;

    const speed = 35;

    function getLoopWidth() {

        return track.scrollWidth / 2;
    }

    function normalizeScroll() {

        const loopWidth = getLoopWidth();

        if (loopWidth <= 0) return;

        if (slider.scrollLeft >= loopWidth) {

            slider.scrollLeft -= loopWidth;

        } else if (slider.scrollLeft < 0) {

            slider.scrollLeft += loopWidth;
        }
    }

    function animate(time) {

        if (!previousTime) previousTime = time;

        const delta = Math.min(
            (time - previousTime) / 1000,
            0.05
        );

        previousTime = time;

        if (!isDragging && !isHovering && !isTouching) {

            slider.scrollLeft += speed * delta;

            normalizeScroll();
        }

        animationFrame = requestAnimationFrame(animate);
    }

    slider.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    slider.addEventListener('mouseleave', () => {

        isHovering = false;

        isDragging = false;

        slider.classList.remove('is-dragging');
    });

    slider.addEventListener('mousedown', event => {

        if (event.button !== 0) return;

        if (event.target.closest('a, button')) return;

        isDragging = true;

        startX = event.clientX;

        startScrollLeft = slider.scrollLeft;

        slider.classList.add('is-dragging');

        event.preventDefault();

    });

    window.addEventListener('mousemove', event => {

        if (!isDragging) return;

        const distance = event.clientX - startX;

        slider.scrollLeft = startScrollLeft - distance;

        normalizeScroll();

    });

    window.addEventListener('mouseup', () => {

        isDragging = false;

        slider.classList.remove('is-dragging');
    });

    slider.addEventListener('touchstart', () => {
        isTouching = true;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        isTouching = false;
    }, { passive: true });

    slider.addEventListener('touchcancel', () => {
        isTouching = false;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {

        if (document.hidden) {

            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }

            previousTime = 0;

        } else if (!animationFrame) {

            animationFrame = requestAnimationFrame(animate);
        }

    });

    animationFrame = requestAnimationFrame(animate);
}


function setupHorizontalAutoScroll() {

    const carousels = document.querySelectorAll(
        '.horizontal-scroller[data-auto-scroll]'
    );

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) return;

    carousels.forEach(scroller => {

        const track = scroller.querySelector('.horizontal-track');

        if (!track || track.children.length < 2) return;

        if (track.dataset.carouselReady === 'true') return;

        track.dataset.carouselReady = 'true';

        const originalCards = Array.from(track.children);

        const originalWidth = track.scrollWidth;

        if (originalWidth <= scroller.clientWidth) return;

        originalCards.forEach(card => {

            const clone = card.cloneNode(true);

            clone.setAttribute('data-carousel-clone', 'true');

            clone.setAttribute('aria-hidden', 'true');

            clone.querySelectorAll(
                'a, button, input'
            ).forEach(element => {

                element.setAttribute('tabindex', '-1');

            });

            track.appendChild(clone);

        });

        let isPaused = false;

        let isDragging = false;

        let hasMoved = false;

        let startX = 0;

        let startScrollLeft = 0;

        const speed = 0.5;

        function animate() {

            if (!isPaused && !isDragging) {

                scroller.scrollLeft += speed;

                if (scroller.scrollLeft >= originalWidth) {

                    scroller.scrollLeft -= originalWidth;
                }
            }

            requestAnimationFrame(animate);
        }

        scroller.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        scroller.addEventListener('mouseleave', () => {

            if (!isDragging) {
                isPaused = false;
            }
        });

        scroller.addEventListener('pointerdown', event => {

            if (event.pointerType === 'mouse' && event.button !== 0) {
                return;
            }

            isDragging = true;

            isPaused = true;

            hasMoved = false;

            startX = event.clientX;

            startScrollLeft = scroller.scrollLeft;

            scroller.classList.add('dragging');

        });

        scroller.addEventListener('pointermove', event => {

            if (!isDragging) return;

            const distance = event.clientX - startX;

            if (Math.abs(distance) > 5) {
                hasMoved = true;
            }

            if (hasMoved) {

                scroller.scrollLeft =
                    startScrollLeft - distance;
            }

        });

        function stopDragging() {

            if (!isDragging) return;

            isDragging = false;

            scroller.classList.remove('dragging');

            isPaused = scroller.matches(':hover');

        }

        scroller.addEventListener('pointerup', stopDragging);

        scroller.addEventListener('pointercancel', stopDragging);

        scroller.addEventListener('lostpointercapture', stopDragging);

        scroller.addEventListener('click', event => {

            if (hasMoved) {

                event.preventDefault();

                event.stopPropagation();

                hasMoved = false;
            }

        }, true);

        scroller.addEventListener('focusin', () => {
            isPaused = true;
        });

        scroller.addEventListener('focusout', () => {
            isPaused = scroller.matches(':hover');
        });

        requestAnimationFrame(animate);

    });
}


document.addEventListener('DOMContentLoaded', () => {

    initMatrixRain();

    updateCopyrightYear();

    setupContactForm();

    observeSkillsSection();

    initScrambleText();

    initSectionTitleScramble();

    initSelectedSectionAnimations();

    setupMobileMenu();

    setupCertScrollIndicator();

    setupCertificateAutoScroll();

    setupTHMSliders();

    setupProjectSlider();

    setupHorizontalAutoScroll();

});


window.addEventListener('scroll', handleScroll);

document.querySelectorAll(".projects-slider").forEach((slider) => {

    const track = slider.querySelector(".projects-track");

    if (!track) return;

    let position = 0;
    let animationId = null;

    const speed = 0.4;
    let shouldScroll = false;
    let isPaused = false;

    function checkOverflow() {

        cancelAnimationFrame(animationId);
        animationId = null;

        position = 0;

        track.style.transform = "translateX(0px)";

        const maxScroll = track.scrollWidth - slider.clientWidth;

        shouldScroll = maxScroll > 5;

        if (shouldScroll) {
            startAutoScroll();
        }
    }

    function startAutoScroll() {

        if (!shouldScroll || animationId) return;

        function animate() {

            if (!shouldScroll || isPaused) {
                animationId = null;
                return;
            }

            const maxScroll = track.scrollWidth - slider.clientWidth;

            if (maxScroll <= 5) {
                shouldScroll = false;
                position = 0;
                track.style.transform = "translateX(0px)";
                animationId = null;
                return;
            }

            position += speed;

            if (position >= maxScroll) {
                position = 0;
            }

            track.style.transform = `translateX(-${position}px)`;

            animationId = requestAnimationFrame(animate);
        }

        animationId = requestAnimationFrame(animate);
    }

    slider.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    slider.addEventListener("mouseleave", () => {
        isPaused = false;

        if (shouldScroll) {
            startAutoScroll();
        }
    });

    const resizeObserver = new ResizeObserver(() => {
        checkOverflow();
    });

    resizeObserver.observe(slider);

    resizeObserver.observe(track);

    window.addEventListener("load", checkOverflow);

    checkOverflow();

});
document.addEventListener('DOMContentLoaded', () => {
    terminalAnimation();
});


 document.addEventListener("DOMContentLoaded", function () {

            AOS.init({

                duration: 850,

                easing: "ease-out-cubic",

                once: true,

                offset: 100,

                delay: 50,

                mirror: false,
            });
        });

        