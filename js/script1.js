//Refactoring function to display modal
function handleDisplayModal(element) {
  $(".modal-content").fadeIn("slow");
  $(element).slideDown();
  // $(element).css("display", "flex"); //display : flex //!!!
  $("body").css("overflow", "hidden");
}
//Refactoring function to close modal
function handleCloseModal(element) {
  $(".modal-content").fadeOut();
  $(element).fadeOut();
  $("body").css("overflow", "visible");
}

$("#container1").mousemove(function () {
  animateContainer(container1, inner1);
});
$("#container2").mousemove(function () {
  animateContainer(container2, inner2);
});

function animateContainer(container, inner) {
  // ===========================================================
  // See tutorial at :
  // https://css-tricks.com/animate-a-container-on-mouse-over-using-perspective-and-transform/
  // ===========================================================

  // console.log("container : " + container);
  // console.log("inner : " + inner);

  var onMouseEnterHandler = function (event) {
    update(event);
  };
  var onMouseLeaveHandler = function () {
    inner.style = "";
  };
  var onMouseMoveHandler = function (event) {
    if (isTimeToUpdate()) {
      update(event);
    }
  };

  container.onmouseenter = onMouseEnterHandler;
  container.onmouseleave = onMouseLeaveHandler;
  container.onmousemove = onMouseMoveHandler;

  var counter = 0;
  var updateRate = 10;
  var isTimeToUpdate = function () {
    return counter++ % updateRate === 0;
  };

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

  var update = function (event) {
    mouse.updatePosition(event);
    updateTransformStyle(
      (mouse.y / inner.offsetHeight / 2).toFixed(2),
      (mouse.x / inner.offsetWidth / 2).toFixed(2)
    );
  };

  var updateTransformStyle = function (x, y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTransform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
  };
}

$(document).ready(function () {
  $(".envelope").css("display", "none");
  // $(".envelope").fadeOut(); //!!
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

  // $(".contact").click(function (event) {
  //   event.stopPropagation();
  //   console.log("POP");
  // });

  // $(document).click(function (e) {
  //   const container = $(".contact");
  //   // if the target of the click isn't the container nor a descendant of the container
  //   if (!container.is(e.target) && container.has(e.target).length === 0) {
  //     container.hide();
  //     console.log("POP");
  //   }
  // });

  $(document).click(function (e) {
    if ($(e.target).closest(".contact").length === 0) {
      if ($(".envelope").is(":hidden")) {
        // console.log("POPO" + $.now());
        $(".envelope").fadeIn();
        $(".contact").fadeOut();
      }
    }
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
  $(".gallerie_grid").masonry();

  $('[data-fancybox="gallery"]').fancybox({
    buttons: ["close"],
    loop: true,
  });

  //HIDE TO PREPARE UI ANIMATION
  $(".portrait_row *").hide();
  // $("#gallerie img").hide();
  $("#contact p, #contact_square_top").hide();

  //HANDLE HEDGEHOG TO CROSS THE STREET
  hedgehogMove2();
});

function hedgehogMove2() {
  const hedgehog = document.getElementById("hedgehog");
  let posX = $(window).width() - 1;
  let posY = $(window).height() / 2;
  let offsetY = $(window).height() / 2; //valeur initiale mais qui change a chaque passage
  setInterval(frame, 4);
  function frame() {
    if (posX >= $(document).width()) {
      // clearInterval(id);
      posX =
        0 -
        hedgehog.width -
        Math.floor(Math.random() * 0.5 * $(window).width()); //2500
      offsetY = Math.floor(
        Math.random() *
          ($(window).height() * 0.2 - $(window).height() * 0.0 + 1) +
          $(window).height() * 0.0
      );
      // console.log("offsetY : " + offsetY);
    } else {
      posX++;
      posY = Math.sin(posX / 500) * 120 + offsetY + $(window).height() * 0.6;
      hedgehog.style.left = posX + "px";
      hedgehog.style.top = posY + "px";
    }
  }
}
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

  //CREATE MY OWN PARALLAX EFFECT ON card_cp
  let portraitLimitMax = $(".card_cp").offset().top + $(".card_cp").height();
  let portraitLimitMin = $("#portrait").offset().top - $("#portrait").height();
  let portraitParallaxEffect = y - $(".card_cp").offset().top;

  if (y > portraitLimitMin && y < portraitLimitMax) {
    $(".card_cp, .card_js").css("position", "relative");
    $(".card_cp").css("bottom", portraitParallaxEffect / 4 + "px");
    $(".card_js").css("bottom", portraitParallaxEffect / 8 + "px");
  }

  //SNAP SCROLL TO TOUR AFTER MID SCROLL GALLERIE
  let testAA = $("#gallerie").offset().top;
  // console.log("testAA : " + testAA);
  // console.log("y : " + y);
  if (y > testAA * 1.05) {
    // console.log("bingbingbing");
    // $("html").animate(
    //   {
    //     scrollTop: $("#tour").offset().top,
    //   },
    //   1000
    // );
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
      // zIndex: "0",
    });
  } else {
    $(".gallerie_grid").css({
      position: "sticky",
      top: gallerieOffsetTop + "px",
      // zIndex: "1",
    });
  }

  // console.log("y : " + y);
  // let documentHeight = $(document).height();
  // console.log("documentHeight : " + documentHeight);
  let windowHeight = $(window).height();
  // console.log("windowHeight : " + windowHeight);

  ///HANDLE LEAF ANIMATION
  let triggerLeafAnimation = $(document).height() - $(window).height();
  let triggerLeafAnimationCanceled =
    $(document).height() - $(window).height() * 1.5;
  if (y >= triggerLeafAnimation - 100) {
    // console.log("TOP1234");
    $("#tour img:nth-child(5)").addClass("animateLeafPosition85");
    $("#tour img:nth-child(6)").addClass("animateLeafPosition86");
    $("#tour img:nth-child(7)").addClass("animateLeafPosition82");
    $("#tour img:nth-child(8)").addClass("animateLeafPosition81");
    $("#tour img:nth-child(9)").addClass("animateLeafPosition85");
    $("#tour img:nth-child(10)").addClass("animateLeafPosition84");
    $("#tour img:nth-child(11)").addClass("animateLeafPosition85");
    $("#tour img:nth-child(12)").addClass("animateLeafPosition83");
  }
  if (y <= triggerLeafAnimationCanceled) {
    // console.log("TOP00000000");
    $("#tour img:nth-child(5)").removeClass("animateLeafPosition85");
    $("#tour img:nth-child(6)").removeClass("animateLeafPosition86");
    $("#tour img:nth-child(7)").removeClass("animateLeafPosition82");
    $("#tour img:nth-child(8)").removeClass("animateLeafPosition81");
    $("#tour img:nth-child(9)").removeClass("animateLeafPosition85");
    $("#tour img:nth-child(10)").removeClass("animateLeafPosition84");
    $("#tour img:nth-child(11)").removeClass("animateLeafPosition85");
    $("#tour img:nth-child(12)").removeClass("animateLeafPosition83");
  }
});
