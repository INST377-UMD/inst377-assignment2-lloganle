function TurnAudioOff(){
    if (annyang){
        annyang.abort();
    }
}

function TurnAudioOn(){
    if (annyang){
        annyang.start();
    }
}

if (annyang){
    const commands = {
        "hello": () => {alert("Hello World!");},
        "change the color to *color": (color) => {document.body.style.backgroundColor = color;},
        "navigate to *page": (page) => {
            responsepage = page.toLowerCase();
            if (responsepage === "home"){
                window.location.href = "homePage.html";
            }
            else if (responsepage === "stocks"){
                window.location.href = "stocksPage.html";
            }
            else if (responsepage === "dogs"){
                window.location.href = "dogsPage.html";}
        },
        "lookup *ticker": ticker => {
        document.getElementById("ticker").value = ticker.toUpperCase();
        loadStockData(ticker.toUpperCase(), document.getElementById("range").value);
    }
    };
    annyang.addCommands(commands);
}