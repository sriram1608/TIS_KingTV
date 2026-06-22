// KINGS 24×7 - Article Page Controller
import { articleDatabase, getFallbackImage } from './news-db.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Global Image Error Fallback Handler
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      const card = e.target.closest('[data-article-id]') || e.target.closest('.news-card') || e.target.closest('.sidebar-card') || e.target.closest('.trending-card') || e.target.closest('.article-detail-container');
      let category = 'politics';
      if (card) {
        const badge = card.querySelector('.category-badge, .sidebar-badge, .article-category-badge');
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

  if (menuToggleBtn && mobileNavDrawer) {
    menuToggleBtn.addEventListener('click', () => toggleMobileDrawer(true));
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => toggleMobileDrawer(false));
  }
  if (mobileDrawerOverlay) {
    mobileDrawerOverlay.addEventListener('click', () => toggleMobileDrawer(false));
  }

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
  const searchPreviewContainer = document.getElementById('search-preview');

  if (searchTriggerBtn && searchOverlay) {
    searchTriggerBtn.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput && searchInput.focus(), 300);
    });
  }

  if (searchCloseBtn && searchOverlay) {
    searchCloseBtn.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close search on escape press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Recent searches from localStorage
  let recentSearches = JSON.parse(localStorage.getItem('recent_searches')) || [];

  function updateSearchUI() {
    if (!searchPreviewContainer || !searchInput) return;
    const value = searchInput.value.trim().toLowerCase();

    if (value.length === 0) {
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

        const suggestionItems = searchPreviewContainer.querySelectorAll('.suggestion-item-card');
        suggestionItems.forEach(item => {
          item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            saveSearchQuery(value);
            searchOverlay.classList.remove('active');
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
    recentSearches = recentSearches.slice(0, 5);
    localStorage.setItem('recent_searches', JSON.stringify(recentSearches));
  }

  function bindSearchTagLinks() {
    if (!searchPreviewContainer) return;
    const tags = searchPreviewContainer.querySelectorAll('.search-tag-link');
    tags.forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        const query = tag.getAttribute('data-query');
        if (searchInput) {
          searchInput.value = query;
          saveSearchQuery(query);
          updateSearchUI();
        }
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

  if (searchInput) {
    searchInput.addEventListener('input', updateSearchUI);
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          saveSearchQuery(query);
          updateSearchUI();
        }
      }
    });
  }


  /* ==========================================================================
     4. USER AUTHENTICATION MODAL (LOGIN / SIGN UP)
     ========================================================================== */
  const loginBtn = document.getElementById('login-btn');
  const loginOverlay = document.getElementById('login-overlay');
  const loginCloseBtn = document.getElementById('login-close-btn');
  const toggleSignup = document.getElementById('toggle-signup');
  const authForm = document.getElementById('auth-form');
  const btnSignin = document.getElementById('btn-signin');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      loginOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  const drawerLoginBtn = document.getElementById('drawer-login-btn');
  if (drawerLoginBtn) {
    drawerLoginBtn.addEventListener('click', () => {
      toggleMobileDrawer(false);
      loginOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (loginCloseBtn) {
    loginCloseBtn.addEventListener('click', () => {
      loginOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (loginOverlay) {
    loginOverlay.addEventListener('click', (e) => {
      if (e.target === loginOverlay) {
        loginOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  let isLoginMode = true;
  if (toggleSignup) {
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
    }
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      setLoginState(true, email);
      loginOverlay.classList.remove('active');
      document.body.style.overflow = '';
      alert(`Success: Logged in as ${email}!`);
    });
  }

  // Initialize Auth state from localStorage
  const wasLoggedIn = localStorage.getItem('user_logged_in') === 'true';
  const savedEmail = localStorage.getItem('user_email') || '';
  setLoginState(wasLoggedIn, savedEmail);


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

  if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
      toggleNotifications(true);
      if (notificationDot) {
        notificationDot.style.display = 'none';
      }
    });
  }

  if (notificationsCloseBtn) {
    notificationsCloseBtn.addEventListener('click', () => toggleNotifications(false));
  }
  if (notificationsOverlay) {
    notificationsOverlay.addEventListener('click', () => toggleNotifications(false));
  }

  const markAllRead = document.querySelector('.view-all-notifications');
  if (markAllRead) {
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
  }

  // Subscribe premium trigger in header
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


  /* ==========================================================================
     6. IMMERSIVE CUSTOM VIDEO PLAYER CONTROLS (Common layout matches home)
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

  let isDraggingProgress = false;
  let controlsTimeout;

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function openVideoPlayer(videoUrl, titleText) {
    playerVideo.src = videoUrl;
    videoTitleElement.textContent = titleText || "Featured News Broadcast";
    immersivePlayer.classList.add('active');
    document.body.style.overflow = 'hidden';

    playerVideo.load();
    playerVideo.play().then(() => {
      updatePlayIcons(true);
    }).catch(error => {
      console.log("Autoplay prevented", error);
      updatePlayIcons(false);
    });

    playerVideo.volume = volumeSlider.value;
    updateVolumeIcon(playerVideo.volume);
    resetControlsTimeout();
  }

  function closeVideoPlayer() {
    playerVideo.pause();
    playerVideo.src = "";
    immersivePlayer.classList.remove('active');
    document.body.style.overflow = '';
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.log(err));
    }
  }

  function togglePlay() {
    if (playerVideo.paused) {
      playerVideo.play();
      updatePlayIcons(true);
      triggerMiddlePulse();
    } else {
      playerVideo.pause();
      updatePlayIcons(false);
      triggerMiddlePulse();
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

  function triggerMiddlePulse() {
    if (!middleAction) return;
    middleAction.classList.remove('trigger-pulse');
    void middleAction.offsetWidth;
    middleAction.classList.add('trigger-pulse');
  }

  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (playerVideo) playerVideo.addEventListener('click', togglePlay);
  if (closeBtn) closeBtn.addEventListener('click', closeVideoPlayer);

  if (rewindBtn) {
    rewindBtn.addEventListener('click', () => {
      playerVideo.currentTime = Math.max(0, playerVideo.currentTime - 10);
      resetControlsTimeout();
    });
  }
  if (forwardBtn) {
    forwardBtn.addEventListener('click', () => {
      playerVideo.currentTime = Math.min(playerVideo.duration, playerVideo.currentTime + 10);
      resetControlsTimeout();
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const vol = e.target.value;
      playerVideo.volume = vol;
      playerVideo.muted = (vol == 0);
      updateVolumeIcon(vol);
      resetControlsTimeout();
    });
  }

  if (volumeBtn) {
    volumeBtn.addEventListener('click', () => {
      playerVideo.muted = !playerVideo.muted;
      if (playerVideo.muted) {
        updateVolumeIcon(0);
        if (volumeSlider) volumeSlider.value = 0;
      } else {
        if (volumeSlider) volumeSlider.value = playerVideo.volume || 1;
        updateVolumeIcon(playerVideo.volume || 1);
      }
      resetControlsTimeout();
    });
  }

  function updateVolumeIcon(vol) {
    if (!volumeIcon) return;
    if (vol == 0 || playerVideo.muted) {
      volumeIcon.setAttribute('data-lucide', 'volume-x');
    } else if (vol < 0.5) {
      volumeIcon.setAttribute('data-lucide', 'volume-1');
    } else {
      volumeIcon.setAttribute('data-lucide', 'volume-2');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  if (playerVideo) {
    playerVideo.addEventListener('timeupdate', () => {
      if (!isDraggingProgress) {
        const percentage = (playerVideo.currentTime / playerVideo.duration) * 100;
        if (progressPlay) progressPlay.style.width = `${percentage}%`;
        if (progressHandle) progressHandle.style.left = `${percentage}%`;
        if (timeCurrent) timeCurrent.textContent = formatTime(playerVideo.currentTime);
      }
    });

    playerVideo.addEventListener('progress', () => {
      if (playerVideo.buffered.length > 0) {
        const bufferedEnd = playerVideo.buffered.end(playerVideo.buffered.length - 1);
        const percentage = (bufferedEnd / playerVideo.duration) * 100;
        if (progressBuffered) progressBuffered.style.width = `${percentage}%`;
      }
    });

    playerVideo.addEventListener('loadedmetadata', () => {
      if (timeDuration) timeDuration.textContent = formatTime(playerVideo.duration);
      if (timeCurrent) timeCurrent.textContent = formatTime(0);
    });
  }

  function seek(e) {
    if (!progressContainer) return 0;
    const rect = progressContainer.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const boundedPos = Math.max(0, Math.min(1, position));
    
    if (progressPlay) progressPlay.style.width = `${boundedPos * 100}%`;
    if (progressHandle) progressHandle.style.left = `${boundedPos * 100}%`;
    
    if (!isDraggingProgress) {
      playerVideo.currentTime = boundedPos * playerVideo.duration;
    }
    return boundedPos;
  }

  if (progressContainer) {
    progressContainer.addEventListener('mousedown', (e) => {
      isDraggingProgress = true;
      progressContainer.classList.add('dragging');
      seek(e);
    });
  }

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
      if (progressContainer) progressContainer.classList.remove('dragging');
    }
  });

  if (qualityBtn && qualityDropdown) {
    qualityBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      qualityDropdown.classList.toggle('active');
      resetControlsTimeout();
    });
  }

  document.addEventListener('click', () => {
    if (qualityDropdown) qualityDropdown.classList.remove('active');
  });

  const qualityOptions = document.querySelectorAll('.quality-option');
  qualityOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      qualityOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const newQuality = opt.getAttribute('data-quality');
      if (qualityLabel) qualityLabel.textContent = newQuality;
      if (qualityDropdown) qualityDropdown.classList.remove('active');
    });
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      immersivePlayer.requestFullscreen().then(() => {
        fullscreenIcon.setAttribute('data-lucide', 'minimize');
      }).catch(err => {
        console.log(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        fullscreenIcon.setAttribute('data-lucide', 'maximize');
      });
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
    resetControlsTimeout();
  }

  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  function resetControlsTimeout() {
    if (!controlsOverlay || !immersivePlayer) return;
    controlsOverlay.classList.remove('hidden');
    immersivePlayer.style.cursor = 'default';
    clearTimeout(controlsTimeout);
    
    if (!playerVideo.paused && !isDraggingProgress && (!qualityDropdown || !qualityDropdown.classList.contains('active'))) {
      controlsTimeout = setTimeout(() => {
        controlsOverlay.classList.add('hidden');
        immersivePlayer.style.cursor = 'none';
      }, 3000);
    }
  }

  if (immersivePlayer) {
    immersivePlayer.addEventListener('mousemove', resetControlsTimeout);
  }


  /* ==========================================================================
     7. ARTICLE RENDERING LOGIC
     ========================================================================== */
  const articleDetailView = document.getElementById('article-detail-view');
  const categoryBadge = document.getElementById('article-detail-category');
  const headline = document.getElementById('article-detail-title');
  const author = document.getElementById('article-detail-author');
  const readTime = document.getElementById('article-detail-read-time');
  const published = document.getElementById('article-detail-published');
  const updated = document.getElementById('article-detail-updated');
  const image = document.getElementById('article-detail-image');
  const bodyText = document.getElementById('article-detail-body');

  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('id') || params.get('article');

  if (articleId && articleDatabase[articleId]) {
    const article = articleDatabase[articleId];

    // Page title SEO
    document.title = `${article.title} | KINGS 24×7`;

    // Render properties
    if (categoryBadge) {
      categoryBadge.textContent = article.category;
      // Add custom category background color if exists
      const colorClass = `var(--cat-${article.category.toLowerCase().replace(/[\s\-_]/g, '')})`;
      categoryBadge.style.backgroundColor = colorClass;
      categoryBadge.style.color = '#FFFFFF';
    }
    if (headline) headline.textContent = article.title;
    if (author) author.textContent = article.author;
    if (readTime) readTime.textContent = article.readTime;
    if (published) published.textContent = article.published;
    if (updated) updated.textContent = article.updated;
    
    if (image) {
      image.src = article.image || getFallbackImage(article.category);
      image.alt = article.title;
      // Fallback onerror logic
      image.addEventListener('error', () => {
        image.src = getFallbackImage(article.category);
      });
    }

    if (bodyText) {
      bodyText.innerHTML = article.body.map(para => `<p>${para}</p>`).join('');
    }
  } else {
    // Article not found or no ID provided
    if (articleDetailView) {
      articleDetailView.innerHTML = `
        <div class="article-not-found" style="text-align: center; padding: 60px 20px;">
          <h2 style="font-family: var(--font-display); font-size: 28px; margin-bottom: 16px;">Article Not Found</h2>
          <p style="color: var(--text-muted); margin-bottom: 24px;">The article you are looking for does not exist or has been removed.</p>
          <a href="/" class="btn-outlined"><i data-lucide="arrow-left" style="vertical-align: middle; margin-right: 6px;"></i> Return to Homepage</a>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }


  /* ==========================================================================
     8. SHARE BUTTON ACTIONS
     ========================================================================== */
  const shareWhatsapp = document.getElementById('share-whatsapp');
  const shareFacebook = document.getElementById('share-facebook');
  const shareTwitter = document.getElementById('share-twitter');
  const shareTelegram = document.getElementById('share-telegram');
  const shareCopy = document.getElementById('share-copy');

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(headline ? headline.textContent : 'Kings 24x7 Article');

  if (shareWhatsapp) shareWhatsapp.href = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`;
  if (shareFacebook) shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  if (shareTwitter) shareTwitter.href = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
  if (shareTelegram) shareTelegram.href = `https://t.me/share/url?url=${shareUrl}&text=${shareText}`;

  if (shareCopy) {
    shareCopy.addEventListener('click', (e) => {
      e.preventDefault();
      const dummy = document.createElement('input');
      document.body.appendChild(dummy);
      dummy.value = window.location.href;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);

      const originalText = shareCopy.innerHTML;
      shareCopy.innerHTML = '<i data-lucide="check"></i> Copied!';
      if (typeof lucide !== 'undefined') lucide.createIcons();
      setTimeout(() => {
        shareCopy.innerHTML = originalText;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 1500);
    });
  }


  /* ==========================================================================
     9. MOBILE BOTTOM NAVIGATION SCROLLS & ACTIONS
     ========================================================================== */
  const mNavHome = document.getElementById('m-nav-home');
  const mNavVideos = document.getElementById('m-nav-videos');
  const mNavLive = document.getElementById('m-nav-live');
  const mNavAlerts = document.getElementById('m-nav-alerts');
  const mNavProfile = document.getElementById('m-nav-profile');

  if (mNavHome) {
    mNavHome.addEventListener('click', () => {
      window.location.href = '/';
    });
  }
  if (mNavVideos) {
    mNavVideos.addEventListener('click', () => {
      window.location.href = '/#videos-section';
    });
  }
  if (mNavLive) {
    mNavLive.addEventListener('click', () => {
      window.location.href = '/#live-updates-section';
    });
  }
  if (mNavAlerts) {
    mNavAlerts.addEventListener('click', (e) => {
      e.preventDefault();
      toggleNotifications(true);
    });
  }
  if (mNavProfile) {
    mNavProfile.addEventListener('click', (e) => {
      e.preventDefault();
      if (loginOverlay) {
        loginOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Bind click event delegation for live alert links to open them on article.html
  const liveAlertLinks = document.querySelectorAll('.live-update-link');
  liveAlertLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('data-article-id');
      if (id) {
        window.location.href = `article.html?id=${id}`;
      }
    });
  });
});
