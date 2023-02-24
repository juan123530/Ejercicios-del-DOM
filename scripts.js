
function hamburger() {
  const $btnHamburger = document.querySelector(".hamburger"),
    $nav = document.querySelector(".nav");

  $btnHamburger.addEventListener("click", () => {
    $btnHamburger.classList.toggle("is-active");
    $nav.classList.toggle("show");
  });

  $nav.addEventListener("click", () => {
    $nav.classList.toggle("show");
    $btnHamburger.classList.toggle("is-active");
  });
}

function relojAlarma(btnStarReloj, btnStopReloj, btnStarAlarma, btnStopAlarma) {
  let interval;
  const $divReloj = document.querySelector(".reloj");
  const $audio = document.querySelector("audio");

  document.addEventListener("click", (e) => {
    if (e.target.matches(btnStarReloj)) {
      reloj();
      interval = setInterval(reloj, 1000);
      document.querySelector(btnStarReloj).disabled = true;
    }

    if (e.target.matches(btnStopReloj)) {
      clearInterval(interval);
      document.querySelector(btnStarReloj).disabled = false;
      $divReloj.innerHTML = `00:00:00`;
    }

    if (e.target.matches(btnStarAlarma)) {
      $audio.play();
      document.querySelector(btnStarAlarma).disabled = true;
    }

    if (e.target.matches(btnStopAlarma)) {
      $audio.pause();
      document.querySelector(btnStarAlarma).disabled = false;
    }
  });
}

function reloj() {
  const $divReloj = document.querySelector(".reloj");
  let hora = new Date();
  $divReloj.innerHTML = hora.toLocaleTimeString();
}

function alertas() {
  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.key === "a") {
      alert("Haz ejecutado una alerta desde tu teclado");
    }

    if (e.altKey && e.key === "p") {
      prompt("Haz ejecutado un Promp desde tu teclado");
    }

    if (e.altKey && e.key === "c") {
      confirm("Haz ejecutado un Confirm desde tu teclado");
    }
  });
}

function mover(camp, ball) {
  const $campEl = document.querySelector(camp),
    $ballEl = document.querySelector(ball),
    square = $campEl.getBoundingClientRect(),
    bola = $ballEl.getBoundingClientRect();

  let desplazamiento = 10;
  const heightDif = square.height - bola.height - desplazamiento - 2,
    widthDif = square.width - bola.width - desplazamiento - 2;

  let x = 0,
    y = 0;

  console.log(square);

  $campEl.addEventListener("click", (e) => {
    $ballEl.style.opacity = 1;

    document.addEventListener("keydown", (e) => {
      e.preventDefault();

      if (e.key === "ArrowDown") {
        if (y < heightDif) {
          y = y + desplazamiento;
          $ballEl.style.left = `${x}px`;
          $ballEl.style.top = `${y}px`;
        }
      }

      if (e.key === "ArrowUp") {
        if (y > 0) {
          y = y - desplazamiento;
          $ballEl.style.left = `${x}px`;
          $ballEl.style.top = `${y}px`;
        }
      }

      if (e.key === "ArrowLeft") {
        if (x > 0) {
          x = x - desplazamiento;
          $ballEl.style.left = `${x}px`;
          $ballEl.style.top = `${y}px`;
        }
      }

      if (e.key === "ArrowRight") {
        if (x < widthDif) {
          x = x + desplazamiento;
          $ballEl.style.left = `${x}px`;
          $ballEl.style.top = `${y}px`;
        }
      }
    });
  });
}

function contador(counter) {
  const $divCounter = document.querySelector(counter);

  let next = new Date(2023, 12, 19).getTime(),
    days,
    hours,
    minutes,
    seconds;

  const message = `
    <h3>Happy Day Juan</h3>`;

  const interval = setInterval(() => {
    let today = new Date().getTime(),
      diffSeconds = (next - today) / 1000;

    days = parseInt(diffSeconds / 86400);
    diffSeconds = diffSeconds % 86400;
    hours = parseInt(diffSeconds / 3600);
    diffSeconds = diffSeconds % 3600;
    minutes = parseInt(diffSeconds / 60);
    seconds = parseInt(diffSeconds % 60);
    // (days = 0), (hours = 0), (minutes = 0), (seconds = 0);

    if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
      $divCounter.innerHTML = message;
      clearInterval(interval);
    } else {
      $divCounter.innerHTML = `${days} Días, ${hours} Horas, ${minutes} Minutos , ${seconds} Segundos`;
    }
  }, 1000);
}

function scrollTop(btnScroll) {
  const $btnScroll = document.querySelector(btnScroll);

  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 800) {
      $btnScroll.classList.add("visible");
    }

    if (window.scrollY < 800) {
      $btnScroll.classList.remove("visible");
    }
  });

  $btnScroll.addEventListener("click", (e) => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });
}

