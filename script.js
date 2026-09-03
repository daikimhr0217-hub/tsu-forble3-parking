// 津フォーブルⅢ 月極駐車場 LP
// 依存ライブラリなし。ギャラリー拡大表示 + CTAクリックのGA4イベント送信のみ。

(function () {
  "use strict";

  /* ---- ギャラリー画像の拡大表示 ---- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var full = btn.getAttribute("data-full");
      var alt = btn.querySelector("img").getAttribute("alt");
      lightboxImg.src = full;
      lightboxImg.alt = alt;
      lightbox.hidden = false;
    });
  });

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
  }
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---- 電話CTAクリックをGA4に送信（gtag未導入時は何もしない） ---- */
  document.querySelectorAll("a[data-cta]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (typeof window.gtag === "function") {
        window.gtag("event", "phone_click", {
          cta_location: link.getAttribute("data-cta"),
        });
      }
    });
  });
})();
