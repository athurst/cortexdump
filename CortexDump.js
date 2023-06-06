// ==UserScript==
// @name        Save Cortex Dump
// @description Save Cortex JSON easily
// @version     1.0
// @author      athurst@amazon.com
// @license     Unlicense
// @match        https://*logistics.amazon.com/operations/execution/api/*
// @grant       GM_xmlhttpRequest
// @noframes
// ==/UserScript==

"use strict";

const { addFloatButton, fetchex } = {
  addFloatButton(text, onclick) /* 20220509-1936 */ {
    if (!document.addFloatButton) {
      const host = document.body.appendChild(document.createElement("div"));
      const root = host.attachShadow({ mode: "open" });
     //root.innerHTML = `<style>:host{position:fixed;top:50px;left:5%;z-index:2147483647;height:0}#i{display:none}*{float:left;padding:0 2em;margin:5px;font-size:13px;line-height:3em;color:#fff;user-select:none;background:#e69138;border:1px solid #fffa;border-radius:8px;transition:.3s}[for]~:active{filter:brightness(1.1);transition:0s}:checked~*{opacity:.3;transform:translateY(-3em)}:checked+*{transform:translateY(3em)}</style><input id=i type=checkbox><label for=i>&zwj;</label>`;

     root.innerHTML = `
<style>
  :host {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2147483647;
    height: 0;
  }
  #i {
    display: none;
  }
  * {
    float: left;
    padding: 0 2em;
    margin: 5px;
    font-size: 13px;
    line-height: 3em;
    color: #fff;
    user-select: none;
    background: #ffffff;
    border: 1px solid #fffa;
    border-radius: 8px;
    transition: .3s;
  }
  [for]~:active {
    filter: brightness(1.1);
    transition: 0s;
  }
  :checked~* {
    opacity: .2;
    transform: translateY(-3em);
  }
  :checked+* {
    transform: translateY(3em);
  }
  #i {
    background: #ffffff;
  }
  label {
    background: #6fa8dc;
  }
  body {
  backdrop-filter: blur(50px) !important;
}
</style>
<input id="i" type="checkbox">
<label for="i">&zwj;</label>
`;

      document.addFloatButton = (text, onclick) => {
        const el = document.createElement("label");
        el.textContent = text;
        el.addEventListener("click", onclick);
        return root.appendChild(el);
      };
    }
    return document.addFloatButton(text, onclick);
  },
  fetchex(url, type) /* 20220509-1838 */ {
    // @grant       GM_xmlhttpRequest
    if (self.GM_xmlhttpRequest)
      return new Promise((resolve, onerror) => {
        const onload = (e) => resolve(e.response);
        GM_xmlhttpRequest({ url, responseType: type, onload, onerror });
      });
    else return fetch(url).then((v) => v[type]());
  },
};

// TODO: Content Security Policy. Example: https://github.com/kkocdko/kblog

//addFloatButton("Download Cortex Dump", async function () {
//  console.time("save page");
//  this.style.background = "#000000 !!";
//  const interval = setInterval((o) => {
//    const suffix = ".".padStart((++o.i % 3) + 1, " ").padEnd(3, " ");
//    this.innerHTML = "Downloading " + suffix.replace(/\s/g, "&nbsp;");
//  }, ...[333, { i: 0 }]); // 茴回囘囬

//  const /** @type {Document} */ dom = document.cloneNode(true);

//  const removeList = `script, style, pre, source, title, link[rel=stylesheet], link[rel=alternate], link[rel=search], link[rel*=pre], link[rel*=icon]`;
//  dom.querySelectorAll(removeList).forEach((el) => el.remove());

//  const qsam = (s, f) => [...document.querySelectorAll(s)].map(f);