function isDarkMode(btnDark, btnIcon) {
  const $btnDark = document.querySelector(btnDark),
    $btnIcon = document.querySelector(btnIcon);

  const darkMode = () => {
    document.body.classList.add("is-dark-mode");
    $btnIcon.classList.remove("fa-moon");
    $btnIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  };

  const lightMode = () => {
    document.body.classList.remove("is-dark-mode");
    $btnIcon.classList.remove("fa-sun");
    $btnIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  };

  $btnDark.addEventListener("click", (e) => {
    if ($btnIcon.classList.contains("fa-moon")) {
      darkMode();
    } else {
      lightMode();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === null)
      localStorage.setItem("theme", "light");

    if (localStorage.getItem("theme" === "light")) lightMode();

    if (localStorage.getItem("theme") === "dark") darkMode();
  });
}
function responsiveTester(form, btnSubmit, btnClose) {
  const $form = document.querySelector(form),
    $btnSubmit = document.getElementById(btnSubmit),
    $btnClose = document.getElementById(btnClose);

  let openedWindow;
  const patronUrl =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  document.addEventListener("submit", (e) => {
    let url = `${$form.url.value}`,
      winWidth = $form.ancho.value,
      winHeight = $form.alto.value;

    if (e.target === $form) {
      e.preventDefault();

      if (url === "") return swal("Ups!", "Debes Ingresar un Url", "warning");

      if (typeof url !== "string")
        return swal("Ups!", "El url debe ser una cadena de texto", "warning");

      if (winWidth === "" || winHeight === "")
        return swal(
          "Ups!",
          "Debes Ingresar valores para Alto y Ancho de la ventana",
          "warning"
        );

      if (patronUrl.test(url)) {
        openedWindow = window.open(
          `${url}`,
          "_blank",
          `",width=${winWidth} height=${winHeight} toolbar=no scrollbars=no"`
        );
      } else {
        swal("Ups!", "El url ingresado no es Valido", "error");
      }
    }
  });

  $btnClose.addEventListener("click", (e) => {
    if (e.target.matches($btnClose)) openedWindow.close();
  });
}

function userDeviceInfo(id) {
  const n = navigator,
    ua = n.userAgent;
  const $id = document.getElementById(id);

  //objeto para detectar sistema operativo mobile
  let isMobile = {
      android: () => ua.match(/android/i),
      ios: () => ua.match(/iphone|ipad|ipod/i),
      windows: () => ua.match(/windows phone/i),
      any: function () {
        return this.android() || this.ios() || this.windows();
      },
    },
    //objeto para detectar sistema operativo de escritorio
    isDesktop = {
      linux: () => ua.match(/linux/i),
      mac: () => ua.match(/mas os/i),
      windows: () => ua.match(/windows nt/i),
      any: function () {
        return this.linux() || this.mac() || this.windows();
      },
    },
    //objeto para detectar el navegador web
    isBrowser = {
      chrome: () => ua.match(/chrome/i),
      safari: () => ua.match(/safari/i),
      firefox: () => ua.match(/firefox/i),
      opera: () => ua.match(/opera|opera mini/i),
      ie: () => ua.match(/msie|iemobile/i),
      edge: () => ua.match(/edge/),
      any: function () {
        return (
          this.ie() ||
          this.edge() ||
          this.chrome() ||
          this.safari() ||
          this.firefox() ||
          this.opera()
        );
      },
    };
  // console.log(ua);
  // console.log(isMobile.android());
  // console.log(isMobile.ios());

  $id.innerHTML = `
  <ul>
    <li>User Agent: <b>${ua}</b</li>
    <li>Plataforma: <b>${
      isMobile.any() ? isMobile.any() : isDesktop.any()
    }</b></li>
    <li>Navegador: <b>${isBrowser.any()}</b></li>
  </ul>`;

  // **************contenido Exclusivo***********
  if (isBrowser.chrome()) {
    $id.innerHTML += `<p><mark>Logramos detectar que esras usando Chrome</mark></p>`;
  }

  if (isBrowser.firefox()) {
    $id.innerHTML += `<p><mark>Logramos detectar que esras usando Firefox</mark></p>`;
  }

  if (isDesktop.linux()) {
    $id.innerHTML += `<p><mark>Descarga Nuestro software para Linux</mark></p>`;
  }

  if (isDesktop.mac()) {
    $id.innerHTML += `<p><mark>Descarga Nuestro software para Mac OS</mark></p>`;
  }

  if (isDesktop.windows()) {
    $id.innerHTML += `<p><mark>Descarga Nuestro software para Windows</mark></p>`;
  }

  //*************Redirecciones*************
  if (isMobile.android()) {
    window.location.href = "https://github/juan123530.com";
  }
}

function networkStatus(onLine, offLine) {
  const $onLine = document.getElementById(onLine),
    $offLine = document.getElementById(offLine);

  window.addEventListener("online", () => {
    if (navigator.onLine) $onLine.classList.add("visible");

    setTimeout(() => {
      $onLine.classList.remove("visible");
    }, 5000);
  });

  window.addEventListener("offline", (e) => {
    if (!navigator.onLine) $offLine.classList.add("visible");

    setTimeout(() => {
      $offLine.classList.remove("visible");
    }, 5000);
  });
}

