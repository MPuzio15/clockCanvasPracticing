const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;

ctx.translate(radius, radius);
radius = radius * 0.9;

setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  let gradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  gradient = ctx.createRadialGradient(0, 0, radius * 0.94, 0, 0, radius * 1.05);
  gradient.addColorStop(0, "#333");
  gradient.addColorStop(0.5, "orange");
  gradient.addColorStop(1, "#333");
  ctx.strokeStyle = gradient;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  let ang;
  let number;
  ctx.font = radius * 0.17 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  for (number = 1; number < 13; number++) {
    ang = (number * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(number.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  let circleLength = 2 * Math.PI * radius;
  console.log("Długość okręgu: ", circleLength);
  console.log("Długość jednego odcinka: ", circleLength / 12);
  console.log("Radian: ", radius);
  let now = new Date();
  console.log(now);
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  console.log(hour, minute, second);
  //hour
  hour = hour % 12;
  let hourInRadians =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(ctx, hourInRadians, radius * 0.5, radius * 0.07);
  //minute 1min = 6 degrees
  let minuteInRadians =
    (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minuteInRadians, radius * 0.8, radius * 0.07);
  // second 1 sek = 6 degrees
  let secondInRadians = (second * Math.PI) / 30;
  drawHand(ctx, secondInRadians, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
