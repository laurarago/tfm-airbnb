let dataset, dataset2, svg, points, grid, finalData, finalData_noBCN
let popAxis, popAxis_noBCN, airbnbAxis, airbnbAxis_noBCN, airbnbPerAxis
let airbnbScale, airbnbPerScale, popScale, popScale_noBCN
let blue, yellow
let simulation, nodes
let categoryLegend, salaryLegend
let fillScale, square


// const categories = ['Engineering', 'Business', 'Physical Sciences', 'Law & Public Policy', 'Computers & Mathematics', 'Agriculture & Natural Resources',
// 'Industrial Arts & Consumer Services','Arts', 'Health','Social Science', 'Biology & Life Science','Education','Humanities & Liberal Arts',
// 'Psychology & Social Work','Communications & Journalism','Interdisciplinary']

// const categoriesXY = {'Engineering': [0, 400, 57382, 23.9],
//                         'Business': [0, 600, 43538, 48.3],
//                         'Physical Sciences': [0, 800, 41890, 50.9],
//                         'Law & Public Policy': [0, 200, 42200, 48.3],
//                         'Computers & Mathematics': [200, 400, 42745, 31.2],
//                         'Agriculture & Natural Resources': [200, 600, 36900, 40.5],
//                         'Industrial Arts & Consumer Services': [200, 800, 36342, 35.0],
//                         'Arts': [200, 200, 33062, 60.4],
//                         'Health': [400, 400, 36825, 79.5],
//                         'Social Science': [400, 600, 37344, 55.4],
//                         'Biology & Life Science': [400, 800, 36421, 58.7],
//                         'Education': [400, 200, 32350, 74.9],
//                         'Humanities & Liberal Arts': [600, 400, 31913, 63.2],
//                         'Psychology & Social Work': [600, 600, 30100, 79.4],
//                         'Communications & Journalism': [600, 800, 34500, 65.9],
//                         'Interdisciplinary': [600, 200, 35000, 77.1]}

const margin = {left: 140, top: 125, bottom: 35, right: 20}
const width = 850 - margin.left - margin.right
const height = 850 - margin.top - margin.bottom
const paddingMap = 150;

const colors = ['#ffcc00', '#ff6666', '#cc0066', '#66cccc', '#f688bb', '#65587f', '#baf1a1', '#333333', '#75b79e',  '#66cccc', '#9de3d0', '#f1935c', '#0c7b93', '#eab0d9', '#baf1a1', '#9399ff']

const brandCodes = {
    'Pirineus': 1,
    'Costa Barcelona': 2,
    'Terres de Lleida': 3,
    'Paisatges de Barcelona': 4,
    'Costa Brava': 5,
    'Costa Daurada': 6,
    "Terres de l'Ebre": 7,
    "Val d'Aran": 8,
    'Barcelona': 9
}

// ************************** LOADING DATA **************************//

d3.csv('data/recent-grads.csv', function(d){
    return {
        Major: d.Major,
        Total: +d.Total,
        Men: +d.Men,
        Women: +d.Women,
        Median: +d.Median,
        Unemployment: +d.Unemployment_rate,
        Category: d.Major_category,
        ShareWomen: +d.ShareWomen, 
        HistCol: +d.Histogram_column,
        Midpoint: +d.midpoint
    };
}).then(data => {
    dataset = data
    // console.log(dataset)
    //createScales()
    //setTimeout(drawInitial(), 100)
}) 


// d3.csv('data/data_070621.csv', function(d){
//     return {
//         muni: d.Municipality,
//         brand: d.brand,
//         brandCode: brandCodes[d.brand],
//         codemuni: d.IdescatCode,
//         Perc_Tourist: +d.Perc_TuristicHousehols,
//         centroix: +d.X,
//         centroiy: +d.Y
//     };
// }).then(data2 => {
//     dataset2 = data2
//     // console.log(dataset2)
//     createScales()
//     setupGrid()
//     setTimeout(drawInitial(), 100)
// })

