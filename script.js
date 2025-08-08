const API_URL = "https://worker.hcydgt.workers.dev";

const ctx = document.getElementById('trafficChart').getContext('2d');
let trafficData = {
    labels: [],
    datasets: [{
        label: 'RPS',
        data: [],
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.2)',
        fill: true,
        tension: 0.2
    }]
};

let trafficChart = new Chart(ctx, {
    type: 'line',
    data: trafficData,
    options: {
        responsive: true,
        scales: {
            x: {
                ticks: { color: '#fff' }
            },
            y: {
                beginAtZero: true,
                ticks: { color: '#fff' }
            }
        },
        plugins: {
            legend: { labels: { color: '#fff' } }
        }
    }
});

async function fetchRPS() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const rps = data.rps || 0;

        document.getElementById("rps-value").textContent = rps;

        let now = new Date().toLocaleTimeString();
        trafficData.labels.push(now);
        trafficData.datasets[0].data.push(rps);

        if (trafficData.labels.length > 20) {
            trafficData.labels.shift();
            trafficData.datasets[0].data.shift();
        }

        trafficChart.update();

    } catch (err) {
        console.error("Gagal fetch data:", err);
    }
}

setInterval(fetchRPS, 1000);

