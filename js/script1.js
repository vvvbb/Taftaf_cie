//Refactoring function to display modal
function handleDisplayModal(element) {
  $(".modal-content").fadeIn("slow");
  $(element).slideDown();
  $("body").css("overflow", "hidden");
}
//Refactoring function to close modal
function handleCloseModal(element) {
  $(".modal-content").fadeOut();
  $(element).fadeOut();
  $("body").css("overflow", "visible");
}

$(document).ready(function () {
  // ===========================================================
  // See tutorial at :
  // https://css-tricks.com/animate-a-container-on-mouse-over-using-perspective-and-transform/
  // ===========================================================

  (function () {
    // Init
    var container = document.getElementById("accueil"),
      inner1 = document.getElementById("PerspectiveandTransform1"),
      inner2 = document.getElementById("PerspectiveandTransform2"),
      inner3 = document.getElementById("Transform1"),
      inner4 = document.getElementById("Transform2");

    // Mouse
    var mouse = {
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      updatePosition: function (event) {
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
      },
      setOrigin: function (e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
      },
      show: function () {
        return "(" + this.x + ", " + this.y + ")";
      },
    };

    // Track the mouse position relative to the center of the container.
    mouse.setOrigin(container);

    //----------------------------------------------------

    var counter = 0;
    var refreshRate = 10;
    var isTimeToUpdate = function () {
      return counter++ % refreshRate === 0;
    };

    //----------------------------------------------------

    var onMouseEnterHandler = function (event) {
      update(event);
    };

    var onMouseLeaveHandler = function () {
      inner1.style = "";
      inner2.style = "";
      inner3.style = "";
      inner4.style = "";
    };

    var onMouseMoveHandler = function (event) {
      if (isTimeToUpdate()) {
        update(event);
      }
    };

    //----------------------------------------------------

    var update = function (event) {
      mouse.updatePosition(event);
      updateTransformStyle(
        (mouse.y / inner1.offsetHeight / 2).toFixed(2),
        (mouse.x / inner1.offsetWidth / 2).toFixed(2),
        (mouse.y / inner2.offsetHeight / 2).toFixed(2),
        (mouse.x / inner2.offsetWidth / 2).toFixed(2),
        (mouse.y / inner3.offsetHeight / 2).toFixed(2),
        (mouse.x / inner3.offsetWidth / 2).toFixed(2),
        (mouse.y / inner4.offsetHeight / 2).toFixed(2),
        (mouse.x / inner4.offsetWidth / 2).toFixed(2)
      );
    };

    var updateTransformStyle = function (x, y) {
      var style1 = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
      var style2 = "translateX(" + x * 8 + "px) translateY(" + y * 8 + "px)";
      var style3 = "translateX(" + x * 2 + "px) translateY(" + y * 2 + "px)";

      inner1.style.transform = style1;
      inner1.style.webkitTransform = style1;
      inner1.style.mozTranform = style1;
      inner1.style.msTransform = style1;
      inner1.style.oTransform = style1;

      inner2.style.transform = style1;
      inner2.style.webkitTransform = style1;
      inner2.style.mozTranform = style1;
      inner2.style.msTransform = style1;
      inner2.style.oTransform = style1;

      inner3.style.transform = style2;
      inner3.style.webkitTransform = style2;
      inner3.style.mozTranform = style2;
      inner3.style.msTransform = style2;
      inner3.style.oTransform = style2;

      inner4.style.transform = style3;
      inner4.style.webkitTransform = style3;
      inner4.style.mozTranform = style3;
      inner4.style.msTransform = style3;
      inner4.style.oTransform = style3;
    };

    //--------------------------------------------------------

    container.onmousemove = onMouseMoveHandler;
    container.onmouseleave = onMouseLeaveHandler;
    container.onmouseenter = onMouseEnterHandler;
  })();

  // Get the modal
  // When the user clicks on the button, open the modal
  $("#lesSaturnales").click(function () {
    handleDisplayModal(myModal_Saturnales);
  });
  $("#aperosSwing").click(function () {
    handleDisplayModal(myModal_Aperosswing);
  });
  $("#leCrepusculeDuHerisson").click(function () {
    handleDisplayModal(myModal_Herisson);
  });
  $("#tempsQuAffaires").click(function () {
    handleDisplayModal(myModal_Temps);
  });

  // When the user clicks on <span> (x), close the modal
  $(".close").click(function () {
    $(".modal-content").fadeOut();
    $("#myModal_Saturnales").fadeOut();
    $("#myModal_Aperosswing").fadeOut();
    $("#myModal_Herisson").fadeOut();
    $("#myModal_Temps").fadeOut();
    $("body").css("overflow", "visible");
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == myModal_Saturnales) {
      handleCloseModal(myModal_Saturnales);
    }
    if (event.target == myModal_Aperosswing) {
      handleCloseModal(myModal_Aperosswing);
    }
    if (event.target == myModal_Herisson) {
      handleCloseModal(myModal_Herisson);
    }
    if (event.target == myModal_Temps) {
      handleCloseModal(myModal_Temps);
    }
  };

  //////ENVELOPE AND CONTACT
  $(".envelope").click(function () {
    $(".contact").fadeIn();
    $(this).fadeOut();
  });
  $(".deleteContactClose").click(function () {
    $(".envelope").fadeIn();
    $(".contact").fadeOut();
  });

  //////CAROUSEL INSIDE MODAL APERO SWING
  $(".carousel").slick({
    infinite: true,
    arrows: true,
    // slidesToShow: 3,
    // slidesToScroll: 3,
    infinite: true,
    centerMode: true,
    variableWidth: true,
  });

  $(".gallerie_grid").masonry({
    percentPosition: true,
    itemSelector: ".gallerie_grid img",
    columnWidth: ".gallerie_grid img",
    // fitWidth: true,
    // columnWidth: 20px,
    // stamp: ".stamp",
    // fitWidth: true,
    originTop: false,
    // containerStyle: null,
    horizontalOrder: false,
  });

  $('[data-fancybox="gallery"]').fancybox({
    buttons: ["close"],
    loop: true,
  });

  //hide to prepare ui animation
  $(".portrait_row *").hide();
  $("#gallerie img").hide();
  $("#contact p, #contact_square_top").hide();
});