d3.csv('data/RealData.csv', function(d){
    return {
        Perc_Tourist: +d.Perc_TuristicHouseholds_INE,
        x: +d.x,
        y: +d.y,
        INECode: d.INECode,
        IdescatCode: d.IdescatCode,
        municipality: d.Municipality,
        brand: d.brand,
        province: d.province,
        population: +d.Population,
        perc_Airbnb: +d.perc_AirbnbOk,
        airbnb: +d.airbnb,
        brandCode: brandCodes[d.brand]
    };
}).then(data3 => {
    finalData = data3
    console.log(finalData)
    createScales()
    setupGrid()
    setTimeout(drawInitial(), 100)
})

// ************************** END LOADING DATA **************************//







// ************************** DECLARATION VARS LEGENDS AND SCALES **************************//


function createScales(){
    map_0_xScale = d3.scaleLinear(d3.extent(finalData, d => d.x), [margin.left, width - margin.right])
    map_0_yScale = d3.scaleLinear(d3.extent(finalData, d => d.y), [height - margin.bottom, margin.top])

    finalData_noBCN = finalData.filter(d => d.municipality !== 'Barcelona')

    popScale = d3.scaleLinear() // this is an x axis
        .domain(d3.extent(finalData, d => d.population)).nice()
        .range([margin.left, width - margin.right])

    popScale_noBCN = d3.scaleLinear() // this is an x axis
        .domain(d3.extent(finalData_noBCN, d => d.population)).nice()
        .range([margin.left, width - margin.right])

    airbnbScale = d3.scaleLinear() // this is a y axis
        .domain(d3.extent(finalData, d => d.airbnb)).nice()
        .range([height - margin.bottom, margin.top])

    airbnbScale_noBCN = d3.scaleLinear() // this is a y axis
        .domain(d3.extent(finalData_noBCN, d => d.airbnb)).nice()
        .range([height - margin.bottom, margin.top])

    airbnbPerScale = d3.scaleLinear() // this is a y axis
        .domain(d3.extent(finalData, d => d.perc_Airbnb)).nice()
        .range([height - margin.bottom, margin.top])

    // COLOR STUFF
    blue = '#7bd2ed';
    yellow = '#ffd208'

    fillScale = d3.scaleSequential(d3.interpolatePuBu)
    //fillScale = d3.scaleSequential(d3.interpolateGnBu)
    //fillScale = d3.scaleLinear().domain([1,10]).range(["#ffffff", "#3da2a4"])
    // fillScale = d3.scaleSequential(chroma.scale([lightColor, darkColor]))
}

function createLegend(x, y){
    let svg = d3.select('#legend')

    svg.append('g')
        .attr('class', 'categoryLegend')
        .attr('transform', `translate(${x},${y})`)

    categoryLegend = d3.legendColor()
                            .shape('path', d3.symbol().type(d3.symbolCircle).size(150)())
                            .shapePadding(10)
                            .scale(categoryColorScale)
    
    d3.select('.categoryLegend')
        .call(categoryLegend)
}

// function createSizeLegend(){
//     let svg = d3.select('#legend2')
//     svg.append('g')
//         .attr('class', 'sizeLegend')
//         .attr('transform', `translate(100,50)`)

//     sizeLegend2 = d3.legendSize()
//         .scale(salarySizeScale)
//         .shape('circle')
//         .shapePadding(15)
//         .title('Salary Scale')
//         .labelFormat(d3.format("$,.2r"))
//         .cells(7)

//     d3.select('.sizeLegend')
//         .call(sizeLegend2)
// }

// function createSizeLegend2(){
//     let svg = d3.select('#legend3')
//     svg.append('g')
//         .attr('class', 'sizeLegend2')
//         .attr('transform', `translate(50,100)`)

//     sizeLegend2 = d3.legendSize()
//         .scale(enrollmentSizeScale)
//         .shape('circle')
//         .shapePadding(55)
//         .orient('horizontal')
//         .title('Enrolment Scale')
//         .labels(['1000', '200000', '400000'])
//         .labelOffset(30)
//         .cells(3)

//     d3.select('.sizeLegend2')
//         .call(sizeLegend2)

// }
// **************************  END DECLARATION VARS LEGENDS AND SCALES **************************//