//  const imgs = dom.querySelectorAll("img");
//  const imgTasks = qsam("img", async (el, i) => {
//    const reader = new FileReader();
//    reader.readAsDataURL(await fetchex(el.currentSrc, "blob"));
//    await new Promise((r) => (reader.onload = reader.onerror = r));
//    imgs[i].src = reader.result;
//    imgs[i].srcset = "";
//  });

  //const css = []; // Keep order
  //const cssTasks = qsam("style, link[rel=stylesheet]", async (el, i) => {
  //  if (el.tagName === "STYLE") css[i] = el.textContent;
  //  else css[i] = await fetchex(el.href, "text");
 // });

  // await Promise.allSettled([...imgTasks, ...cssTasks]);

  // [TODO:Limitation] `url()` and `image-set()` in css will not be save
  // Avoid the long-loading issue
  // const cssStr = css.join("\n").replace(/(url|image-set)(.+?)/g, "url()");
  // dom.head.appendChild(dom.createElement("style")).textContent = cssStr;

  // [TODO:Limitation] breaked some no-doctype / xhtml / html4 pages
//  const result = document.body.textContent;

//  const link = document.createElement("a"); // Using `dom` will cause failure
//  link.download = "cortex.json"
//  link.href = "data:text," + encodeURIComponent(result);
//  link.click();

//  console.timeEnd("save page");

//  clearInterval(interval);
//  this.textContent = "Download Complete";
//  this.style.background = "#6fa8dc";
// });


  const result = document.body.textContent;

  const link = document.createElement("a"); // Using `dom` will cause failure
  link.download = "cortex.json"
  link.href = "data:text," + encodeURIComponent(result);

   function triggerEvent( link, event ) {
   var clickEvent = new Event( event ); // Create the event.
   link.dispatchEvent( clickEvent ); // Dispatch the event.
   }

  link.click();

  setInterval(function() {

      link.click();
      triggerEvent(link, click);

      console.time("Autosaving Cortex Dump");
      clearInterval(interval);
  this.textContent = "Autosaving Cortex Dump";
  this.style.background = "#6fa8dc";

      }, 5 * 60 * 1000);

var backgroundDiv = document.createElement('div');
backgroundDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';  // Set the background color to black with transparency
backgroundDiv.style.position = 'fixed';  // Set the position to fixed
backgroundDiv.style.top = '0';  // Position from the top at 0
backgroundDiv.style.left = '0';  // Position from the left at 0
backgroundDiv.style.width = '100%';  // Set the width to 100%
backgroundDiv.style.height = '100%';  // Set the height to 100%
//backgroundDiv.style.zIndex = '9998';  // Position the background behind the bannerDiv

// Create a div element for the banner
var bannerDiv = document.createElement('div');
bannerDiv.style.backgroundColor = '#F0F0F0';  // Set the background color
bannerDiv.style.padding = '25px';  // Set the padding
bannerDiv.style.textAlign = 'center';  // Set the text alignment
bannerDiv.style.position = 'fixed';  // Set the position to fixed
bannerDiv.style.top = '50%';  // Position from the top at 50%
bannerDiv.style.left = '50%';  // Position from the left at 50%
bannerDiv.style.transform = 'translate(-50%, -50%)';  // Center the element
bannerDiv.style.color = 'red';


// Create the content for the banner
var bannerText = document.createTextNode('This script will download a fresh Cortex dump every 10 minutes for as long as you leave the webpage open.');  // Replace with your desired banner text
// Create a paragraph element for the additional text
var paragraph = document.createElement('p');
paragraph.style.marginTop = '10px';  // Add margin on top to create a space
paragraph.style.color = 'Blue';
paragraph.textContent = 'Click to Download Manually';  // Replace with your desired text


// Append the content to the banner div
bannerDiv.appendChild(bannerText);
bannerDiv.appendChild(paragraph);

// Add the banner div to the body of the webpage
document.body.appendChild(backgroundDiv);
document.body.appendChild(bannerDiv);

// Add the float button functionality to the banner div
bannerDiv.addEventListener('click', function() {
  console.time('save page');
  // Your existing float button functionality goes here

  const result = document.body.textContent;

  const link = document.createElement("a"); // Using `dom` will cause failure
  link.download = "cortex.json"
  link.href = "data:text," + encodeURIComponent(result);
  link.click();

  console.timeEnd("save page");
});


