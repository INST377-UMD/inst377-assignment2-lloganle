window.onload = () => {
    function TurnAudioOff() {
      if (annyang) {
        annyang.abort();
        console.log("Audio turned off");
      }
    }
  
    function TurnAudioOn() {
      if (annyang) {
        annyang.start();
        console.log("Audio turned on");
      }
    }
  
    if (annyang) {
      const commands = {
        "hello": () => {
          alert("Hello World!");
        },
        "change the color to *color": (color) => {
          document.body.style.backgroundColor = color;
        },
        "navigate to *page": (page) => {
          const responsePage = page.toLowerCase();
          if (responsePage === "home") {
            window.location.href = "homePage.html";
          } else if (responsePage === "stocks") {
            window.location.href = "stocksPage.html";
          } else if (responsePage === "dogs") {
            window.location.href = "dogPage.html";
          }
        },
        "lookup *ticker": (ticker) => {
          const tickerInput = document.getElementById("ticker");
          const rangeInput = document.getElementById("range");
          if (tickerInput && rangeInput) {
            tickerInput.value = ticker.toUpperCase();
            fetchStockData(); // Make sure this function is defined globally
          } else {
            console.error("Input elements not found");
          }
        }
      };
  
      annyang.addCommands(commands);
      annyang.addCallback('result', function (phrases) {
        console.log("Recognized speech:", phrases);
      });
  
      annyang.start();
    }
  
    window.TurnAudioOn = TurnAudioOn;
    window.TurnAudioOff = TurnAudioOff;
  };
  