// **************************  SET UP OTHER VARIABLES **************************//

    // FOR 'BAR CHART'
    function setupGrid() {    
        const GRID_SIZE = 15; // controls how much space there is between each square
        const GRID_COLS = 4;

        let data_structure = {
            bars : [...new Set(finalData.map(d => d.brandCode))],
            bar_names: [...new Set(finalData.map(d => d.brand))],
            bar_counts : [],
            bar_rows : []
        }
        
        for (var i = 0; i < data_structure.bars.length; i++) {
            data_structure.bar_counts[i] = finalData.map(d => d.brandCode).reduce(function(n, val) {
                return n + (val === data_structure.bars[i]);
            }, 0);
            data_structure.bar_rows[i] = Math.ceil(data_structure.bar_counts[i] / GRID_COLS);
        }
        
        const sorted = data_structure.bars.map((d,i) => { return {
            bar: d,
            bar_names: data_structure.bar_names[i],
            bar_counts: data_structure.bar_counts[i],
            bar_rows: data_structure.bar_rows[i]
            }}).sort(function(a,b) {
            return b.bar_counts - a.bar_counts;
        })
        
        data_structure = {
            bars: sorted.map(d => d.bar),
            bar_names: sorted.map(d => d.bar_names),
            bar_counts: sorted.map(d => d.bar_counts),
            bar_rows: sorted.map(d => d.bar_rows)
        }

        console.log(data_structure)

        // grid.init();

        const GRID_ROWS = Math.ceil(finalData.length / GRID_COLS);        
            
        grid = {
            cells : [],
            
            init : function() {
            this.cells = {};
            
            for (var bar = 0; bar < data_structure.bars.length; bar++) {
                let curr_g = 
                this.cells[bar] = [];
                let bar_cells = [];
                let cells_count = data_structure.bar_counts[bar];
                        
                let start_x = bar * (GRID_COLS+1) * GRID_SIZE;
                    
                for(var r = 0; r < GRID_ROWS; r++) {
                for(var c = 0; c < GRID_COLS; c++) {
                    if (cells_count <= 0) continue;

                    var cell;
                    cell = {
                    x : start_x + c * GRID_SIZE,
                    y : height - r * GRID_SIZE,
                    occupied : false
                    };
                    
                    this.cells[bar].push(cell);
                    // bar_cells.push(cell);
                    cells_count--;
                };
                };
            }
            
            },
            
            sqdist : function(a, b) {
            return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
            },

            occupyNearest : function(p) {
            // if (p.group != 0) return null; 
            let bar_i = data_structure.bars.indexOf(p.brandCode);
            var minDist = 1000000;
            var d;
            var candidate = null;
            
            for(var i = 0; i < this.cells[bar_i].length; i++) {
                if(!this.cells[bar_i][i].occupied && ( d = this.sqdist(p, this.cells[bar_i][i])) < minDist) {
                minDist = d;
                candidate = this.cells[bar_i][i];
                }
            }
            if(candidate)
                candidate.occupied = true;
            return candidate;
            }
        }

        points = finalData.map(d => Object.create(d));

    }
      

// **************************  END SET UP OTHER VARIABLES **************************//



// ************************** DRAW INITIAL FUNCTION **************************//

// All the initial elements should be create in the drawInitial function
// As they are required, their attributes can be modified
// They can be shown or hidden using their 'opacity' attribute
// Each element should also have an associated class name for easy reference

