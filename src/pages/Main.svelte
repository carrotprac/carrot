<script>
  let time = new Date().toLocaleTimeString("ko-KR");
</script>

<header>
  <div class="info-bar">
    <div class="info-bar__time">{time}</div>
    <div class="info-bar__icons">
      <img src="assets/chart-bar.svg" alt="chart-bar" />
      <img src="assets/wifi.svg" alt="wifi" />
      <img src="assets/battery.svg" alt="battery" />
    </div>
  </div>
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>잠원동</div>
      <div class="menu-bar__location-화살표">
        <img src="assets/arrowdown.svg" alt="" />
      </div>
    </div>
    <div class="menu-bar__icons">
      <img src="assets/search.svg" alt="" />
      <img src="assets/menu.svg" alt="" />
      <img src="assets/alert.svg" alt="" />
      <img class="unread" alt="" />
    </div>
  </div>
</header>

<main />

<div id="pagination" class="pagination">
  <div class="pagination__pages">
    <button class="pagination__page">1</button>
    <button class="pagination__page">2</button>
    <button class="pagination__page">3</button>
    <button class="pagination__page">4</button>
    <button class="pagination__page">5</button>
    <button id="loadMoreBtn" class="load-more">>></button>
  </div>
</div>
<a class="write-btn" href="#/write">+글쓰기</a>

<footer class="footer-block">
  <div class="footer-icons">
    <div class="footer-icons__img">
      <img src="assets/home.svg" alt="" />
    </div>
    <div>홈</div>
  </div>
  <div class="footer-icons">
    <div class="footer-icons__img">
      <img src="assets/doc.svg" alt="" />
    </div>
    <div>동네생활</div>
  </div>
  <div class="footer-icons">
    <div class="footer-icons__img">
      <img src="assets/location.svg" alt="" />
    </div>
    <div>내 근처</div>
  </div>
  <div class="footer-icons">
    <div class="footer-icons__img">
      <a href="chat.html">
        <img src="assets/chat.svg" alt="" />
      </a>
    </div>
    <div>채팅</div>
  </div>
  <div class="footer-icons">
    <div class="footer-icons__img">
      <img src="assets/user.svg" alt="" />
    </div>
    <div>내 정보</div>
  </div>
</footer>

<div class="media-info-msg">화면사이즈를 줄여주세요</div>
