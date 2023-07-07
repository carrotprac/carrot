<script>
  import { getDatabase, onValue, ref } from "firebase/database";
  import { onMount } from "svelte";
  import Nav from "../components/Nav.svelte";

  let time = new Date().toLocaleTimeString("ko-KR");

  //반응형 변수 //렌더링하는 태그에서 자동으로 화면 업데이트
  $: items = [];

  const db = getDatabase();
  const itemsRef = ref(db, "items/");

  onMount(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data);
    });
  });
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

<main>
  {#each items as item}
    <div class="item-list">
      <div class="item-list__img">
        <img src={item.imgUrl} alt="" />
      </div>
      <div class="item-list__info">
        <div class="item-list__info-title">{item.title}</div>
        <div class="item-list__info-meta">{item.place}</div>
        <div class="item-list__info-price">{item.price}</div>
        <div>{item.description}</div>
      </div>
    </div>
  {/each}
  <a class="write-btn" href="#/write">+글쓰기</a>
</main>

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

<Nav location="home" />

<div class="media-info-msg">화면사이즈를 줄여주세요</div>