function drawInitial(){
    // createSizeLegend()
    // createSizeLegend2()

    console.log("hi initial")

    let svg = d3.select("#vis")
                    .append('svg')
                    .attr('width', 1000)
                    .attr('height', 950)
                    .attr('opacity', 1)


    // SIMULATION FORCES
    // *******************
    // Instantiates the force simulation
    // Has no forces. Actual forces are added and removed as required
    simulation = d3.forceSimulation(finalData)

    simulation.on('tick', () => {
        grid.init();
            
        nodes
            .each(function(d) { 
                let gridpoint = grid.occupyNearest(d);
                if (gridpoint) {            
                    // ensures smooth movement towards final positoin
                                d.x += (gridpoint.x - d.x) * .05;
                                d.y += (gridpoint.y - d.y) * .05;
                
                    // jumps directly into final position  
                    // d.x = gridpoint.x;
                    // d.y = gridpoint.y
                            }
                })
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
        });

    drag = simulation => {

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        } 
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    simulation.stop()

    // DRAW 0 - CATALONIA MAP - ADDING TO SVG
    // **************************************
    square = d3.symbol().type(d3.symbolSquare).size(width/3);

    nodes = svg
        .selectAll('circle')
        .data(finalData)
        .join('circle')
            .attr('fill', d => fillScale(d.Perc_Tourist))
            .attr('margin-left', 100)
            .attr('r', 3)
            .attr('cx', d => map_0_xScale(d.x))
            .attr('cy', d => map_0_yScale(d.y))
            //.attr('opacity', 0.8)


    
    // MOUSE EVENTS - ALL CIRCLES/SQUARES
    // **********************************
    // Add mouseover and mouseout events for all circles
    // Changes opacity and adds border
    svg.selectAll('circle')
        .on('mouseover', mouseOver)
        .on('mouseout', mouseOut)

    function mouseOver(d, i){

        /*console.log('hi')
        d3.select(this)
            .transition('mouseover').duration(100)
            .attr('opacity', 1)
            .attr('stroke-width', 5)
            .attr('stroke', 'black')
            
        d3.select('#tooltip')
            .style('left', (d3.event.pageX + 10)+ 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(`<strong>Major:</strong> ${d.Major[0] + d.Major.slice(1,).toLowerCase()} 
                <br> <strong>Median Salary:</strong> $${d3.format(",.2r")(d.Median)} 
                <br> <strong>Category:</strong> ${d.Category}
                <br> <strong>% Female:</strong> ${Math.round(d.ShareWomen*100)}%
                <br> <strong># Enrolled:</strong> ${d3.format(",.2r")(d.Total)}`)*/
    }
    
    function mouseOut(d, i){
        d3.select('#tooltip')
            .style('display', 'none')

        d3.select(this)
            .transition('mouseout').duration(100)
            .attr('opacity', 0.8)
            .attr('stroke-width', 0)
    }




    // TEXTS FOR AXIS Y - ADDING TO SVG
    // ********************************
    //Small text label for map 0
    /*svg.selectAll('.small-text-map-0')
        .data(dataset2)
        .enter()
        .append('text')
            .text((d, i) => d.centroiy)
            .attr('class', 'small-text-map-0')
            .attr('x', margin.left)
            .attr('y', (d, i) => i * 5.2 + 30)
            .attr('font-size', 7)
            .attr('text-anchor', 'end')*/


    //Small text label for first graph
    /*svg.selectAll('.small-text')
        .data(dataset)
        .enter()
        .append('text')
            .text((d, i) => d.Major.toLowerCase())
            .attr('class', 'small-text')
            .attr('x', margin.left)
            .attr('y', (d, i) => i * 5.2 + 30)
            .attr('font-size', 7)
            .attr('text-anchor', 'end')*/
    
    //All the required components for the small multiples charts
    //Initialises the text and rectangles, and sets opacity to 0 
    // svg.selectAll('.cat-rect')
    //     .data(categories).enter()
    //     .append('rect')
    //         .attr('class', 'cat-rect')
    //         .attr('x', d => categoriesXY[d][0] + 120 + 1000)
    //         .attr('y', d => categoriesXY[d][1] + 30)
    //         .attr('width', 160)
    //         .attr('height', 30)
    //         .attr('opacity', 0)
    //         .attr('fill', 'grey')


    // svg.selectAll('.lab-text')
    //     .data(categories).enter()
    //     .append('text')
    //     .attr('class', 'lab-text')
    //     .attr('opacity', 0)
    //     .raise()

    // svg.selectAll('.lab-text')
    //     .text(d => `Average: $${d3.format(",.2r")(categoriesXY[d][2])}`)
    //     .attr('x', d => categoriesXY[d][0] + 200 + 1000)
    //     .attr('y', d => categoriesXY[d][1] - 500)
    //     .attr('font-family', 'Domine')
    //     .attr('font-size', '12px')
    //     .attr('font-weight', 700)
    //     .attr('fill', 'black')
    //     .attr('text-anchor', 'middle')       

    // svg.selectAll('.lab-text')
    //         .on('mouseover', function(d, i){
    //             d3.select(this)
    //                 .text(d)
    //         })
    //         .on('mouseout', function(d, i){
    //             d3.select(this)
    //                 .text(d => `Average: $${d3.format(",.2r")(categoriesXY[d][2])}`)
    //         })


    // Best fit line for gender scatter plot
    // const bestFitLine = [{x: 0, y: 56093}, {x: 1, y: 25423}]
    // const lineFunction = d3.line()
    //                         .x(d => shareWomenXScale(d.x))
    //                         .y(d => salaryYScale(d.y))

    // // Axes for Scatter Plot
    // svg.append('path')
    //     .transition('best-fit-line').duration(430)
    //         .attr('class', 'best-fit')
    //         .attr('d', lineFunction(bestFitLine))
    //         .attr('stroke', 'grey')
    //         .attr('stroke-dasharray', 6.2)
    //         .attr('opacity', 0)
    //         .attr('stroke-width', 3)

    // let scatterxAxis = d3.axisBottom(shareWomenXScale)
    // let scatteryAxis = d3.axisLeft(salaryYScale).tickSize([width])

    // svg.append('g')
    //     .call(scatterxAxis)
    //     .attr('class', 'scatter-x')
    //     .attr('opacity', 0)
    //     .attr('transform', `translate(0, ${height + margin.top})`)
    //     .call(g => g.select('.domain')
    //         .remove())
    
    // svg.append('g')
    //     .call(scatteryAxis)
    //     .attr('class', 'scatter-y')
    //     .attr('opacity', 0)
    //     .attr('transform', `translate(${margin.left - 20 + width}, 0)`)
    //     .call(g => g.select('.domain')
    //         .remove())
    //     .call(g => g.selectAll('.tick line'))
    //         .attr('stroke-opacity', 0.2)
    //         .attr('stroke-dasharray', 2.5)

    // Axes for Histogram 

    // let histxAxis = d3.axisBottom(enrollmentScale)

    // svg.append('g')
    //     .attr('class', 'enrolment-axis')
    //     .attr('transform', 'translate(0, 700)')
    //     .attr('opacity', 0)
    //     .call(histxAxis)

    // OUR AXES
    let xAxis = d3.axisBottom(map_0_xScale)
        .ticks(4)
        .tickSize(height + 80)

    let yAxis = d3.axisLeft(map_0_yScale).tickSize([width])

    // AXIS FOR NUMBER OF AIRBNBS
    let airbnbAxis = d3.axisLeft(airbnbScale)
    
    svg.append('g')
        .call(airbnbAxis)
        .attr('class', 'airbnbAxis')
        .attr('opacity', 0)
        .attr("transform", `translate(${margin.left},0)`)
        .call(g => g.select(".domain"))
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr('font-weight', 'bold')
            .text('AirBnBs'))

    // STILL NEED TO REVISE THESE!
    
    // let airbnbAxis_noBCN = svg.append('g')
    //     .attr("transform", `translate(${margin.left},0)`)
    //     .call(d3.axisLeft(airbnbScale_noBCN))
    //     .call(g => g.select(".domain"))
    //     .call(g => g.select(".tick:last-of-type text").clone()
    //         .attr("x", 3)
    //         .attr("text-anchor", "start")
    //         .attr('font-weight', 'bold')
    //         .text('AirBnBs'))

    // let airbnbPerAxis = svg.append('g')
    //     .attr("transform", `translate(${margin.left},0)`)
    //     .call(d3.axisLeft(airbnbPerScale))
    //     .call(g => g.select(".domain"))
    //     .call(g => g.select(".tick:last-of-type text").clone()
    //         .attr("x", 3)
    //         .attr("text-anchor", "start")
    //         .attr('font-weight', 'bold')
    //         .text('percent AirBnB'))

    // let popAxis = svg.append('g')
    //     .attr("transform", `translate(0,${height - margin.bottom})`)
    //     .call(d3.axisBottom(popScale).ticks(width / 80))
    //     .call(g => g.select(".tick:last-of-type text").clone()
    //         .attr("x", -22)
    //         .attr('y', 25)
    //         .attr("text-anchor", "start")
    //         .attr('font-weight', 'bold')
    //         .text('population'))

}

