let jtext = document.getElementById("txt");
let jimg = document.getElementById("image");
let jbtn = document.getElementById("btn");
let jlink = document.getElementById("downloadLink");
let jshareBtn = document.getElementById("sharebtn");

async function getdata(links) {
  const response = await fetch(
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${links}`
  );
  const blobs = await response.blob();
  return URL.createObjectURL(blobs);
}

jbtn.addEventListener("click", generateQRCode);

jtext.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    generateQRCode();
  }
});

async function generateQRCode() {
  let store = jtext.value;
  let final = await getdata(store);
  jimg.src = final;
  jlink.href = final;
  jlink.style.display = "block";
}

jshareBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(jimg.src);
    const datashare = await response.blob();
    const sharefile = new File([datashare], "qrcode.png", {
      type: "image/png",
    });

    await navigator.share({
      title: "apurv shashvat QR Code ",
      text: "scan this qr code:${jtext.value} ",
      files: [sharefile],
    });
  } catch (err) {
    console.error("Error sharing QR code:", err);
    alert("problem in sharing ur qr code");
  }
});
