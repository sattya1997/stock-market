const foreignCheckbox = document.getElementById('showElement');
const parentDiv = document.getElementById('foreign-stocks');
const calendarCheckbox = document.getElementById('showElement');

// Create the child element initially hidden
const childElement = document.createElement('div');

foreignCheckbox.addEventListener('change', () => {
  if (foreignCheckbox.checked) {
    childElement.innerHTML = `<iframe src="https://ssltsw.investing.com?notChosenTab=%2361adff&borderColor=%23005ec9&lang=56&forex=160,1646,1,2,3,49798,2186&commodities=8830,8836,8849,8833,8862,8861,8910&indices=23660,166,172,179,175,178,176&stocks=345,348,349,350,352,355,22402&tabs=3,1,4,2" width="317" height="467"></iframe><div class="poweredBy" style="font-family:arial,helvetica,sans-serif; direction:ltr;"><span style="font-size: 11px;color: #333333;text-decoration: none;">Technical Summary Widget Powered by <a href="https://in.investing.com/" rel="nofollow" target="_blank" style="font-size: 11px;color: #06529D; font-weight: bold;" class="underline_link">Investing.com India</a></span></div>`;
    parentDiv.appendChild(childElement);
  } else {
    parentDiv.innerHTML = "";
  }
});

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    childElement.innerHTML = childElement.innerHTML = `<iframe src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&category=_employment,_economicActivity,_inflation,_credit,_centralBanks,_confidenceIndex,_balance,_Bonds&importance=1,2,3&features=datepicker,timezone,timeselector,filters&countries=14&calType=week&timeZone=23&lang=56" width="650" height="467" frameborder="0" allowtransparency="true" marginwidth="0" marginheight="0"></iframe><div class="poweredBy" style="font-family: Arial, Helvetica, sans-serif;"><span style="font-size: 11px;color: #333333;text-decoration: none;">Real Time Economic Calendar provided by <a href="https://in.Investing.com/" rel="nofollow" target="_blank" style="font-size: 11px;color: #06529D; font-weight: bold;" class="underline_link">Investing.com India</a>.</span></div>`
    parentDiv.appendChild(childElement);
  } else {
    parentDiv.innerHTML = "";
  }
});