function mediaDevices(btn, video) {
  const $btnSnap = document.getElementById(btn),
    $video = document.getElementById(video);

  const constraints = {
    video: {
      width: 1280,
      height: 720,
    },
  };

  document.addEventListener("click", (e) => {
    if (e.target === $btnSnap) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          $video.srcObject = stream;
          $video.style.display = "block";
          $video.style.margin = "auto";
        })
        .catch((err) => {
          swal("Ups!", `No se ha Podido iniciar el video! ${err}`, "error");
        });
    }
  });
}

function myGeolocation() {
  const $pLocation = document.getElementById("location");

  const location = (position) => {
    console.log(position);
    let latitude = position.coords.latitude,
      longitude = position.coords.longitude,
      accuracy = position.coords.accuracy;

    const $locationLink = document.createElement("a");
    $locationLink.innerHTML = "Ver en Google Maps";
    $locationLink.target = "_blank";
    $locationLink.rel = "noopener";
    $locationLink.href = `https://www.google.com/maps/@${latitude},${longitude},20z?hl=es`;

    $pLocation.innerHTML = `
      <strong>Latitud:</strong> ${latitude} <br>
      <strong>Longitug: </strong> ${longitude} <br>
      <strong>Exactitud:</strong> ${accuracy} metros <br><br>
      `;

    $pLocation.insertAdjacentElement("beforeend", $locationLink);
  };

  const error = (err) => {
    swal(
      "No se Puede acceder a su ubicación",
      `Error: ${err.code}; ${err.message}`,
      "error"
    );
  };

  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximunAge: 0,
    };
    navigator.geolocation.getCurrentPosition(location, error, options);
  }
}

function searchFilter(input, btn, cards) {
  const $input = document.getElementById(input),
    $btnReset = document.getElementById(btn);
  const $cards = document.querySelectorAll(cards);

  document.addEventListener("keyup", (e) => {
    if (e.target === $input) {
      $cards.forEach((el) => {
        el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
          ? el.classList.remove("filter")
          : el.classList.add("filter");
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target == $btnReset || e.target == $btnReset.firstElementChild) {
      $input.value = "";

      for (const el of $cards) {
        el.classList.remove("filter");
      }
    }
  });
}

function digitalGiveaway(btn, listado) {
  const $pListado = document.getElementById(listado),
    $spiner = document.querySelector(".fa-spinner");
  console.log($pListado);

  const teams = [
    "Andres zuares",
    "Cristina Pabon",
    "Jonathan Gonzalez",
    "Sara Rios",
    "Diego Fernandez",
    "Brayan Gonzalez",
    "Ana sanchez",
    "Francisco Gonzalez",
    "Felipe williams",
    "Tahoma de ermes",
    "Fabian Telles",
    "Martha Pineda",
    "Juan Pineda",
  ];

  teams.forEach((team) => {
    const li = document.createElement("li");
    li.innerHTML = `${team}`;
    $pListado.appendChild(li);
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      $pListado.style.visibility = "hidden";
      $spiner.style.display = "inline-block";

      setTimeout(() => {
        const win = Math.floor(Math.random() * teams.length);
        swal(`${teams[win]} Campeón`, `El Ganador Es ${teams[win]}`, "success");
        $spiner.style.display = "none";
        $pListado.style.visibility = "visible";
      }, 2000);
    }
  });
}

function scrollSpy() {
  const $sections = document.querySelectorAll(".section[data-scroll-spy]");

  const cb = (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (entry.isIntersecting) {
        document
          .querySelector(`a[data-scroll-spy][href="#${id}"]`)
          .classList.add("active");
      } else {
        document
          .querySelector(`a[data-scroll-spy][href="#${id}"]`)
          .classList.remove("active");
      }
    });
  };

  const observer = new IntersectionObserver(cb, {
    threshold: 0.6,
  });

  $sections.forEach((el) => {
    observer.observe(el);
  });
}

function videoInteligent(video) {
  const $video = document.querySelector(video);

  const handleVisibilityChange = (e) => {
    if (document.hidden) {
      // $video.muted = true;
      $video.pause();
    } else {
      // $video.muted = false;
      $video.play();
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  const cb = (entries) => {
    if (entries[0].isIntersecting) {
      $video.play();
    } else {
      $video.pause();
    }
  };

  const observer = new IntersectionObserver(cb, {
    threshold: 0.75,
  });

  observer.observe($video);
}
 
document.addEventListener("DOMContentLoaded", (e) => {
  hamburger();
  relojAlarma(
    "#iniciar-reloj",
    "#stop-reloj",
    "#iniciar-alarma",
    "#stop-alarma"
  );
  reloj();
  mover("#camp", "#ball");
  alertas();
  contador(".counter");
  scrollTop(".scroll");
  isDarkMode("#btn-dark", "#btn-moon");
  responsiveTester("#form-tester", "btn-submit", "btn-close");
  userDeviceInfo("user-device");
  networkStatus("on-line", "off-line");
  mediaDevices("snap", "cam-video");
  myGeolocation();
  searchFilter("input-busqueda", "reset", ".card");
  digitalGiveaway("#sorteo", "listado");
  scrollSpy();
  videoInteligent("#video-intersection");
});
