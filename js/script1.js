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
// var myModal_Saturnales = document.getElementById("myModal_Saturnales");
// var myModal_Aperosswing = document.getElementById("myModal_Aperosswing");
// var myModal_Herisson = document.getElementById("myModal_Herisson");
// var myModal_Temps = document.getElementById("myModal_Temps");

// When the user clicks on the button, open the modal
$("#lesSaturnales").click(function () {
  // myModal_Saturnales.style.display = "block";
  // $("#myModal_Saturnales").css("display","block");
  $(".modal-content").fadeIn();
  $("#myModal_Saturnales").slideDown();
  $("body").css("overflow", "hidden");
});
$("#aperosSwing").click(function () {
  $(".modal-content").fadeIn("slow");
  $("#myModal_Aperosswing").slideDown();
  $("body").css("overflow", "hidden");
});
$("#leCrepusculeDuHerisson").click(function () {
  $(".modal-content").fadeIn("slow");
  $("#myModal_Herisson").slideDown();
  $("body").css("overflow", "hidden");
});
$("#tempsQuAffaires").click(function () {
  $(".modal-content").fadeIn("slow");
  $("#myModal_Temps").slideDown();
  $("body").css("overflow", "hidden");
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
    $(".modal-content").fadeOut();
    $("#myModal_Saturnales").fadeOut();
    $("body").css("overflow", "visible");
  }
  if (event.target == myModal_Aperosswing) {
    $(".modal-content").fadeOut();
    $("#myModal_Aperosswing").fadeOut();
    $("body").css("overflow", "visible");
  }
  if (event.target == myModal_Herisson) {
    $(".modal-content").fadeOut();
    $("#myModal_Herisson").fadeOut();
    $("body").css("overflow", "visible");
  }
  if (event.target == myModal_Temps) {
    $(".modal-content").fadeOut();
    $("#myModal_Temps").fadeOut();
    $("body").css("overflow", "visible");
  }
};

$(document).ready(function () {
  $("#envelope").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#contact").offset().top,
      },
      1500,
      "swing"
    );
  });

  $('[data-fancybox="gallery"]').fancybox({
    buttons: ["close"],
    loop: true,
  });

  $(".carousel").slick({
    infinite: true,
    arrows: true,
    // slidesToShow: 3,
    // slidesToScroll: 3,
    infinite: true,
    centerMode: true,
    variableWidth: true,
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
  let topContactDocumentHeight = documentHeight - 1.7 * $(window).height(); //get the position.y of #contact

  if (y > $(window).height() && y < topContactDocumentHeight) {
    $("#envelope").fadeIn();
  } else {
    $("#envelope").fadeOut();
  }

  if (y > topGallerie) {
    $("#gallerie img").show("scale");
  }

  if (y > topContactDocumentHeight) {
    // $('#contact p').show("clip",1000);
    $("#contact p").show("drop", { direction: "up" }, 1000);
    $("#contact_square_top").show("drop", 1000);
    // $('#contact_square_top').fadeIn(1000);
  }

  var topofDiv = $("#spectacle").offset().top; //gets offset of header
  var height = $("#spectacle").outerHeight() / 2; //gets height of header by /1.3
  if ($(window).scrollTop() > topofDiv + height) {
    $(".portrait_img_float1 img").show("slide", { direction: "left" }, 1000);
    $(".portrait_img_float2 img").show("slide", { direction: "right" }, 1000);
    $(".portrait_row *").show("slide", { direction: "up" }, 1000);
    // $(".portrait_name").slideDown();
    // $(".portrait_name").fadeTo("slow", 1, "swing");
    // $(".portrait_description").slideDown();
    // $(".portrait_description").fadeTo("slow", 1, "swing");
  }
});
