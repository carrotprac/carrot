<script>
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { user$ } from "../store";

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      user$.set(user);
      localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div>
  {#if $user$}
    <div>{$user$.displayName} 로그인됨</div>
  {:else}
    <div>로그인하기</div>
  {/if}
  <button class="login-btn" on:click={loginWithGoogle}>
    <div>
      <div>Google로 시작하기</div>
    </div>
  </button>
</div>

<!-- <form id="login-form" action="/signup" method="POST">
  <div>로그인하기</div>
  <div>
    <label for="id">아이디</label>
    <input type="text" id="id" name="id" required />
  </div>
  <div>
    <label for="password">패스워드</label>
    <input type="password" id="password" name="password" required />
  </div>
  <div>
    <button type="submit">로그인</button>
  </div>
  <div id="info" />
</form> -->

<style>
  .login-btn {
    width: 200px;
    height: 50px;
    border: 1px solid gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
  }
</style>