// ************************** END DRAW INITIAL FUNCTION **************************//






// ************************** CLEAN FUNCTION **************************//

//Will hide all the elements which are not necessary for a given chart type 

function clean(chartType){
    let svg = d3.select('#vis').select('svg')
    if (chartType !== 'isDraw0'){
        return
    }
    if (chartType !== 'isDraw1'){
        return
    }
    if (chartType !== 'isDraw2'){
        svg.select('airbnbAxis').transition().attr('opacity', 0)
    }

    // EXAMPLE CLEAN FUNCTION BELOW
    // if (chartType !== "isScatter") {
    //     svg.select('.scatter-x').transition().attr('opacity', 0)
    //     svg.select('.scatter-y').transition().attr('opacity', 0)
    //     svg.select('.best-fit').transition().duration(200).attr('opacity', 0)
    // }
    // if (chartType !== "isMultiples"){
    //     svg.selectAll('.lab-text').transition().attr('opacity', 0)
    //         .attr('x', 1800)
    //     svg.selectAll('.cat-rect').transition().attr('opacity', 0)
    //         .attr('x', 1800)
    // }
    // if (chartType !== "isFirst"){
    //     svg.select('.first-axis').transition().attr('opacity', 0)
    //     svg.selectAll('.small-text').transition().attr('opacity', 0)
    //         .attr('x', -200)
    // }
    // if (chartType !== "isHist"){
    //     svg.selectAll('.hist-axis').transition().attr('opacity', 0)
    // }
    // if (chartType !== "isBubble"){
    //     svg.select('.enrolment-axis').transition().attr('opacity', 0)
    // }
}

