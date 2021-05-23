export function downloadImage(url) {
  fetch(url, { method: "GET" })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(
          new Blob([buffer], { type: "image/*" })
        );
        const link = document.createElement("a");
        link.href = url;
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}