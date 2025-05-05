const apiKey = 'v1fNzkRlnGOx9gz9lliJ453vFUsoX5Kc'

function fetchStockData() {
    const ticker = document.getElementById("tickerInput").value.toUpperCase();
    const days = document.getElementById("rangeSelect").value;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - parseInt(days));

    const format = (date) => date.toISOString().split("T")[0];
    const from = format(startDate);
    const to = format(endDate);

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                throw new Error ("No results found for ticker.");
            }

            const labels = data.results.map(d => new Date(d.t).toLocaleDateString());
            const prices = data.results.map(d => d.c);

            const ctx = document.getElementById("stockChart").getContext("2d");
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `Closing Prices for ${ticker}`,
                        data: prices,
                        borderColor: '#0077C8',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true
                }
            });
        })
        .catch(err => alert(`Error: ${err.message}`));
}

function fetchRedditStocks() {
    fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03")
     .then(res => res.json())
     .then(data => {
        const top5 = data.slice(0, 5);
        const tbody = document.querySelector("#redditTable tbody");
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

window.onload = () => {
    fetchRedditStocks();

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
                document.getElementById("rangeSelect").value = "30";
                fetchStockData();
            }
        };
        annyang.addCommands(commands);
        annyang.start();

        annyang.addCallBack('result', function(phrases) {
            console.log("Recognized:", phrases);
        });
    }
};




