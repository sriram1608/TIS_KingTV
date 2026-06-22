// KINGS 24×7 - Main Javascript Controller
import { articleDatabase, getFallbackImage } from './news-db.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Global Image Error Fallback Handler
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      const card = e.target.closest('[data-article-id]') || e.target.closest('.news-card') || e.target.closest('.sidebar-card') || e.target.closest('.trending-card');
      let category = 'politics';
      if (card) {
        const badge = card.querySelector('.category-badge, .sidebar-badge');
        if (badge && badge.textContent) {
          category = badge.textContent.trim();
        }
      }
      e.target.src = getFallbackImage(category);
    }
  }, true);

  /* ==========================================================================
     1. STICKY NAVBAR SCROLL DYNAMICS
     ========================================================================== */
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  /* ==========================================================================
     2. MOBILE DRAWER NAVIGATION MENU
     ========================================================================== */
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');

  function toggleMobileDrawer(open) {
    if (open) {
      mobileNavDrawer.classList.add('active');
      mobileDrawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNavDrawer.classList.remove('active');
      mobileDrawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  menuToggleBtn.addEventListener('click', () => toggleMobileDrawer(true));
  drawerCloseBtn.addEventListener('click', () => toggleMobileDrawer(false));
  mobileDrawerOverlay.addEventListener('click', () => toggleMobileDrawer(false));

  // Close drawer when link is clicked (excluding dropdown toggles)
  const drawerLinks = document.querySelectorAll('.drawer-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (link.classList.contains('drawer-dropdown-toggle')) {
        return; // Handled by dropdown logic
      }
      toggleMobileDrawer(false);
    });
  });

  // Drawer collapsible submenus toggle
  const drawerDropdownToggles = document.querySelectorAll('.drawer-dropdown-toggle');
  drawerDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parent = toggle.closest('.drawer-dropdown-item');
      if (parent) {
        parent.classList.toggle('active');
      }
    });
  });

  // Close drawer when submenu links are clicked
  const drawerSublinks = document.querySelectorAll('.drawer-sublink');
  drawerSublinks.forEach(sublink => {
    sublink.addEventListener('click', () => {
      toggleMobileDrawer(false);
    });
  });


  /* ==========================================================================
     3. BREAKING NEWS SEARCH OVERLAY
     ========================================================================== */
  const searchTriggerBtn = document.getElementById('search-trigger-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');

  searchTriggerBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 300); // Small delay to wait for animation
  });

  searchCloseBtn.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close search on escape press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });


  /* ==========================================================================
     4. USER AUTHENTICATION MODAL (LOGIN / SIGN UP)
     ========================================================================== */
  const loginBtn = document.getElementById('login-btn');
  const loginOverlay = document.getElementById('login-overlay');
  const loginCloseBtn = document.getElementById('login-close-btn');
  const toggleSignup = document.getElementById('toggle-signup');
  const authForm = document.getElementById('auth-form');
  const btnSignin = document.getElementById('btn-signin');

  loginBtn.addEventListener('click', () => {
    loginOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const drawerLoginBtn = document.getElementById('drawer-login-btn');
  if (drawerLoginBtn) {
    drawerLoginBtn.addEventListener('click', () => {
      toggleMobileDrawer(false);
      loginOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  loginCloseBtn.addEventListener('click', () => {
    loginOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  loginOverlay.addEventListener('click', (e) => {
    if (e.target === loginOverlay) {
      loginOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Toggle mode inside Auth Modal (simulation)
  let isLoginMode = true;
  toggleSignup.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    const headerTitle = loginOverlay.querySelector('.login-header h3');
    const headerDesc = loginOverlay.querySelector('.login-header p');
    
    if (isLoginMode) {
      headerTitle.textContent = 'Welcome Back';
      headerDesc.textContent = 'Sign in to customize your news feed and save articles.';
      btnSignin.textContent = 'Sign In';
      toggleSignup.textContent = 'Create Account';
      loginOverlay.querySelector('.login-footer p').childNodes[0].textContent = "Don't have an account? ";
    } else {
      headerTitle.textContent = 'Create Account';
      headerDesc.textContent = 'Join KINGS 24×7 to get personalized updates, bookmarks and more.';
      btnSignin.textContent = 'Sign Up';
      toggleSignup.textContent = 'Sign In';
      loginOverlay.querySelector('.login-footer p').childNodes[0].textContent = "Already have an account? ";
    }
  });

  // Mock Form Submit
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    alert(`Success: Signed in as ${email}!`);
    loginOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });


  /* ==========================================================================
     5. NOTIFICATIONS DRAWER
     ========================================================================== */
  const notificationBtn = document.getElementById('notification-btn');
  const notificationsDrawer = document.getElementById('notifications-drawer');
  const notificationsCloseBtn = document.getElementById('notifications-close-btn');
  const notificationsOverlay = document.getElementById('notifications-overlay');
  const notificationDot = document.querySelector('.notification-dot');

  function toggleNotifications(open) {
    if (open) {
      notificationsDrawer.classList.add('active');
      notificationsOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      notificationsDrawer.classList.remove('active');
      notificationsOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  notificationBtn.addEventListener('click', () => {
    toggleNotifications(true);
    // Clear notification dot when checked
    if (notificationDot) {
      notificationDot.style.display = 'none';
    }
  });

  notificationsCloseBtn.addEventListener('click', () => toggleNotifications(false));
  notificationsOverlay.addEventListener('click', () => toggleNotifications(false));

  // Wire click event on Subscribe button in navbar
  const navSubscribeBtn = document.getElementById('nav-subscribe-btn');
  if (navSubscribeBtn) {
    navSubscribeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert("KINGS 24×7 Premium Membership:\nThank you for choosing Kings Premium! Redirecting to checkout...");
    });
  }

  const drawerSubscribeBtn = document.getElementById('drawer-subscribe-btn');
  if (drawerSubscribeBtn) {
    drawerSubscribeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMobileDrawer(false);
      alert("KINGS 24×7 Premium Membership:\nThank you for choosing Kings Premium! Redirecting to checkout...");
    });
  }

  // Mark all as read click simulation
  const markAllRead = document.querySelector('.view-all-notifications');
  markAllRead.addEventListener('click', (e) => {
    e.preventDefault();
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    unreadItems.forEach(item => {
      item.classList.remove('unread');
      const indicator = item.querySelector('.noti-indicator');
      if (indicator) indicator.remove();
    });
    alert('All notifications marked as read.');
  });


  /* ==========================================================================
     6. HERO FEATURED NEWS CAROUSEL (3-second autoplay, loop, transitions)
     ========================================================================== */
  const carouselTrack = document.getElementById('carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const slideNumberBadge = document.getElementById('slide-number-badge');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  
  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  let carouselInterval;

  function updateCarousel(index) {
    // Safety check bounds
    if (index >= totalSlides) {
      currentSlideIndex = 0;
    } else if (index < 0) {
      currentSlideIndex = totalSlides - 1;
    } else {
      currentSlideIndex = index;
    }

    // Translate track
    carouselTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

    // Toggle active slide class
    slides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update pagination dots
    dots.forEach((dot, i) => {
      if (i === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update index badge text
    if (slideNumberBadge) {
      slideNumberBadge.textContent = `${currentSlideIndex + 1}/${totalSlides}`;
    }
  }

  function startAutoplay() {
    carouselInterval = setInterval(() => {
      updateCarousel(currentSlideIndex + 1);
    }, 3000); // 3-second transition
  }

  function stopAutoplay() {
    clearInterval(carouselInterval);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Setup dot controls
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'));
      updateCarousel(slideIndex);
      resetAutoplay();
    });
  });

  // Setup arrow controls
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      updateCarousel(currentSlideIndex - 1);
      resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
      updateCarousel(currentSlideIndex + 1);
      resetAutoplay();
    });
  }

  // Pause carousel autoplay on mouse hover to improve accessibility
  const carouselContainer = document.getElementById('hero-carousel');
  carouselContainer.addEventListener('mouseenter', stopAutoplay);
  carouselContainer.addEventListener('mouseleave', startAutoplay);

  // Initialize Carousel Autoplay
  startAutoplay();


  /* ==========================================================================
     6B. IMMERSIVE CUSTOM VIDEO PLAYER CONTROLS
     ========================================================================== */
  const immersivePlayer = document.getElementById('immersive-player');
  const playerVideo = document.getElementById('player-video');
  const controlsOverlay = document.getElementById('player-controls-overlay');
  const playBtn = document.getElementById('player-play-btn');
  const playIcon = document.getElementById('player-play-icon');
  const rewindBtn = document.getElementById('player-rewind-btn');
  const forwardBtn = document.getElementById('player-forward-btn');
  const volumeBtn = document.getElementById('player-volume-btn');
  const volumeIcon = document.getElementById('player-volume-icon');
  const volumeSlider = document.getElementById('player-volume-slider');
  const progressContainer = document.getElementById('player-progress-container');
  const progressPlay = document.getElementById('player-progress-play');
  const progressBuffered = document.getElementById('player-progress-buffered');
  const progressHandle = document.getElementById('player-progress-handle');
  const timeCurrent = document.getElementById('player-time-current');
  const timeDuration = document.getElementById('player-time-duration');
  const fullscreenBtn = document.getElementById('player-fullscreen-btn');
  const fullscreenIcon = document.getElementById('player-fullscreen-icon');
  const qualityBtn = document.getElementById('player-quality-btn');
  const qualityLabel = document.getElementById('quality-label');
  const qualityDropdown = document.getElementById('player-quality-dropdown');
  const videoTitleElement = document.getElementById('player-video-title');
  const closeBtn = document.getElementById('player-close-btn');
  const middleAction = document.getElementById('player-middle-action');
  const middleIcon = document.getElementById('player-middle-icon');

  let homepageScrollPos = 0;
  let isDraggingProgress = false;
  let controlsTimeout;

  // Format seconds to MM:SS
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Open Video Player
  function openVideoPlayer(videoUrl, titleText) {
    // Save current homepage scroll position
    homepageScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    
    // Stop hero carousel autoplay while watching
    stopAutoplay();

    // Set video sources and title
    playerVideo.src = videoUrl;
    videoTitleElement.textContent = titleText || "Featured News Broadcast";
    
    // Activate overlay and player
    immersivePlayer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling

    // Load and play video
    playerVideo.load();
    const playPromise = playerVideo.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updatePlayIcons(true);
      }).catch(error => {
        console.log("Auto-play prevented by browser policy", error);
        updatePlayIcons(false);
      });
    }

    // Set initial volume
    playerVideo.volume = volumeSlider.value;
    updateVolumeIcon(playerVideo.volume);

    // Initial controls visibility
    resetControlsTimeout();
  }

  // Close Video Player
  function closeVideoPlayer() {
    playerVideo.pause();
    playerVideo.src = ""; // Clear source
    immersivePlayer.classList.remove('active');
    document.body.style.overflow = ''; // Restore page scrolling
    
    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.log(err));
    }

    // Restore scroll position
    window.scrollTo(0, homepageScrollPos);

    // Restart carousel autoplay
    startAutoplay();
  }

  // Bind click triggers for featured carousel slides and Watch Now buttons
  slides.forEach(slide => {
    // Click slide overlay or watch button
    slide.addEventListener('click', (e) => {
      // Don't open if clicked direct children interactive elements like watch now button which handles click propagation
      const videoUrl = slide.getAttribute('data-video');
      const videoTitle = slide.getAttribute('data-title');
      if (videoUrl) {
        openVideoPlayer(videoUrl, videoTitle);
      }
    });
  });

  // Bind clicks for Right Sidebar stacked cards
  const sidebarCards = document.querySelectorAll('.sidebar-card');
  sidebarCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoUrl = card.getAttribute('data-video');
      const videoTitle = card.getAttribute('data-title');
      if (videoUrl) {
        openVideoPlayer(videoUrl, videoTitle);
      }
    });
  });

  // Play / Pause Logic
  function togglePlay() {
    if (playerVideo.paused) {
      playerVideo.play();
      updatePlayIcons(true);
      triggerMiddlePulse("play");
    } else {
      playerVideo.pause();
      updatePlayIcons(false);
      triggerMiddlePulse("pause");
    }
    resetControlsTimeout();
  }

  function updatePlayIcons(isPlaying) {
    if (isPlaying) {
      playIcon.setAttribute('data-lucide', 'pause');
      middleIcon.setAttribute('data-lucide', 'pause');
    } else {
      playIcon.setAttribute('data-lucide', 'play');
      middleIcon.setAttribute('data-lucide', 'play');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function triggerMiddlePulse(state) {
    middleAction.classList.remove('trigger-pulse');
    void middleAction.offsetWidth; // Trigger reflow to restart animation
    middleAction.classList.add('trigger-pulse');
  }

  playBtn.addEventListener('click', togglePlay);
  playerVideo.addEventListener('click', togglePlay); // Click video to play/pause

  // Rewind / Forward 10s
  rewindBtn.addEventListener('click', () => {
    playerVideo.currentTime = Math.max(0, playerVideo.currentTime - 10);
    resetControlsTimeout();
  });

  forwardBtn.addEventListener('click', () => {
    playerVideo.currentTime = Math.min(playerVideo.duration, playerVideo.currentTime + 10);
    resetControlsTimeout();
  });

  // Close actions
  closeBtn.addEventListener('click', closeVideoPlayer);

  // Volume control slider and mute button
  volumeSlider.addEventListener('input', (e) => {
    const vol = e.target.value;
    playerVideo.volume = vol;
    playerVideo.muted = (vol == 0);
    updateVolumeIcon(vol);
    resetControlsTimeout();
  });

  volumeBtn.addEventListener('click', () => {
    playerVideo.muted = !playerVideo.muted;
    if (playerVideo.muted) {
      updateVolumeIcon(0);
      volumeSlider.value = 0;
    } else {
      volumeSlider.value = playerVideo.volume || 1;
      updateVolumeIcon(playerVideo.volume || 1);
    }
    resetControlsTimeout();
  });

  function updateVolumeIcon(vol) {
    if (vol == 0 || playerVideo.muted) {
      volumeIcon.setAttribute('data-lucide', 'volume-x');
    } else if (vol < 0.5) {
      volumeIcon.setAttribute('data-lucide', 'volume-1');
    } else {
      volumeIcon.setAttribute('data-lucide', 'volume-2');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // Update Progress / Time
  playerVideo.addEventListener('timeupdate', () => {
    if (!isDraggingProgress) {
      const percentage = (playerVideo.currentTime / playerVideo.duration) * 100;
      progressPlay.style.width = `${percentage}%`;
      progressHandle.style.left = `${percentage}%`;
      timeCurrent.textContent = formatTime(playerVideo.currentTime);
    }
  });

  playerVideo.addEventListener('progress', () => {
    if (playerVideo.buffered.length > 0) {
      const bufferedEnd = playerVideo.buffered.end(playerVideo.buffered.length - 1);
      const percentage = (bufferedEnd / playerVideo.duration) * 100;
      progressBuffered.style.width = `${percentage}%`;
    }
  });

  playerVideo.addEventListener('loadedmetadata', () => {
    timeDuration.textContent = formatTime(playerVideo.duration);
    timeCurrent.textContent = formatTime(0);
  });

  // Timeline seeking click and dragging controls
  function seek(e) {
    const rect = progressContainer.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const boundedPos = Math.max(0, Math.min(1, position));
    
    progressPlay.style.width = `${boundedPos * 100}%`;
    progressHandle.style.left = `${boundedPos * 100}%`;
    
    if (!isDraggingProgress) {
      playerVideo.currentTime = boundedPos * playerVideo.duration;
    }
    return boundedPos;
  }

  progressContainer.addEventListener('mousedown', (e) => {
    isDraggingProgress = true;
    progressContainer.classList.add('dragging');
    seek(e);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDraggingProgress) {
      seek(e);
    }
  });

  window.addEventListener('mouseup', (e) => {
    if (isDraggingProgress) {
      const finalPos = seek(e);
      playerVideo.currentTime = finalPos * playerVideo.duration;
      isDraggingProgress = false;
      progressContainer.classList.remove('dragging');
    }
  });

  // Quality settings selection list
  qualityBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    qualityDropdown.classList.toggle('active');
    resetControlsTimeout();
  });

  document.addEventListener('click', () => {
    qualityDropdown.classList.remove('active');
  });

  const qualityOptions = document.querySelectorAll('.quality-option');
  qualityOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      qualityOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      
      const newQuality = opt.getAttribute('data-quality');
      qualityLabel.textContent = newQuality;
      
      // Simulate switching delay
      console.log(`Setting stream quality resolution to: ${newQuality}`);
      qualityDropdown.classList.remove('active');
    });
  });

  // Full-screen Toggle APIs
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      immersivePlayer.requestFullscreen().then(() => {
        fullscreenIcon.setAttribute('data-lucide', 'minimize');
      }).catch(err => {
        console.log(`Error enabling full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        fullscreenIcon.setAttribute('data-lucide', 'maximize');
      });
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
    resetControlsTimeout();
  }

  fullscreenBtn.addEventListener('click', toggleFullscreen);
  
  // Double click video element to toggle fullscreen
  playerVideo.addEventListener('dblclick', toggleFullscreen);

  // Synchronize fullscreen icon if user exits via browser ESC key
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      fullscreenIcon.setAttribute('data-lucide', 'maximize');
    } else {
      fullscreenIcon.setAttribute('data-lucide', 'minimize');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });

  // Controls UI fade in / out on mouse movement inactivity
  function resetControlsTimeout() {
    controlsOverlay.classList.remove('hidden');
    immersivePlayer.style.cursor = 'default';
    clearTimeout(controlsTimeout);
    
    // Only fade out controls if video is playing and user is not seeking/hovering menus
    if (!playerVideo.paused && !isDraggingProgress && !qualityDropdown.classList.contains('active')) {
      controlsTimeout = setTimeout(() => {
        controlsOverlay.classList.add('hidden');
        immersivePlayer.style.cursor = 'none'; // Hide cursor too for OTT feel
      }, 3000); // 3-second inactivity interval
    }
  }

  immersivePlayer.addEventListener('mousemove', resetControlsTimeout);
  playerVideo.addEventListener('play', resetControlsTimeout);
  playerVideo.addEventListener('pause', resetControlsTimeout);

  // Global window keyboard events for video player
  window.addEventListener('keydown', (e) => {
    if (immersivePlayer.classList.contains('active')) {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault(); // Stop page scrolling
        togglePlay();
      } else if (e.key === 'Escape') {
        closeVideoPlayer();
      } else if (e.key === 'ArrowLeft') {
        playerVideo.currentTime = Math.max(0, playerVideo.currentTime - 5);
        resetControlsTimeout();
      } else if (e.key === 'ArrowRight') {
        playerVideo.currentTime = Math.min(playerVideo.duration, playerVideo.currentTime + 5);
        resetControlsTimeout();
      }
    }
  });


  /* ==========================================================================
     7. LATEST VIDEOS HORIZONTAL SLIDER
     ========================================================================== */
  const videosSlider = document.getElementById('videos-slider');
  const btnPrevVideo = document.getElementById('video-slide-prev');
  const btnNextVideo = document.getElementById('video-slide-next');

  if (videosSlider && btnPrevVideo && btnNextVideo) {
    // Scroll size determined by card width + spacing
    const getScrollOffset = () => {
      const card = videosSlider.querySelector('.video-card');
      const gap = 20; // grid-gap defined in CSS (20px)
      return card ? card.offsetWidth + gap : 295;
    };

    btnNextVideo.addEventListener('click', () => {
      videosSlider.scrollBy({ left: getScrollOffset(), behavior: 'smooth' });
    });

    btnPrevVideo.addEventListener('click', () => {
      videosSlider.scrollBy({ left: -getScrollOffset(), behavior: 'smooth' });
    });

    // Hide arrows if scroll limits are reached (Optional enhancement)
    const toggleArrowVisibility = () => {
      const scrollLeft = Math.ceil(videosSlider.scrollLeft);
      const maxScrollLeft = videosSlider.scrollWidth - videosSlider.clientWidth;
      
      btnPrevVideo.style.opacity = scrollLeft <= 0 ? '0.5' : '1';
      btnPrevVideo.style.pointerEvents = scrollLeft <= 0 ? 'none' : 'auto';
      
      btnNextVideo.style.opacity = scrollLeft >= maxScrollLeft - 1 ? '0.5' : '1';
      btnNextVideo.style.pointerEvents = scrollLeft >= maxScrollLeft - 1 ? 'none' : 'auto';
    };

    videosSlider.addEventListener('scroll', toggleArrowVisibility);
    // Initial run
    setTimeout(toggleArrowVisibility, 500);
  }


  /* ==========================================================================
     8. LOAD MORE NEWS BTN (SIMULATION)
     ========================================================================== */
  const loadMoreNewsBtn = document.getElementById('load-more-news-btn');
  const newsGrid = document.getElementById('news-grid');
  
  const simulatedNewsData = [
    {
      title: "Tamil Nadu Budget Session 2024: Major Allocations for Health & Infrastructure",
      image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&auto=format&fit=crop&q=80",
      time: "2 hours ago",
      reads: "1.1K reads"
    },
    {
      title: "Global Tech Summit Starts Today in Chennai: Key Exhibitors and Innovations",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&auto=format&fit=crop&q=80",
      time: "3 hours ago",
      reads: "890 reads"
    },
    {
      title: "Gold Rates Dip Slightly in Chennai Following Global Market Correction",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
      time: "4 hours ago",
      reads: "2.5K reads"
    }
  ];

  if (loadMoreNewsBtn && newsGrid) {
    let clickCount = 0;
    loadMoreNewsBtn.addEventListener('click', () => {
      loadMoreNewsBtn.innerHTML = 'Loading news...';
      loadMoreNewsBtn.disabled = true;

      // Simulate network request latency (1 sec)
      setTimeout(() => {
        simulatedNewsData.forEach((news, index) => {
          const uniqueId = `news-card-loaded-${clickCount}-${index}`;
          const cardHtml = `
            <article class="news-card" id="${uniqueId}" style="opacity: 0; transform: translateY(15px); transition: all 0.4s ease;">
              <div class="news-image-wrapper">
                <img src="${news.image}" alt="Loaded news image">
              </div>
              <div class="news-body">
                <h3 class="news-title">${news.title}</h3>
                <div class="news-meta">
                  <span class="news-time">${news.time}</span>
                  <span class="meta-dot"></span>
                  <span class="news-reads">${news.reads}</span>
                </div>
              </div>
            </article>
          `;
          
          newsGrid.insertAdjacentHTML('beforeend', cardHtml);
          
          // Animate card appearance
          setTimeout(() => {
            const addedCard = document.getElementById(uniqueId);
            if (addedCard) {
              addedCard.style.opacity = '1';
              addedCard.style.transform = 'translateY(0)';
            }
          }, 50 * index);
        });

        clickCount++;
        loadMoreNewsBtn.innerHTML = 'Load More News <i data-lucide="chevron-down"></i>';
        loadMoreNewsBtn.disabled = false;
        
        // Reinitialize lucide icons for the newly added card icons if any
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        // Limit simulation to 2 clicks
        if (clickCount >= 2) {
          loadMoreNewsBtn.style.display = 'none';
        }
      }, 1000);
    });
  }


  /* ==========================================================================
     9. NEWSLETTER SUBSCRIPTION FORM SUBMIT
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailVal = newsletterEmail.value.trim();
      if (emailVal) {
        alert(`Thank you for subscribing to KINGS 24×7!\nA confirmation email has been sent to ${emailVal}`);
        newsletterEmail.value = '';
      }
    });
  }


  /* ==========================================================================
     10. SOCIAL MEDIA BUTTON CLICKS SIMULATION
     ========================================================================== */
  const fbBtn = document.getElementById('fb-like-btn');
  const xBtn = document.getElementById('x-follow-btn');
  const ytBtn = document.getElementById('yt-subscribe-btn');
  const igBtn = document.getElementById('ig-follow-btn');

  if (fbBtn) {
    fbBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fbBtn.innerHTML = '<i data-lucide="check"></i> Liked';
      fbBtn.style.backgroundColor = '#3b5998';
      fbBtn.style.color = '#ffffff';
      fbBtn.style.borderColor = '#3b5998';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  if (xBtn) {
    xBtn.addEventListener('click', (e) => {
      e.preventDefault();
      xBtn.textContent = 'Following';
      xBtn.style.backgroundColor = '#0f0f0f';
      xBtn.style.color = '#ffffff';
      xBtn.style.borderColor = '#0f0f0f';
    });
  }

  if (ytBtn) {
    ytBtn.addEventListener('click', (e) => {
      e.preventDefault();
      ytBtn.textContent = 'Subscribed';
      ytBtn.style.backgroundColor = '#555555';
      ytBtn.style.borderColor = '#555555';
    });
  }

  if (igBtn) {
    igBtn.addEventListener('click', (e) => {
      e.preventDefault();
      igBtn.textContent = 'Following';
      igBtn.style.backgroundColor = '#e1306c';
      igBtn.style.color = '#ffffff';
      igBtn.style.borderColor = '#e1306c';
    });
  }


  /* ==========================================================================
     11. ROUTING & NEWS REDIRECTS (Navigating to article.html)
     ========================================================================== */

  // Bind click event delegation for all news cards/links on page
  document.addEventListener('click', (e) => {
    // Find closest container that has article attributes
    const card = e.target.closest('[data-article-id]') || e.target.closest('.news-card') || e.target.closest('.sidebar-card') || e.target.closest('.trending-card');
    if (card) {
      // Prevent opening video if they click sports/video items that launch video modal
      if (card.hasAttribute('data-video') && !e.target.closest('.news-body') && !e.target.closest('.card-details')) {
        // Handled by video player click event
        return;
      }
      
      const id = card.getAttribute('data-article-id') || card.getAttribute('id');
      if (id) {
        e.preventDefault();
        
        // Track category click in localStorage for Personalization if dynamic category is available
        const categoryBadge = card.querySelector('.category-badge, .sidebar-badge')?.textContent;
        if (categoryBadge) {
          trackCategoryClick(categoryBadge.trim());
        }
        
        // Redirect to full-page article view
        window.location.href = `article.html?id=${id}`;
      }
    }
  });


  /* ==========================================================================
     12. SKELETON LOADER ANIMATION TIMER
     ========================================================================== */
  const picksSkeleton = document.getElementById('editors-picks-skeleton');
  const picksContent = document.getElementById('editors-picks-content');

  if (picksSkeleton && picksContent) {
    // Simulate loading delay (600ms)
    setTimeout(() => {
      picksSkeleton.style.display = 'none';
      picksContent.style.display = 'grid';
    }, 600);
  }


  /* ==========================================================================
     13. LIVE UPDATES TICKER CONTROLS & PHOTO STORIES SCROLL
     ========================================================================== */
  const liveTicker = document.getElementById('live-ticker-text');
  if (liveTicker) {
    liveTicker.addEventListener('mouseenter', () => {
      liveTicker.style.animationPlayState = 'paused';
    });
    liveTicker.addEventListener('mouseleave', () => {
      liveTicker.style.animationPlayState = 'running';
    });
  }

  // Photo stories horizontal slider buttons
  const photoStoriesSlider = document.getElementById('photostories-slider');
  const btnPrevPhoto = document.getElementById('photo-slide-prev');
  const btnNextPhoto = document.getElementById('photo-slide-next');

  if (photoStoriesSlider && btnPrevPhoto && btnNextPhoto) {
    const getScrollOffset = () => {
      const card = photoStoriesSlider.querySelector('.photo-story-card');
      const gap = 20;
      return card ? card.offsetWidth + gap : 305;
    };

    btnNextPhoto.addEventListener('click', () => {
      photoStoriesSlider.scrollBy({ left: getScrollOffset(), behavior: 'smooth' });
    });
    btnPrevPhoto.addEventListener('click', () => {
      photoStoriesSlider.scrollBy({ left: -getScrollOffset(), behavior: 'smooth' });
    });
  }


  /* ==========================================================================
     14. SMART SEARCH: SUGGESTIONS & CACHING
     ========================================================================== */
  const searchInputEl = document.getElementById('search-input');
  const searchPreviewContainer = document.getElementById('search-preview');

  // Load recent searches from localStorage
  let recentSearches = JSON.parse(localStorage.getItem('recent_searches')) || [];

  function updateSearchUI() {
    if (!searchPreviewContainer) return;
    const value = searchInputEl.value.trim().toLowerCase();

    if (value.length === 0) {
      // Render Trending & Recent Searches
      let recentListHtml = '';
      if (recentSearches.length > 0) {
        recentListHtml = `
          <div class="recent-searches-box" style="margin-top: 20px;">
            <h4>Recent Searches</h4>
            <ul class="recent-searches-list" style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
              ${recentSearches.map(q => `
                <li style="display: flex; justify-content: space-between; align-items: center;">
                  <a href="#" class="search-tag-link" data-query="${q}" style="font-size: 15px; color: rgba(255,255,255,0.8);"><i data-lucide="clock" style="width: 14px; height: 14px; margin-right: 8px; vertical-align: middle;"></i> ${q}</a>
                  <button class="clear-single-search" data-query="${q}" style="color: rgba(255,255,255,0.4); font-size: 11px;">Remove</button>
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      }

      searchPreviewContainer.innerHTML = `
        <h4>Trending Searches</h4>
        <ul class="trending-searches-list">
          <li><a href="#" class="search-tag-link" data-query="Tamil Nadu"><i data-lucide="trending-up"></i> Tamil Nadu Assembly Updates</a></li>
          <li><a href="#" class="search-tag-link" data-query="CSK"><i data-lucide="trending-up"></i> CSK vs RCB Scorecard</a></li>
          <li><a href="#" class="search-tag-link" data-query="Gold Price"><i data-lucide="trending-up"></i> Tamil Nadu Gold Rate Today</a></li>
          <li><a href="#" class="search-tag-link" data-query="NEET"><i data-lucide="trending-up"></i> NEET Results Announcement</a></li>
          <li><a href="#" class="search-tag-link" data-query="Elections"><i data-lucide="trending-up"></i> Assembly Elections Count Trends</a></li>
          <li><a href="#" class="search-tag-link" data-query="Vijay"><i data-lucide="trending-up"></i> Actor Vijay Next Movie Announcement</a></li>
        </ul>
        ${recentListHtml}
      `;
      
      if (typeof lucide !== 'undefined') lucide.createIcons();
      bindSearchTagLinks();
    } else {
      // Perform Instant suggestion filtering in our mock DB
      const matches = [];
      Object.keys(articleDatabase).forEach(key => {
        const art = articleDatabase[key];
        if (art.title.toLowerCase().includes(value) || art.category.toLowerCase().includes(value)) {
          matches.push({ id: key, ...art });
        }
      });

      if (matches.length > 0) {
        searchPreviewContainer.innerHTML = `
          <h4>Instant Suggestions (${matches.length})</h4>
          <ul class="search-suggestions-list" style="list-style: none; display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
            ${matches.slice(0, 5).map(art => `
              <li class="suggestion-item-card" data-id="${art.id}" style="padding: 10px; border-radius: 6px; background-color: rgba(255,255,255,0.06); cursor: pointer; display: flex; gap: 12px; align-items: center;">
                <img src="${art.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                <div>
                  <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: var(--color-gold);">${art.category}</span>
                  <h4 style="font-size: 14px; font-weight: 600; color: #FFF; line-height: 1.35; margin-top: 2px;">${art.title}</h4>
                </div>
              </li>
            `).join('')}
          </ul>
        `;

        // Bind suggestion clicks
        const suggestionItems = searchPreviewContainer.querySelectorAll('.suggestion-item-card');
        suggestionItems.forEach(item => {
          item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            // Cache query
            saveSearchQuery(value);
            // Close search modal
            document.getElementById('search-overlay').classList.remove('active');
            document.body.style.overflow = '';
            // Navigate to article page
            window.location.href = `article.html?id=${id}`;
          });
        });
      } else {
        searchPreviewContainer.innerHTML = `
          <h4>Instant Suggestions</h4>
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin-top: 10px;">No matching results found for "${value}". Try searching for 'Tamil', 'CSK', or 'Gold'.</p>
        `;
      }
    }
  }

  function saveSearchQuery(query) {
    const cleanQ = query.trim();
    if (!cleanQ) return;
    recentSearches = recentSearches.filter(q => q.toLowerCase() !== cleanQ.toLowerCase());
    recentSearches.unshift(cleanQ);
    recentSearches = recentSearches.slice(0, 5); // Keep top 5
    localStorage.setItem('recent_searches', JSON.stringify(recentSearches));
  }

  function bindSearchTagLinks() {
    const tags = searchPreviewContainer.querySelectorAll('.search-tag-link');
    tags.forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        const query = tag.getAttribute('data-query');
        searchInputEl.value = query;
        saveSearchQuery(query);
        updateSearchUI();
      });
    });

    const clears = searchPreviewContainer.querySelectorAll('.clear-single-search');
    clears.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const query = btn.getAttribute('data-query');
        recentSearches = recentSearches.filter(q => q !== query);
        localStorage.setItem('recent_searches', JSON.stringify(recentSearches));
        updateSearchUI();
      });
    });
  }

  if (searchInputEl) {
    searchInputEl.addEventListener('input', updateSearchUI);
    
    // Save search query on enter
    searchInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInputEl.value.trim();
        if (query) {
          saveSearchQuery(query);
          updateSearchUI();
        }
      }
    });

    // Run first update on focus
    const trigger = document.getElementById('search-trigger-btn');
    if (trigger) {
      trigger.addEventListener('click', () => {
        setTimeout(updateSearchUI, 100);
      });
    }
  }


  /* ==========================================================================
     15. PERSONALIZATION: RECOMMENDATIONS ENGINE
     ========================================================================== */
  const recommendedAnonBox = document.getElementById('recommended-anon-box');
  const recommendedGridContent = document.getElementById('recommended-grid-content');
  
  // Track category counts
  function trackCategoryClick(category) {
    if (!category) return;
    let clickCounts = JSON.parse(localStorage.getItem('category_clicks')) || {};
    clickCounts[category] = (clickCounts[category] || 0) + 1;
    localStorage.setItem('category_clicks', JSON.stringify(clickCounts));
    
    // If logged in, update recommended grid
    if (localStorage.getItem('user_logged_in') === 'true') {
      updateRecommendedFeed();
    }
  }

  function getFavoriteCategory() {
    const clickCounts = JSON.parse(localStorage.getItem('category_clicks')) || {};
    let favorite = null;
    let max = -1;
    Object.keys(clickCounts).forEach(cat => {
      if (clickCounts[cat] > max) {
        max = clickCounts[cat];
        favorite = cat;
      }
    });
    return favorite;
  }

  function updateRecommendedFeed() {
    if (!recommendedGridContent) return;
    const favoriteCategory = getFavoriteCategory();
    
    // Filter articles based on favorites
    const pool = [];
    Object.keys(articleDatabase).forEach(key => {
      const art = articleDatabase[key];
      // Exclude fact checks or live updates from regular recommendation blocks to avoid redundant lists
      if (art.category !== "Fact Check" && !key.startsWith('live') && !key.startsWith('ps')) {
        pool.push({ id: key, ...art });
      }
    });

    let matches = [];
    if (favoriteCategory) {
      matches = pool.filter(art => art.category.toLowerCase() === favoriteCategory.toLowerCase());
    }
    
    // If we don't have enough matches in favorite category, fill with remaining ones
    if (matches.length < 4) {
      const matchesIds = new Set(matches.map(m => m.id));
      pool.forEach(art => {
        if (!matchesIds.has(art.id) && matches.length < 4) {
          matches.push(art);
        }
      });
    }

    // Slice to exactly 4 recommended cards
    const recommendedList = matches.slice(0, 4);

    recommendedGridContent.innerHTML = recommendedList.map(art => `
      <article class="news-card recommended-card" data-article-id="${art.id}">
        <div class="news-image-wrapper">
          <img src="${art.image}" alt="Recommended News Image" loading="lazy">
          <span class="category-badge" style="background-color: var(--cat-${art.category.toLowerCase().replace(' ', '')}) !important;">${art.category}</span>
        </div>
        <div class="news-body">
          <h3 class="news-title">${art.title}</h3>
          <div class="news-meta">
            <span class="news-author">${art.author}</span>
            <span class="meta-dot"></span>
            <span class="news-time">${art.updated}</span>
            <span class="meta-dot"></span>
            <span class="news-reading-time">${art.readTime}</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  function setLoginState(isLoggedIn, email = '') {
    const loginTextEl = document.querySelector('.login-text');
    const drawerLoginTextEl = document.querySelector('.drawer-login-text');
    if (isLoggedIn) {
      localStorage.setItem('user_logged_in', 'true');
      localStorage.setItem('user_email', email);
      
      const displayName = email.split('@')[0] || "Profile";
      if (loginTextEl) {
        loginTextEl.textContent = displayName;
      }
      if (drawerLoginTextEl) {
        drawerLoginTextEl.textContent = displayName;
      }
      
      // Toggle personal blocks
      if (recommendedAnonBox) recommendedAnonBox.style.display = 'none';
      if (recommendedGridContent) {
        recommendedGridContent.style.display = 'grid';
        updateRecommendedFeed();
      }
    } else {
      localStorage.setItem('user_logged_in', 'false');
      localStorage.removeItem('user_email');
      
      const defaultText = "Login / Create Account";
      if (loginTextEl) {
        loginTextEl.textContent = defaultText;
      }
      if (drawerLoginTextEl) {
        drawerLoginTextEl.textContent = defaultText;
      }
      
      if (recommendedAnonBox) recommendedAnonBox.style.display = 'flex';
      if (recommendedGridContent) recommendedGridContent.style.display = 'none';
    }
  }

  // Intercept the Auth Form Submit to wire up Login state changes
  const originalAuthForm = document.getElementById('auth-form');
  if (originalAuthForm) {
    // Replace listener
    const clone = originalAuthForm.cloneNode(true);
    originalAuthForm.parentNode.replaceChild(clone, originalAuthForm);

    clone.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      setLoginState(true, email);
      document.getElementById('login-overlay').classList.remove('active');
      document.body.style.overflow = '';
      alert(`Success: Logged in as ${email}!`);
    });
  }

  // Bind mini-login-btn in recommended section
  const miniLoginBtn = document.getElementById('mini-login-btn');
  if (miniLoginBtn) {
    miniLoginBtn.addEventListener('click', () => {
      document.getElementById('login-overlay').classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Initialize login state from localStorage
  const wasLoggedIn = localStorage.getItem('user_logged_in') === 'true';
  const savedEmail = localStorage.getItem('user_email') || '';
  setLoginState(wasLoggedIn, savedEmail);


  /* ==========================================================================
     16. MOBILE BOTTOM NAVIGATION SCROLLS & DRAWER TOGGLES
     ========================================================================== */
  const mNavHome = document.getElementById('m-nav-home');
  const mNavVideos = document.getElementById('m-nav-videos');
  const mNavLive = document.getElementById('m-nav-live');
  const mNavAlerts = document.getElementById('m-nav-alerts');
  const mNavProfile = document.getElementById('m-nav-profile');

  function resetMobileNavActives() {
    document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item').forEach(item => item.classList.remove('active'));
  }

  if (mNavHome) {
    mNavHome.addEventListener('click', (e) => {
      e.preventDefault();
      resetMobileNavActives();
      mNavHome.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (mNavVideos) {
    mNavVideos.addEventListener('click', (e) => {
      e.preventDefault();
      resetMobileNavActives();
      mNavVideos.classList.add('active');
      const target = document.getElementById('videos-section');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (mNavLive) {
    mNavLive.addEventListener('click', (e) => {
      e.preventDefault();
      resetMobileNavActives();
      mNavLive.classList.add('active');
      const target = document.getElementById('live-updates-section');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (mNavAlerts) {
    mNavAlerts.addEventListener('click', (e) => {
      e.preventDefault();
      // Open notifications drawer
      toggleNotifications(true);
    });
  }

  if (mNavProfile) {
    mNavProfile.addEventListener('click', (e) => {
      e.preventDefault();
      // Open login modal
      document.getElementById('login-overlay').classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Shared share functions simulation
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = btn.className.split(' ')[1] || 'Social Media';
      if (platform === 'copy-link') {
        const dummy = document.createElement('input'),
              text = window.location.href;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check"></i> Copied!';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        setTimeout(() => {
          btn.innerHTML = originalText;
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 1500);
      } else {
        alert(`Sharing this article on ${platform.toUpperCase()}...`);
      }
    });
  });
});