// ************************** END CLEAN FUNCTION **************************//


// ************************** ALL DRAW FUNCTIONS **************************//

//First draw function
function draw0(){
    //Stop simulation
    simulation.stop()
    
    let svg = d3.select("#vis")
                    .select('svg')
                    .attr('width', 1000)
                    .attr('height', 950)
    
    clean('isFirst')

    d3.select('.categoryLegend').transition().remove()

    svg.select('.first-axis')
        .attr('opacity', 1)

    console.log("hi 0")
    
    svg.selectAll('circle')
        .transition().duration(500).delay(100)
        .attr('fill', d => fillScale(d.Perc_Tourist))
        .attr('r', 3)
        .attr('cx', d => map_0_xScale(d.x))
        .attr('cy', d => map_0_yScale(d.y))

    svg.selectAll('.small-text-map-0').transition()
        .attr('opacity', 1)
        .attr('x', margin.left)
        .attr('y', (d, i) => i * 5.2 + 30)
}


function draw1(){
    console.log("hi 1")

    let svg = d3.select("#vis").select('svg')

    // clean('none')

    // simulation
    //     .force("center", d3.forceCenter(width / 2, height / 1.5))
    
    // simulation.alpha(1).restart()

    // svg.selectAll('circle')
    //     .attr('fill', d => fillScale(d.Perc_Tourist))
    //     .transition().duration(300).delay((d, i) => i * 2)
    //     .call(drag(simulation))

}


function draw2(){
    let svg = d3.select("#vis").select('svg')
    // clean('isDraw2')

    // need popAxis and airbnbAxis
    
    svg.selectAll('circle')
        .transition().duration(800).ease(d3.easeBack)
        .attr('cx', d => popScale(d.population))
        .attr('cy', d => airbnbScale(d.airbnb))
        .attr('r', 5)
        .attr('fill', blue)
        .attr('opacity', 0.7)
        
    
}

function draw3(){
    let svg = d3.select("#vis").select('svg')
    // clean('isDraw3')

    // need popScale_noBCN and airbnbScale_noBCN

    svg.selectAll('circle')
        .transition().duration(800).ease(d3.easeBack)
        .attr('cx', d => popScale_noBCN(d.population))
        .attr('cy', d => airbnbScale_noBCN(d.airbnb))
        .attr('r', 5)
        .attr('fill', d => d.municipality == 'Barcelona' ? 'none' : blue)
        .attr('opacity', 0.7)
        
}

