/**
 * Chart: Orders
 *
 * @description Compare orders from last year with current year.
 *
 * @author Isak K. Hauge
 * */
// TODO: Get data from AJAX call.

// TODO: Process data.

// TODO: Add data into a correct format.

// TODO: Build test data.
const lastYear = {
    january: 144,
    february: 135,
    march: 273,
    april: 377,
    may: 491,
    june: 363,
    july: 219,
    august: 273,
    september: 304,
    october: 444,
    november: 328,
    december: 209
};

const currentYear = {
    january: 250,
    february: 99,
    march: 350,
    april: 450,
    may: 521,
    june: 333,
    july: 273,
    august: 395,
    september: 251,
    october: 348,
    november: 391,
    december: 231
};

const datasets = [
    dataset('2018','rgba(0,127,204,0.62)', Object.values(lastYear)),
    dataset('2019','rgba(204,0,26,0.62)', Object.values(currentYear)),
];

// TODO: Build Chart.js dataset object.
function dataset(label,color,data){
    return {
        label: label,
        backgroundColor: color,
        borderColor: color,
        data: data,
        fill: false,
    };
}

// TODO: Build Chart.js config object.
function config(datasets){
    return {
        type: 'line',
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
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Månad',
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Antall bestillinger',
                    },
                }]
            }
        }
    };
}

// TODO: Export ChartJS config.
export function buildConfig() {
    return config(datasets);
}