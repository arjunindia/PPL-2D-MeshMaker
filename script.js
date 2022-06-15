var stage = new Konva.Stage({
  container: "container", // id of container <div>
  width: 500,
  height: 500,
});
let a = [];
let n = 0;
var str = `meshes = {
  {
    vertexes = {},
    segments = {{}}
  }
}`;
let vs = ``;
let ns = ``;
function setStr() {
  str = `meshes = {
    {
      vertexes = {${vs}},
      segments = {{${ns}}}
    }
  }`;
}
// then create layer
var layer = new Konva.Layer();

// create our shape
var bg = new Konva.Rect({
  x: 0,
  y: 0,
  width: stage.getWidth(),
  height: stage.getHeight(),
  fill: "black",
});
var point = new Konva.Circle({
  x: 0,
  y: 500,
  radius: 5,
  fill: "red",
  stroke: "black",
  strokeWidth: 4,
});
var redLine = new Konva.Line({
  points: a,
  stroke: "white",
  strokeWidth: 4,
  lineCap: "round",
  lineJoin: "round",
});

// function writeMessage(message) {
//   console.log(message);
// }
stage.on("pointermove", function () {
  var pointerPos = stage.getPointerPosition();
  let x = pointerPos.x;
  let y = pointerPos.y;
  point.x(x);
  point.y(y);
});
stage.on("pointerdown", function () {
  var pointerPos = stage.getPointerPosition();
  let x = pointerPos.x;
  let y = pointerPos.y;
  a = [...a, x, y];
  redLine.points(a);
  ns += `${n},`;
  n++;
  vs += `{${x},${500 - y}},`;
  setStr();
  // writeMessage(str);
});
// add the shape to the layer
layer.add(bg);
layer.add(point);
layer.add(redLine);

// add the layer to the stage
stage.add(layer);
MicroModal.init();

// draw the image
layer.draw();
document.querySelector("#copy").addEventListener("click", function () {
  const type = "text/plain";
  const blob = new Blob([str], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  navigator.clipboard.write(data).then(
    function () {
      /* success */
      document.querySelector("#copy").textContent = "Copied";
    },
    function () {
      /* failure */
      document.querySelector("#copy").textContent = "Failed";
    }
  );
});
document.querySelector("#modal_btn").addEventListener("click", function () {
  document.querySelector("#copy").textContent = "Copy";
  MicroModal.show("modal-1");
  exportJson();
});
function exportJson() {
  document.querySelector("#mod").textContent = str;
}