function draw4(){
    
    let svg = d3.select('#vis').select('svg')
    clean('isDraw4')

    // need popScale_noBCN, airbnbPerScale

    svg.selectAll('circle')
        .transition().duration(800).ease(d3.easeBack)
        .attr('cx', d => popScale_noBCN(d.population))
        .attr('cy', d => airbnbPerScale(d.perc_Airbnb))
        .attr('r', 5)
        .attr('fill', d => d.municipality == 'Barcelona' ? 'none' : blue)
        .attr('opacity', 0.7)

}

function draw5(){    
    let svg = d3.select("#vis").select("svg")
    // clean('isDraw5')

    // need popAxis_noBCN, airbnbPerAxis

    svg.selectAll('circle')
        .transition().duration(800).ease(d3.easeBack)
        .attr('cx', d => popScale_noBCN(d.population))
        .attr('cy', d => airbnbPerScale(d.perc_Airbnb))
        .attr('r', 5)
        .attr('fill', d => {if (d.brand == 'Costa Brava'){ return yellow } if (d.municipality == 'Barcelona'){ return 'none' } else { return blue }})
        .attr('opacity', 0.7)
}

// function draw7(){
//     let svg = d3.select('#vis').select('svg')

//     clean('isBubble')

//     simulation
//         .force('forceX', d3.forceX(d => enrollmentScale(d.Total)))
//         .force('forceY', d3.forceY(500))
//         .force('collide', d3.forceCollide(d => enrollmentSizeScale(d.Total) + 2))
//         .alpha(0.8).alphaDecay(0.05).restart()

//     svg.selectAll('circle')
//         .transition().duration(300).delay((d, i) => i * 4)
//         .attr('r', d => enrollmentSizeScale(d.Total))
//         .attr('fill', d => categoryColorScale(d.Category))

//     //Show enrolment axis (remember to include domain)
//     svg.select('.enrolment-axis').attr('opacity', 0.5).selectAll('.domain').attr('opacity', 1)

// }

// function draw4(){
//     let svg = d3.select('#vis').select('svg')

//     clean('isHist')

//     simulation.stop()

//     svg.selectAll('circle')
//         .transition().duration(600).delay((d, i) => i * 2).ease(d3.easeBack)
//             .attr('r', 10)
//             .attr('cx', d => histXScale(d.Midpoint))
//             .attr('cy', d => histYScale(d.HistCol))
//             .attr('fill', d => categoryColorScale(d.Category))

//     let xAxis = d3.axisBottom(histXScale)
//     svg.append('g')
//         .attr('class', 'hist-axis')
//         .attr('transform', `translate(0, ${height + margin.top + 10})`)
//         .call(xAxis)

//     svg.selectAll('.lab-text')
//         .on('mouseout', )
// }

// function draw8(){
//     clean('none')

//     let svg = d3.select('#vis').select('svg')
//     svg.selectAll('circle')
//         .transition()
//         .attr('r', d => salarySizeScale(d.Median) * 1.6)
//         .attr('fill', d => categoryColorScale(d.Category))

//     simulation 
//         .force('forceX', d3.forceX(500))
//         .force('forceY', d3.forceY(500))
//         .force('collide', d3.forceCollide(d => salarySizeScale(d.Median) * 1.6 + 4))
//         .alpha(0.6).alphaDecay(0.05).restart()
        
// }

// ************************** END ALL DRAW FUNCTIONS **************************//





// ************************** LOGIC OF THE SCROLLYTELLING **************************//

//Array of all the graph functions
//Will be called from the scroller functionality

let activationFunctions = [
    draw0,
    draw1,
    draw2,
    draw3,
    draw4,
    draw5
    // draw6, 
    // draw7,
    // draw8
]



//All the scrolling function
//Will draw a new graph based on the index provided by the scroll


let scroll = scroller()
    .container(d3.select('#graphic'))
scroll()

let lastIndex, activeIndex = 0

scroll.on('active', function(index){

    d3.selectAll('.step')
        .transition().duration(500)
        .style('opacity', function (d, i) {return i === index ? 1 : 0.1;});
    
    activeIndex = index
    let sign = (activeIndex - lastIndex) < 0 ? -1 : 1; 
    let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(i => {
        activationFunctions[i]();
    })
    lastIndex = activeIndex;

})

scroll.on('progress', function(index, progress){
    if (index == 2 & progress > 0.7){

    }
})

// ************************** END LOGIC OF THE SCROLLYTELLING **************************//
