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
<!DOCTYPE html><html lang=en><meta name=viewport content="width=device-width, initial-scale=1.0"><meta http-equiv=Content-Type content="text/html; charset=UTF-8"><meta name=viewport content="width=device-width, initial-scale=1.0"><meta name=description content="Browser-based side scrolling video game with the matter.js physics engine."><meta name=author content="Ross Landgreen"><meta property=og:description content="Browser-based side scrolling video game with the matter.js physics engine."><meta property=og:title content=n-gon><meta name=twitter:title content=n-gon><meta name=twitter:description content="Browser-based side scrolling video game with the matter.js physics engine."><title>n-gon</title><link rel=stylesheet href=n-gon.1501fa88.css><link rel="icon shortcut" href=favicon.7d6c048d.ico type=image/x-icon><body>
    <div id=guns></div>
    <div id=field></div>
    <div id=right-HUD-constraint></div>
    <div id=right-HUD></div>
    <div id=text-log></div>
    <div id=fade-out></div>
    <div id=health-bg></div>
    <div id=health></div>
    <div id=defense-bar></div>
    <div id=damage-bar></div>
    <div id=dmg></div>
    <div id=construct></div>
    <canvas id=canvas></canvas>
    <div id=choose-grid></div>
    <div id=experiment-grid></div>
    <div style=position:absolute;top:0;left:0>
        <div id=pause-grid-left class=pause-grid></div>
    </div>
    <div style=position:absolute;top:0;right:0>
        <div id=pause-grid-right class=pause-grid></div>
    </div>
    <svg id=start-button width=82 height=45 fill=#333 stroke=none class="SVG-button SVG-button-splash" font-family="Arial, sans-serif" font-size=30 onclick=simulation.startGame()><text x=10 y=32>start</text></svg>
    <svg id=training-button width=120 height=45 fill=#333 stroke=none class="SVG-button SVG-button-splash" font-family="Arial, sans-serif" font-size=30 onclick="simulation.startGame(false, true)"><text x=10 y=32>training</text></svg>
    <svg id=experiment-button width=170 height=45 class="SVG-button SVG-button-splash"><text x=10 y=32 fill=#333 stroke-width=2 font-family="Arial, sans-serif" font-size=30>experiment</text></svg>


    <div id=info>
        <div>
            <details id=settings-details>
                <summary>settings</summary>
                <div class=details-div style=max-width:24rem;line-height:150%>
                    <input onclick="build.showImages('settings')" type=checkbox id=show-images name=show-images style=width:17px;height:17px>
                    <label for=show-images title="show AI images for fields, guns, and tech">show AI images</label>
                    <br>
                    <input onclick="build.hideHUD('settings')" type=checkbox id=hide-hud name=hide-hud style=width:17px;height:17px>
                    <label for=hide-hud title="hide: tech, damage taken, damage, in game console, new level animation">minimal
                        HUD</label>
                    <br>
                    <label for=fps-select title="use this to slow the game down">limit frames per second:</label>
                    <select name=fps-select id=fps-select>
                        <option value=max selected>no cap</option>
                        <option value=72>72 fps</option>
                        <option value=60>60 fps</option>
                        <option value=45>45 fps</option>
                        <option value=30>30 fps</option>
                    </select>
                    <br>
                    <br>
                    <input type=checkbox id=community-maps name=community-maps style=width:17px;height:17px>
                    <label for=community-maps title="add about 18 player made levels to the random n-gon level pool">community maps</label>
                    <br>
                    <label for=banned title="type banned levels with a space between them.  Example:  run temple biohazard">banned levels:</label>
                    <input id=banned name=banned placeholder="list levels by name" autocomplete=off spellcheck=false style=width:182px>
                    <br>
                    <label for=seed title="the randoms seed determines level order, tech choices, and mob types">randomization
                        seed:</label>
                    <input id=seed name=seed autocomplete=off spellcheck=false minlength=1 style=width:120px>
                    <br><span id=previous-seed style=color:#bbb></span>
                    <br>
                    <svg id=enable-gamepad width=300 height=60 fill=#333 stroke=none class="SVG-button SVG-button-splash" font-family="Arial, sans-serif" onclick="javascript: (async () => { const scriptText = await (await fetch('https://raw.githubusercontent.com/kgurchiek/n-gon-controller/main/main.js')).text(); var script = document.createElement('script'); script.type = 'text/javascript'; script.textContent = scriptText; document.head.appendChild(script); document.getElementById('enable-gamepad').style.stroke = '#0b5';})();"><text x=39 y=19 font-size=22>load gamepad support</text><text x=40 y=38 fill=#aaa font-size=15>community code, external script</text><text x=12 y=55 fill=#aaa font-size=14>https://github.com/kgurchiek/n-gon-controller</text></svg>

                </div>
            </details>
        </div>
        <div>
            <details id=control-details>
                <summary>controls</summary>
                <div class=details-div style=max-width:24rem>
                    To change controls click a box
                    <br>and press an unused key.
                    <br><br>
                    <table id=control-table>
                        <tr>
                            <th>FIRE</th>
                            <td id=key-fire class=key-input>F</td>
                            <td class=key-used>MouseLeft</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>FIELD</th>
                            <td id=key-field class=key-input>SPACE</td>
                            <td class=key-used>MouseRight</td>
                        </tr>
                        <tr>
                            <th>JUMP</th>
                            <td id=key-up class=key-input>W</td>
                            <td class=key-used>ArrowUp</td>
                        </tr>
                        <tr>
                            <th>CROUCH</th>
                            <td id=key-down class=key-input>S</td>
                            <td class=key-used>ArrowDown</td>
                        </tr>
                        <tr>
                            <th>LEFT</th>
                            <td id=key-left class=key-input>A</td>
                            <td class=key-used>ArrowLeft</td>
                        </tr>
                        <tr>
                            <th>RIGHT</th>
                            <td id=key-right class=key-input>D</td>
                            <td class=key-used>ArrowRight</td>
                        </tr>
                        <tr>
                            <th>GUN →</th>
                            <td id=key-next-gun class=key-input>Q</td>
                            <td class=key-used>MouseWheel</td>
                        </tr>
                        <tr>
                            <th>GUN ←</th>
                            <td id=key-previous-gun class=key-input>E</td>
                            <td class=key-used>MouseWheel</td>
                        </tr>
                        <tr style=opacity:.5>
                            <th>GUN #</th>
                            <td id=key-num class=key-input>Num</td>
                        </tr>
                        <tr>
                            <th>PAUSE</th>
                            <td id=key-pause class=key-input>P</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>FULLSCREEN</th>
                            <td id=key-fullscreen class=key-input>O</td>
                            <td></td>
                        </tr>
                        <tr id=control-testing>
                            <th>TESTING</th>
                            <td id=key-testing class=key-input>T</td>
                            <td></td>
                        </tr>
                    </table>
                    <br><button id=control-reset type=button>reset</button><span style=font-size:60%> to default
                        keys</span>
                </div>
            </details>
        </div>
        <div>
            <details id=updates>
                <summary>updates</summary>
                <div id=updates-div class=details-div style=max-width:50rem;height:400px;font-size:70%;overflow:scroll></div>
            </details>
        </div>
        <div>
            <details>
                <summary>about</summary>
                <div class=details-div style=max-width:24rem;padding:.6em;font-size:1.3rem>
                    <a id=github href=https://github.com/landgreen/n-gon aria-label=github>
                        
                        <svg xmlns:xmlns=http://www.w3.org/2000/svg stroke=#333 stroke-width=.4 viewBox="-19 -8 40 16"><defs><linearGradient id=horizontalGradient x1=-8 x2=8 y1=0 y2=0 gradientUnits=userSpaceOnUse><stop offset=0% stop-color=#e0e3e6 /><stop offset=100% stop-color=#fff /></linearGradient></defs><circle r=7 fill=url(#horizontalGradient) /><circle cx=4 r=1.1 fill=none /><path stroke=#1b1f23 d="M5.3 0H7"/></svg>
                    </a>
                    <p>
                        I wrote n-gon in JavaScript, CSS, and HTML using the matter.js 2-D physics library.
                        The code is free and open source on <a id=github href=https://github.com/landgreen/n-gon aria-label=github>Github</a>.
                        This is just my hobby project, but I try to fix bugs when <a id=github href=https://github.com/landgreen/n-gon/issues aria-label=github>reported</a>.
                    </p>

                    <span style=max-width:25rem;line-height:180%>
                        <label for=classic-select title="play older versions of n-gon">classic n-gon:</label>
                        <select name=classic-select id=classic-select onchange="window.location.href=this.value">
                            <option value=https://scratch.mit.edu/projects/14005697/fullscreen/>mech: 2014</option>
                            <option value=https://scratch.mit.edu/projects/22573757/fullscreen/>spacetime: 2015
                            </option>
                            <option value=https://scratch.mit.edu/projects/41429974/fullscreen/>ballistics: 2015
                            </option>
                            <option value=https://scratch.mit.edu/projects/43690666/fullscreen/>portal: 2016</option>
                            <option value=https://codepen.io/lilgreenland/full/ozXNWZ>side scroller: 2016</option>
                            <option value=https://codepen.io/lilgreenland/full/wzARJY>side scroller: 2016</option>
                            <option value=classic/7-1-2017/>LandGame: 2017</option>
                            <option value=classic/4-15-2018/>n-gon: 2018</option>
                            <option value=classic/7-11-2019/>n-gon: summer-2019</option>
                            <option value=classic/9-8-2019/>n-gon: fall-2019</option>
                            <option value=classic/7-15-2020/>n-gon: summer-2020</option>
                            <option value=classic/6-1-2021/>n-gon: spring-2021</option>
                            <option value=classic/11-1-2022/>n-gon: fall-2022</option>
                            <option value=classic/7-29-2024/>n-gon: summer-2024</option>
                            <option value=classic/4-14-2025/>n-gon: spring-2025</option>
                            <option value selected>old versions</option>
                        </select>
                        <br><label for=links-select title="community links">community links:</label>
                        <select name=links-select id=links-select onchange="window.location.href=this.value">
                            <option value=https://scratch.mit.edu/studios/36273655/>n-gon on scratch</option>
                            <option value=https://www.cornbread2100.com/n-gon-loader>n-commit loader</option>
                            <option value=https://3xiondev.github.io/n-gon-upgraded>n-gon upgraded</option>
                            <option value=https://n-gon-enhanced.vercel.app>n-gon enhanced</option>
                            <option value=https://coaldeficit.github.io/c-gon>c-gon</option>
                            <option value=https://kgurchiek.github.io/n-gon-portal-gun>n-gon portal gun</option>
                            <option value=https://github.com/Whyisthisnotavalable/n-scythe>n-scythe</option>
                            <option value=https://github.com/kgurchiek/n-gon-mobile>n-mobile</option>
                            <option value=https://github.com/kgurchiek/n-gon-controller>n-controller</option>
                            <option value=https://github.com/kgurchiek/n-gon-stopwatch>n-stopwatch</option>
                            <option value=https://github.com/Ant-Throw-Pology/n-qol>n-qol</option>
                            <option value=https://github.com/c-rxxp-y/n-gon-treasury>n-treasury</option>
                            <option value=https://github.com/3xionDev/n-docs>n-docs</option>
                            <option value=https://old.reddit.com/r/n_gon/>n-reddit</option>
                            <option value="https://www.youtube.com/results?search_query=n-gon">n-tube</option>
                            <option value=https://n-gon.wiki/>n-wiki</option>
                            <option value=https://ngon.fandom.com/wiki/N-gon>n-cyclopedia</option>
                            <option value selected>mods, forks, info</option>
                        </select>
                    </span>
                </div>
            </details>
        </div>
    </div>

    <svg id=splash class="intro ui" onclick=simulation.startGame() viewBox="0 0 800 800"><g fill=#afafaf class=fade-in transform="matrix(34 0 0 34 100 210)"><path d="M0 0h1v.2h1.7l.3.3v2.6H2V1.4H1v1.7H0Z"/><rect width=1 height=.5 x=4 y=1.25 rx=.03 /><path d="M6.9 0h1.25l.875.875V3.75l-.25.25h-2.25v-.625h1.75V3H6.9l-.875-.875V.875ZM10.9 0h1.25l.875.875v1.25L12.15 3H10.9l-.875-.875V.875ZM14 0h1v.2h1.7l.3.3v2.6h-1V1.4h-1v1.7h-1Z"/></g><g fill=none stroke=#333 stroke-linecap=round stroke-linejoin=round transform="matrix(34 0 0 34 100 210)"><path stroke-width=.087 d="M0 0h1v.2h1.7l.3.3v2.6H2V1.4H1v1.7H0Z" class=draw-lines /><rect width=1 height=.5 x=4 y=1.25 stroke-width=.087 class=draw-lines-dash rx=.03 /><path stroke-width=.0875 d="M6.9 0h1.25l.875.875V3.75l-.25.25h-2.25v-.625h1.75V3H6.9l-.875-.875V.875Z" class=draw-lines-g /><path stroke-width=.0875 d="M10.9 0h1.25l.875.875v1.25L12.15 3H10.9l-.875-.875V.875Z" class=draw-lines-o /><path stroke-width=.087 d="M14 0h1v.2h1.7l.3.3v2.6h-1V1.4h-1v1.7h-1Z" class=draw-lines /></g><g fill=none stroke=#333 stroke-linecap=round stroke-linejoin=round stroke-width=10 class=draw-lines3 transform="matrix(.28 0 0 .28 320 430)"><path fill=#fff stroke=none d="M827 112h30a140 140 0 0 1 140 140v268a140 140 0 0 1-140 140h-60a140 140 0 0 1-140-140V252a140 140 0 0 1 140-140h60" class=fade-in /><path fill=#00c8ff stroke=none d="M832.41 106.64V322H651.57v-67c0-82 67.5-148 150-148Z" class=fade-in /><path d="M827 112h30a140 140 0 0 1 140 140v268a140 140 0 0 1-140 140h-60a140 140 0 0 1-140-140V252a140 140 0 0 1 140-140h60"/><path d="M657 317h340-170v-25m0-140v-42s21-59-5-59-15-44-15-44"/><ellipse cx=827.57 cy=218.64 rx=29 ry=68 /><ellipse cx=827.57 cy=218.64 fill=#fff class=fade-in-fast rx=29 ry=68 /></g>
            
            <g fill=#fff class=fade-in><path d="M161 528h48v-48h-48Z" class=draw-lines-box-2 /><path d="M105 528h48v-48h-48Z" class=draw-lines-box-1 /><path d="M217 528h48v-48h-48Z" class=draw-lines-box-3 /><path d="M297 528h48v-48h-48Z" class=draw-lines-box-2 /><path d="M353 528h48v-48h-48ZM105 536h48v48h-48Z" class=draw-lines-box-1 /><path d="M161 536h48v48h-48Z" class=draw-lines-box-2 /><path d="M217 536h48v48h-48Z" class=draw-lines-box-3 /></g>
            <g fill=none stroke=#333 stroke-linecap=round stroke-linejoin=round stroke-width=2.5><path stroke-width=2 d="M161 528h48v-48h-48Z" class=draw-lines-box-2 /><g stroke=#777 stroke-width=1.5><path stroke-width=1.2 d="M105 528h48v-48h-48Z" class=draw-lines-box-1 /><path stroke-width=1.2 d="M217 528h48v-48h-48Z" class=draw-lines-box-3 /><path stroke-width=1.2 d="M297 528h48v-48h-48Z" class=draw-lines-box-2 /><path stroke-width=1.2 d="M353 528h48v-48h-48Z" class=draw-lines-box-1 /></g><path stroke-width=2 d="M105 536h48v48h-48Z" class=draw-lines-box-1 /><path stroke-width=2 d="M161 536h48v48h-48Z" class=draw-lines-box-2 /><path stroke-width=2 d="M217 536h48v48h-48Z" class=draw-lines-box-3 /></g>
            <g fill=none stroke=#000 stroke-width=2 class=draw-lines4 font-family="Arial Black, sans-serif" font-size=38 text-anchor=middle transform="matrix(.8 0 0 .8 105 480)"><text id=splash-up x=100 y=45>W</text><text id=splash-left x=30 y=113>A</text><text id=splash-down x=100 y=113>S</text><text id=splash-right x=170 y=113>D</text><g stroke=#666 stroke-width=1.5><text id=splash-previous-gun x=30 y=45>Q</text><text id=splash-next-gun x=170 y=45>E</text><text id=splash-fullscreen x=270 y=45>O</text><text id=splash-pause x=340 y=45>P</text></g></g>
        <g fill=none stroke=#aaa class=fade-in><g stroke=#ccc><path d="M164 433.5h-35.5v40M205 433.5h36.5v40M321 533v50M374 533v20"/></g><path d="M184 625v-35M460.5 442v50h38M642.5 442v50h-38"/></g><g fill=#999 class=fade-in font-size=16><g fill=#bbb font-size=14><text x=169.5 y=438>guns</text><text x=292 y=596>fullscreen</text><text x=304 y=613 font-size=12>(beta)</text><text x=356 y=566>pause</text></g><text x=165 y=638>move</text><text x=450 y=438>fire</text><text x=629 y=438>field</text></g></svg>
    <script src=n-gon.09e02609.js></script>
    
    <script src=n-gon.f6776921.js></script>
    <script src=n-gon.e5dfd9d5.js></script>
    <script src=n-gon.bd0194b9.js></script>
    <script src=n-gon.dde9f576.js></script>
    <script src=n-gon.f14647ed.js></script>
    <script src=n-gon.88663b12.js></script>
    <script src=n-gon.0f4171a5.js></script>
    <script src=n-gon.207c447f.js></script>
    <script src=n-gon.034ff7ea.js></script>
    <script src=n-gon.f1bea666.js></script>
    <script src=n-gon.ef52eb98.js></script>



</body>
</html>
  `);
  win.document.close();
}
