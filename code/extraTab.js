const checkbox = document.getElementById('showElement');
const parentDiv = document.getElementById('foreign-stocks');

// Create the child element initially hidden
const childElement = document.createElement('div');
childElement.innerHTML = `<iframe src="https://ssltsw.investing.com?notChosenTab=%2361adff&borderColor=%23005ec9&lang=56&forex=160,1646,1,2,3,49798,2186&commodities=8830,8836,8849,8833,8862,8861,8910&indices=23660,166,172,179,175,178,176&stocks=345,348,349,350,352,355,22402&tabs=3,1,4,2" width="317" height="467"></iframe><div class="poweredBy" style="font-family:arial,helvetica,sans-serif; direction:ltr;"><span style="font-size: 11px;color: #333333;text-decoration: none;">Technical Summary Widget Powered by <a href="https://in.investing.com/" rel="nofollow" target="_blank" style="font-size: 11px;color: #06529D; font-weight: bold;" class="underline_link">Investing.com India</a></span></div>`;

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    parentDiv.appendChild(childElement);
  } else {
    parentDiv.innerHTML = "";
  }
});