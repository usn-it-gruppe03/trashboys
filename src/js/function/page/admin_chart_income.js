/**
 * Chart: Products
 *
 * @description Compare orders from last year with current year.
 *
 * @author Isak K. Hauge
 * */
// TODO: Get data from AJAX call.

// TODO: Process data.

// TODO: Add data into a correct format.

// TODO: Build test data.
// Dataset - Income from subscriptions.
const subscriptions = {
    january: 104000,
    february: 184610,
    march: 193710,
    april: 193820,
    may: 182343,
    june: 187361,
    july: 210492,
    august: 202912,
    september: 102191,
    october: 229330,
    november: 120202,
    december: 121233
};

// Dataset - Income from purchases.
const purchases = {
    january: 14400,
    february: 13500,
    march: 27300,
    april: 37700,
    may: 49100,
    june: 36300,
    july: 21900,
    august: 27300,
    september: 30400,
    october: 44400,
    november: 32800,
    december: 20900
};

const datasets = [
    dataset(Object.values(subscriptions), 'Abonnement', 'rgb(255,111,107)'),
    dataset(Object.values(purchases), 'Kjøp', 'rgb(117,157,255)')
];

// TODO: Build Chart.js dataset object.
function dataset(data,label,color){
    return {
        data: data,
        label: label,
        backgroundColor: color,
    };
}

// TODO: Build Chart.js config object.
function config(datasets){
    return {
        type: 'bar',
        data: {
            labels: [
                'Januar',
                'Februar',
                'Mars',
                'April',
                'Mai',
                'Juni',
                'Juli',
                'August',
                'September',
                'Oktober',
                'November',
                'Desember'
            ],
            datasets: datasets,
        },
        options: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Månad',
                    }
                }],
                yAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Antall kroner',
                    }
                }]
            }
        }
    };
}

// TODO: Export ChartJS config.
export function buildConfig() {
    return config(datasets);
}