$(document).scroll(function () {
  let y = $(this).scrollTop();
  let documentHeight = $(document).height();
  let topGallerie =
    ($("#gallerie").offset().top - $("#gallerie").height()) * 1.3; //get the position.y of #gallerie

  //////HIDE ENVELOPE ON SPLASHSCREEN
  if (y === 0) {
    $(".envelope").fadeOut();
  } else {
    $(".envelope").fadeIn();
  }

  //////DISPLAY GALLERIE ON BOTTOM
  if (y > topGallerie) {
    // $("#gallerie img").show("scale");
    $("#gallerie img").each(function (i) {
      $(this)
        .delay(i * 100)
        .show("scale");
    });
  }

  //////DISPLAY IMG AND NAME AND DESCRIPTION WHEN SCROLL.y OVER PORTRAIT
  var topofDiv = $("#spectacle").offset().top; //gets offset of header
  var height = $("#spectacle").outerHeight() / 2; //gets height of header by /1.3
  if ($(window).scrollTop() > topofDiv + height) {
    $(".portrait_img_float1 img").show("slide", { direction: "left" }, 1000);
    $(".portrait_img_float2 img").show("slide", { direction: "right" }, 1000);
    $(".portrait_row *").show("slide", { direction: "up" }, 1000);
  }

  //HANDLE TOUR DIV OVER GALLERIE GRID
  let gallerieOffsetBottom =
    $("#gallerie").offset().top +
    $(".gallerie_grid").height() -
    $(window).height();
  let gallerieOffsetTop = $(window).height() - $(".gallerie_grid").height();
  let triggerHandlePosition = gallerieOffsetBottom - y;

  if (triggerHandlePosition > 0) {
    $(".gallerie_grid").css({
      position: "relative",
      top: "0px",
      zIndex: "0",
    });
  } else {
    $(".gallerie_grid").css({
      position: "sticky",
      top: gallerieOffsetTop + "px",
      zIndex: "-1",
    });
  }
});
