async function fetchQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        document.getElementById('quote').innerText = `"${data[0].q}"`;
        document.getElementById('author').innerText = `— ${data[0].a}`;
    } catch (error) {
        document.getElementById('quote').innerText = 'Could not load quote.';
        console.error(error);
    }
}
fetchQuote();