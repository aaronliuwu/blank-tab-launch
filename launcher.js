function openGame() {
  const win = window.open("about:blank", "_blank");
  if (!win) {
    alert("Popups blocked. Allow popups and try again.");
    return;
  }

  win.document.open();
  win.document.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Game</title>
<style>
html,body{
  margin:0;
  width:100%;
  height:100%;
  overflow:hidden;
  background:black;
}
</style>
</head>
<body>

<!-- 🔽 PASTE YOUR FULL GAME HTML HERE 🔽 -->

</body>
</html>
  `);
  win.document.close();
}
