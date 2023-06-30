// const Pagination = require("./pagination");
// const pagination = new Pagination();
// pagination.renderPageBtn();
// pagination.renderMoreBtn();

const calculateTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (minute > 0) return `${second}초 전`;
  else return "방금 전";
};

const renderData = (data) => {
  const main = document.querySelector("main");
  // 이전 데이터 삭제
  main.innerHTML = "";

  data
    .map(async (obj) => {
      const div = document.createElement("div");
      div.className = "item-list";

      const imgDiv = document.createElement("div");
      imgDiv.className = "item-list__img";

      const img = document.createElement("img");
      const res = await fetch(`/images/${obj.id}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      console.log(url);
      img.src = url;

      const InfoDiv = document.createElement("div");
      InfoDiv.className = "item-list__info";

      const InfoTitleDiv = document.createElement("div");
      InfoTitleDiv.className = "item-list__info-title";
      InfoTitleDiv.innerText = obj.title;

      const InfoMetaDiv = document.createElement("div");
      InfoMetaDiv.className = "item-list__info-meta";
      InfoMetaDiv.innerText = obj.place + " " + calculateTime(obj.insertAt);

      const InfoPriceDiv = document.createElement("div");
      InfoPriceDiv.className = "item-list__info-price";
      InfoPriceDiv.innerText = obj.price;

      imgDiv.appendChild(img);
      InfoDiv.appendChild(InfoTitleDiv);
      InfoDiv.appendChild(InfoMetaDiv);
      InfoDiv.appendChild(InfoPriceDiv);

      div.appendChild(imgDiv);
      div.appendChild(InfoDiv);

      main.appendChild(div);
    })
    .reverse();
};

let currentPage = 1; // 현재 페이지 초기값

const fetchList = async (currentPage) => {
  const accessToken = window.localStorage.getItem("token");
  const res = await fetch(`/items?page=${currentPage}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 401) {
    alert("로그인이 필요합니다!");
    window.location.pathname = "/login.html";
    return;
  }

  const data = await res.json();
  console.log(data);
  window.localStorage.totalPages = data.total_pages;
  renderData(data.rows);
};

const getNext = (targetPage) => {
  currentPage = targetPage; // 다음 페이지로 이동
  fetchList(currentPage); // 다음 페이지 데이터 가져오기
};

const paginationBtns = document.querySelectorAll(".pagination__page");
const loadMoreBtn = document.getElementById("loadMoreBtn");

paginationBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const targetPage = btn.innerText;
    getNext(targetPage);
  });
});

loadMoreBtn.addEventListener("click", () => {
  updatePageBtn();
});

const updatePageBtn = () => {
  console.log(Number(paginationBtns[4].innerText));
  console.log(window.localStorage.totalPages);
  if (Number(paginationBtns[4].innerText) < window.localStorage.totalPages) {
    paginationBtns.forEach((btn) => {
      btn.innerText = Number(btn.innerText) + 5;
    });
  } else if (
    Number(paginationBtns[4].innerText) + 5 >=
    window.localStorage.totalPages
  ) {
    let lastPageNum = Number(paginationBtns[4].innerText);

    while (lastPageNum <= window.localStorage.totalPages) {
      paginationBtns.forEach((btn) => {
        lastPageNum += 1;
        if (lastPageNum <= window.localStorage.totalPages) {
          btn.innerText = lastPageNum;
        }
      });
    }
  }
};

fetchList(currentPage);
