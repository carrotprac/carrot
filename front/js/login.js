const form = document.querySelector("#login-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  //sha256은 단방향. 즉, 복호화가 불가능. 따라서 이렇게 암호화를 한 것 끼리 비교해야 한다.
  //회원가입시 암호화하여 저장하고, 로그인시에도 암호화하여 암호문끼리 비교하는 것.
  //같은 평문을 암호화하면 암호문도 같기 때문에, 비교가 가능하다.
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  const res = await fetch("/login", {
    method: "post",
    body: formData,
    credentials: "include", // 쿠키를 요청과 응답에 포함시키도록 설정
  });
  const data = await res.json();
  alert(data.message);
  const accessToken = document.cookie.substring(13); // 현재 페이지의 쿠키에 접근

  // const accessToken = data.access_token;
  if (accessToken) {
    localStorage.setItem("token", accessToken);
    window.location.pathname = "/";
  }
};

form.addEventListener("submit", handleSubmit);
