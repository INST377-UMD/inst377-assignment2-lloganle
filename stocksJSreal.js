const apiKey = 'v1fNzkRlnGOx9gz9lliJ453vFUsoX5Kc';

function fetchStockData() {
  const ticker = document.getElementById('tickerInput').value.toUpperCase();
  const days = parseInt(document.getElementById('daysSelect').value);
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - days);

  const from = fromDate.toISOString().split('T')[0];
  const to = toDate.toISOString().split('T')[0];

const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=${v1fNzkRlnGOx9gz9lliJ453vFUsoX5Kc}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        throw new Error("No results found for ticker.");
      }

      const labels = data.results.map(r => new Date(r.t).toLocaleDateString());
      const values = data.results.map(r => r.c);
      renderChart(labels, values, ticker);
    })
    .catch(err => alert("Error fetching stock data: " + err.message));
}

let chart;

function renderChart(labels, data, ticker) {
  const ctx = document.getElementById('stockChart').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: `Closing Price for ${ticker}`,
        data,
        borderColor: '#FF69B4',
        backgroundColor: 'rgba(255, 182, 193, 0.4)',
        fill: true,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

function fetchRedditStocks() {
  fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03")
    .then(res => res.json())
    .then(data => {
      const top5 = data.slice(0, 5);
      const tbody = document.getElementById("topStocksBody");
      tbody.innerHTML = "";

      top5.forEach(stock => {
        const sentiment = stock.sentiment.toLowerCase();
        const icon = sentiment === "bullish"
          ? '<img src="https://cdn-icons-png.flaticon.com/512/6410/6410339.png" alt="Bullish" height="40">'
          : '<img src="https://cdn-icons-png.freepik.com/512/6410/6410304.png" alt="Bearish" height="40">';

        const row = document.createElement("tr");
        row.innerHTML = `
          <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
          <td>${stock.no_of_comments}</td>
          <td>${icon}</td>
        `;
        tbody.appendChild(row);
      });
    });
}

function TurnAudioOn() {
  if (annyang) {
    const commands = {
      "hello": () => alert("Hello World"),
      "change the color to *color": (color) => {
        document.body.style.backgroundColor = color;
      },
      "navigate to *page": (page) => {
        window.location.href = `${page.toLowerCase()}.html`;
      },
      "lookup *ticker": (ticker) => {
        document.getElementById("tickerInput").value = ticker.toUpperCase();
        document.getElementById("daysSelect").value = "30";
        fetchStockData();
      }
    };
    annyang.addCommands(commands);
    annyang.start();

    annyang.addCallback('result', function (phrases) {
      console.log("Recognized:", phrases);
    });
  }
}

function TurnAudioOff() {
  if (annyang) {
    annyang.abort();
  }
}

window.onload = () => {
  fetchRedditStocks();
  TurnAudioOn(); 
};
