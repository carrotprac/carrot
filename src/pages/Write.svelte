<script>
  import { getDatabase, ref, set, push } from "firebase/database";
  import Footer from "../components/Footer.svelte";
  import {
    getDownloadURL,
    getStorage,
    ref as refImage,
    uploadBytes,
  } from "firebase/storage";

  let title;
  let price;
  let place;
  let description;
  let files;
  const storage = getStorage();
  const db = getDatabase();

  async function writeUserData(imgUrl) {
    // event.preventDefault();

    // set(ref(db, "items/" + title), {
    //   title,
    //   price,
    //   description,
    //   place,
    // });
    push(ref(db, "items/"), {
      title,
      price,
      description,
      place,
      imgUrl,
      insertAt: new Date().getTime(),
    });
    alert("글쓰기 완료");
    window.location.hash = "/";
  }

  let randomInteger = Math.floor(Math.random() * 10000) + 1;
  // $: if (files) console.log(files);

  const uploadFile = async () => {
    const file = files[0];
    const imgRef = refImage(storage, `${randomInteger}`);
    await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);
    return url;
  };

  const handleSubmit = async () => {
    const url = await uploadFile();
    writeUserData(url);
  };
</script>

<form id="write-form" on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="image">이미지</label>
    <input type="file" bind:files id="image" name="image" />
  </div>
  <div>
    <label for="title">제목</label>
    <input type="text" id="title" name="title" bind:value={title} />
  </div>
  <div>
    <label for="price">가격</label>
    <input type="number" id="price" name="price" bind:value={price} />
  </div>
  <div>
    <label for="description">설명</label>
    <input
      type="text"
      id="description"
      name="description"
      bind:value={description}
    />
  </div>
  <div>
    <label for="place">장소</label>
    <input type="text" id="place" name="place" bind:value={place} />
  </div>
  <div>
    <button type="submit">제출</button>
  </div>
</form>

<Footer location="write" />
