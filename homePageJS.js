async function fetchQuote() {
    try {
        const response = await fetch("https://zenquotes.io/api/quotes/");
        const data = await response.json();
        const quoteEl = document.getElementById('quote'); 
        quoteEl.textContent = `"${data[0].q}" - ${data[0].a}`;
    } catch (e) {
        document.getElementById('quote').innerText = 'Failed to load quote';
        console.error("Quote fetch error:", e); 
    }
}
fetchQuote();
