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
const products = [
    'Pose - Matavfall',
    'Pose - Plastavfall',
    'Pose - Restavfall',
    'Beholder - Plastdunk',
    'Pose - Kombipakke'
];

const orders = [
    245,
    89,
    301,
    12,
    439
];

const colors = [
    'rgb(255,111,107)',
    'rgba(117,157,255,0.68)',
    'rgb(111,217,173)',
    'rgb(142,225,122)',
    'rgb(242,216,114)',
];

const datasets = dataset(products, colors, orders);

// TODO: Build Chart.js dataset object.
function dataset(labels,colors,data){
    return {
        datasets: [
            {
                data: data,
                backgroundColor: colors,
                label: 'Dataset 1',
            }
        ],
        labels: labels,
    };
}

// TODO: Build Chart.js config object.
function config(datasets){
    return {
        type: 'pie',
        data: datasets,
        options: {
            responsive: true
        }
    };
}

// TODO: Export ChartJS config.
export function buildConfig() {
    return config(datasets);
}