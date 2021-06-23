let svg, points, grid, finalData, finalData_noBCN
let popAxis, popAxis_noBCN, airbnbAxis, airbnbAxis_noBCN, airbnbPerAxis
let airbnbScale, airbnbPerScale, popScale, popScale_noBCN
let blue, yellow, teal, orange, newblue
let simulation, nodes
let airbnbPerLegend
let fillScale, square
let annotation1
let makeAnnotation1

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

d3.csv('data/RealData.csv', function(d){
    return {
        Perc_Tourist: +d.Perc_TuristicHouseholds_INE,
        mapX: +d.x, // this can't be called x or the force layout grid won't work!
        mapY: +d.y, // this can't be called y or the force layout grid won't work!
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
}).then(data => {
    finalData = data
    // console.log(finalData)
    createScales()
    setupGrid()
    setTimeout(drawInitial(), 100)
})

// ************************** END LOADING DATA **************************//



// ************************** DECLARATION VARS LEGENDS AND SCALES **************************//


function createScales(){
    map_0_xScale = d3.scaleLinear(d3.extent(finalData, d => d.mapX), [margin.left, width - margin.right])
    map_0_yScale = d3.scaleLinear(d3.extent(finalData, d => d.mapY), [height - margin.bottom, margin.top])

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
    blue = '#7bd2ed'
    yellow = '#ffd208'
    teal = '#29DDC7'
    orange = '#FF852F'
    newblue = '#3B78E0'

    // fillScale = d3.scaleSequential(d3.interpolatePuBu)
    //fillScale = d3.scaleSequential(d3.interpolateGnBu)
    //fillScale = d3.scaleLinear().domain([1,10]).range(["#ffffff", "#3da2a4"])
    fillScale = d3.scaleSequential(chroma.scale(['#fff', teal, newblue]))
}

function legend({
    color,
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = width / 64,
    tickFormat,
    tickValues
  } = {}) {
    const svg = d3.select("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible")
      .style("display", "block");
  
    let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
    let x;
  
    // Continuous
    if (color.interpolate) {
      const n = Math.min(color.domain().length, color.range().length);
  
      x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));
  
      svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
    }
  
    // Sequential
    else if (color.interpolator) {
      x = Object.assign(color.copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)), {
          range() {
            return [marginLeft, width - marginRight];
          }
        });
  
      svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.interpolator()).toDataURL());
  
      // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
      if (!x.ticks) {
        if (tickValues === undefined) {
          const n = Math.round(ticks + 1);
          tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
        }
        if (typeof tickFormat !== "function") {
          tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
        }
      }
    }
  
    // Threshold
    else if (color.invertExtent) {
      const thresholds = color.thresholds ? color.thresholds() // scaleQuantize
        :
        color.quantiles ? color.quantiles() // scaleQuantile
        :
        color.domain(); // scaleThreshold
  
      const thresholdFormat = tickFormat === undefined ? d => d :
        typeof tickFormat === "string" ? d3.format(tickFormat) :
        tickFormat;
  
      x = d3.scaleLinear()
        .domain([-1, color.range().length - 1])
        .rangeRound([marginLeft, width - marginRight]);
  
      svg.append("g")
        .selectAll("rect")
        .data(color.range())
        .join("rect")
        .attr("x", (d, i) => x(i - 1))
        .attr("y", marginTop)
        .attr("width", (d, i) => x(i) - x(i - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", d => d);
  
      tickValues = d3.range(thresholds.length);
      tickFormat = i => thresholdFormat(thresholds[i], i);
    }
  
    // Ordinal
    else {
      x = d3.scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight]);
  
      svg.append("g")
        .selectAll("rect")
        .data(color.domain())
        .join("rect")
        .attr("x", x)
        .attr("y", marginTop)
        .attr("width", Math.max(0, x.bandwidth() - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", color);
  
      tickAdjust = () => {};
    }
  
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(tickAdjust)
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", marginLeft)
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(title));
  
    return svg.node();
  }
  
function ramp(color, n = 256) {
    var canvas = document.createElement('canvas');
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
}
  

// function createLegend(x, y){
//     let svg = d3.select('#legend')

//     console.log('this is createLegend')

//     svg.append('g')
//         .attr('class', 'airbnbPerLegend')
//         .attr('transform', `translate(${x},${y})`)

//     airbnbPerLegend = d3.legendColor()
//                         .shape('path', d3.symbol().type(d3.symbolCircle).size(150)())
//                         .shapePadding(10)
//                         .scale(fillScale)
    
//     d3.select('.airbnbPerLegend')
//         .call(airbnbPerLegend)
// }

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

        // console.log(data_structure)

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

        // points = finalData.map(d => Object.create(d));

}
      

// **************************  END SET UP OTHER VARIABLES **************************//



// ************************** DRAW INITIAL FUNCTION **************************//

// All the initial elements should be create in the drawInitial function
// As they are required, their attributes can be modified
// They can be shown or hidden using their 'opacity' attribute
// Each element should also have an associated class name for easy reference

function drawInitial(){

    let svg = d3.select("#vis")
                .append('svg')
                .attr('width', 1000)
                .attr('height', 1000)
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

    simulation.stop()

    // DRAW 0 - CATALONIA MAP - ADDING TO SVG
    // **************************************
    square = d3.symbol().type(d3.symbolSquare).size(width/3);

    nodes = svg
        .selectAll('circle')
        .data(finalData)
        .join('circle')
            .attr('fill', d => d.airbnb > 0 ? teal : 'none')
            .attr('stroke', d => d.airbnb > 0 ? 'none' : teal)
            .attr('margin-left', 100)
            .attr('r', 4)
            .attr('cx', d => map_0_xScale(d.mapX))
            .attr('cy', d => map_0_yScale(d.mapY))

    
    // MOUSE EVENTS - ALL CIRCLES/SQUARES
    // **********************************
    // Add mouseover and mouseout events for all circles
    // Changes opacity and adds border
    // svg.selectAll('circle')
    //     .on('mouseover', mouseOver)
    //     .on('mouseout', mouseOut)

    // function mouseOver(d, i){

    //     /*console.log('hi')
    //     d3.select(this)
    //         .transition('mouseover').duration(100)
    //         .attr('opacity', 1)
    //         .attr('stroke-width', 5)
    //         .attr('stroke', 'black')
            
    //     d3.select('#tooltip')
    //         .style('left', (d3.event.pageX + 10)+ 'px')
    //         .style('top', (d3.event.pageY - 25) + 'px')
    //         .style('display', 'inline-block')
    //         .html(`<strong>Major:</strong> ${d.Major[0] + d.Major.slice(1,).toLowerCase()} 
    //             <br> <strong>Median Salary:</strong> $${d3.format(",.2r")(d.Median)} 
    //             <br> <strong>Category:</strong> ${d.Category}
    //             <br> <strong>% Female:</strong> ${Math.round(d.ShareWomen*100)}%
    //             <br> <strong># Enrolled:</strong> ${d3.format(",.2r")(d.Total)}`)*/
    // }
    
    // function mouseOut(d, i){
    //     d3.select('#tooltip')
    //         .style('display', 'none')

    //     d3.select(this)
    //         .transition('mouseout').duration(100)
    //         .attr('opacity', 0.8)
    //         .attr('stroke-width', 0)
    // }



    // CREATE ALL AXES — SET OPACITY TO 0

    // NUMBER OF AIRBNBS
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
    
    // NUMBER OF AIRBNBS WITHOUT BARCELONA
    let airbnbAxis_noBCN = d3.axisLeft(airbnbScale_noBCN)
    
    svg.append('g')
        .call(airbnbAxis_noBCN)
        .attr('class', 'airbnbAxis_noBCN')
        .attr('opacity', 0)
        .attr("transform", `translate(${margin.left},0)`)
        .call(g => g.select(".domain"))
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr('font-weight', 'bold')
            .text('AirBnBs'))

    // PERCENT AIRBNBS
    let airbnbPerAxis = d3.axisLeft(airbnbPerScale)
    
    svg.append('g')
        .call(airbnbPerAxis)
        .attr('class', 'airbnbPerAxis')
        .attr('opacity', 0)
        .attr("transform", `translate(${margin.left},0)`)
        .call(g => g.select(".domain"))
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr('font-weight', 'bold')
            .text('percent AirBnB'))

    // POPULATION
    let popAxis = d3.axisBottom(popScale)
    
    svg.append('g')
        .call(popAxis)
        .attr('class', 'popAxis')
        .attr('opacity', 0)
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", -22)
            .attr('y', 25)
            .attr("text-anchor", "start")
            .attr('font-weight', 'bold')
            .text('population'))
    
    // POPULATION WITHOUT BARCELONA
    let popAxis_noBCN = d3.axisBottom(popScale_noBCN)

    svg.append('g')
        .call(popAxis_noBCN)
        .attr('class', 'popAxis_noBCN')
        .attr('opacity', 0)
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", -22)
            .attr('y', 25)
            .attr("text-anchor", "start")
            .attr('font-weight', 'bold')
            .text('population'))

    // LEGENDS
    svg.append('g')
        .attr('class', 'perAirbnbLegend')
        .attr('opacity', 0)
        .attr('transform', 'translate(500, 700)')
        .append(() => legend({ 
            color: fillScale, 
            tickFormat: '%', 
            title: 'Percent Airbnbs', 
            width: 200
        }))
    
    // ANNOTATIONS
    // points to annotate

    // airbnbs graph
    const salou = finalData.filter(d => d.municipality == 'Salou')
    const salou_pop = popScale_noBCN(salou[0].population)
    const salou_air = airbnbScale_noBCN(salou[0].airbnb)

    const roses = finalData.filter(d => d.municipality == 'Roses')
    const roses_pop = popScale_noBCN(roses[0].population)
    const roses_air = airbnbScale_noBCN(roses[0].airbnb)

    const lloret = finalData.filter(d => d.municipality == 'Lloret de Mar')
    const lloret_pop = popScale_noBCN(lloret[0].population)
    const lloret_air = airbnbScale_noBCN(lloret[0].airbnb)

    // percent graph
    const begur = finalData.filter(d => d.municipality == 'Begur')
    const begur_pop = popScale_noBCN(begur[0].population)
    const begur_perAir = airbnbPerScale(begur[0].perc_Airbnb)

    const pals = finalData.filter(d => d.municipality == 'Pals')
    const pals_pop = popScale_noBCN(pals[0].population)
    const pals_perAir = airbnbPerScale(pals[0].perc_Airbnb)


    // create annotation details
    const ann_radius = 10
    const ann_padding = 3

    annotation_salou = [{
        note: {
            title: 'Salou'
        },
        x: salou_pop,
        y: salou_air,
        dy: -25,
        dx: 40,
        subject: { radius: ann_radius, radiusPadding: ann_padding }
    }]

    annotation_roses = [{
        note: {
            title: 'Roses'
        },
        x: roses_pop,
        y: roses_air,
        dy: 40,
        dx: 40,
        subject: { radius: ann_radius, radiusPadding: ann_padding }
    }]

    annotation_lloret = [{
        note: {
            title: 'Lloret de Mar'
        },
        x: lloret_pop,
        y: lloret_air,
        dy: -25,
        dx: 40,
        subject: { radius: ann_radius, radiusPadding: ann_padding }
    }]

    annotation_begur = [{
        note: {
            title: 'Begur'
        },
        x: begur_pop,
        y: begur_perAir,
        dy: 30,
        dx: 45,
        subject: { radius: ann_radius, radiusPadding: ann_padding }
    }]

    annotation_pals = [{
        note: {
            title: 'Pals'
        },
        x: pals_pop,
        y: pals_perAir,
        dy: 40,
        dx: 40,
        subject: { radius: ann_radius, radiusPadding: ann_padding }
    }]

    // make the annotations
    // airbnbs
    // salou
    makeAnnotation_salou = d3.annotation()
                             .annotations(annotation_salou)
                             .type(d3.annotationCalloutCircle)

    svg.append('g')
        .attr('opacity', 0)
        .attr('class', 'annotation_airbnbs')
        .call(makeAnnotation_salou)
    // roses
    makeAnnotation_roses = d3.annotation()
                             .annotations(annotation_roses)
                             .type(d3.annotationCalloutCircle)

    svg.append('g')
        .attr('opacity', 0)
        .attr('class', 'annotation_airbnbs')
        .call(makeAnnotation_roses)
    //loret
    makeAnnotation_lloret = d3.annotation()
                             .annotations(annotation_lloret)
                             .type(d3.annotationCalloutCircle)

    svg.append('g')
        .attr('opacity', 0)
        .attr('class', 'annotation_airbnbs')
        .call(makeAnnotation_lloret)

    // percent graph
    // begur
    makeAnnotation_begur = d3.annotation()
                             .annotations(annotation_begur)
                             .type(d3.annotationCalloutCircle)

    svg.append('g')
        .attr('opacity', 0)
        .attr('class', 'annotation_perc')
        .call(makeAnnotation_begur)

    // pals
    makeAnnotation_pals = d3.annotation()
                            .annotations(annotation_pals)
                            .type(d3.annotationCalloutCircle)

    svg.append('g')
        .attr('opacity', 0)
        .attr('class', 'annotation_perc')
        .call(makeAnnotation_pals)

}

// ************************** END DRAW INITIAL FUNCTION **************************//






// ************************** CLEAN FUNCTION **************************//

// Will hide all the elements which are not necessary for a given chart type 

function clean(chartType){
    let svg = d3.select('#vis').select('svg')
    if (chartType !== 'isDraw0') {
        // no axes needed for the graph, but will need a legend of some kind
    }
    if (chartType !== 'isDraw1') {
        // no axes needed for the graph, but will need a legend of some kind
    }
    if (chartType !== 'isDraw2') {
        // need popAxis and airbnbAxis
        svg.select('.airbnbAxis').transition().attr('opacity', 0)
        svg.select('.popAxis').transition().attr('opacity', 0)
    }
    if (chartType !== 'isDraw3') {
        // need popScale_noBCN and airbnbScale_noBCN
        svg.select('.airbnbAxis_noBCN').transition().attr('opacity', 0)
        svg.select('.popAxis').transition().attr('opacity', 0)
        svg.selectAll('.annotation_airbnbs').transition().attr('opacity', 0)
    }
    if (chartType !== 'isDraw4') {
        // need popScale_noBCN, airbnbPerScale
        svg.select('.airbnbPerAxis').transition().attr('opacity', 0)
        svg.select('.popAxis_noBCN').transition().attr('opacity', 0)
        svg.selectAll('.annotation_perc').transition().attr('opacity', 0)
    }
    if (chartType !== 'isDraw5') {
        // need popAxis_noBCN, airbnbPerAxis
        svg.select('.airbnbPerAxis').transition().attr('opacity', 0)
        svg.select('.popAxis_noBCN').transition().attr('opacity', 0)
    }
    if (chartType !== 'isDraw6') {
        // no axes needed for the graph, but will need a legend of some kind
        svg.select('.perAirbnbLegend').attr('opacity', 0)
    }
    if (chartType !== 'isDraw7') {
        console.log('this is clean draw7')
        // no axes needed for the graph, but will need a legend of some kind
    }

}

// ************************** END CLEAN FUNCTION **************************//


// ************************** ALL DRAW FUNCTIONS **************************//

//First draw function
function draw0(){
    simulation.stop()
    
    let svg = d3.select("#vis")
                    .select('svg')
                    .attr('width', 1000)
                    .attr('height', 950)
    
    clean('isDraw0')

    console.log("hi 0")
    
    svg.selectAll('circle')
        .transition().duration(500).delay(100)
        .attr('fill', d => d.airbnb > 0 ? teal : 'none')
        .attr('stroke', d => d.airbnb > 0 ? 'none' : teal)
        .attr('stroke-width', 1)
        // .attr('r', 3)
        .attr('cx', d => map_0_xScale(d.mapX))
        .attr('cy', d => map_0_yScale(d.mapY))

}

function draw1(){
    let svg = d3.select("#vis").select('svg')
    clean('isDraw1')

    simulation
        .force("center", d3.forceCenter(width / 2, height / 2))
    
    simulation.alpha(1).restart()

    svg.selectAll('circle')
        .transition().delay(2200)
        .attr('fill', d => {
            if(d.brand == 'Costa Brava' && d.airbnb > 0){ return yellow } 
            if(d.brand !== 'Costa Brava' && d.airbnb > 0){ return teal } 
            if(d.airbnb == 0){ return 'none' }
        })
        .attr('stroke', d => {
            if(d.brand == 'Costa Brava' && d.airbnb == 0){ return yellow }
            if(d.brand !== 'Costa Brava' && d.airbnb == 0){ return teal }
            if(d.airbnb > 0){ return 'none' }
        })
}

function draw2(){
    simulation.stop()

    let svg = d3.select("#vis").select('svg')
    clean('isDraw2')

    // need popAxis and airbnbAxis
    svg.selectAll('.popAxis').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)
    svg.selectAll('.airbnbAxis').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)
    
    svg.selectAll('circle')
        .transition().duration(800).ease(d3.easeBack)
        .attr('cx', d => popScale(d.population))
        .attr('cy', d => airbnbScale(d.airbnb))
        // .attr('r', 5)
        .attr('fill', teal)
        .attr('opacity', 0.7)
        
    
}

function draw3(){
    let svg = d3.select("#vis").select('svg')
    clean('isDraw3')

    // need popScale_noBCN and airbnbScale_noBCN
    svg.selectAll('.popAxis_noBCN').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)
    svg.selectAll('.airbnbAxis_noBCN').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)
    svg.selectAll('.annotation_airbnbs').transition().attr('opacity', 1).delay(800)

    svg.selectAll('circle')
        .transition().duration(800).ease(d3.easeBack)
        .attr('cx', d => popScale_noBCN(d.population))
        .attr('cy', d => airbnbScale_noBCN(d.airbnb))
        // .attr('r', 5)
        .attr('fill', d => d.municipality == 'Barcelona' ? 'none' : teal)
        .attr('opacity', 0.7)
        
}

function draw4(){
    
    let svg = d3.select('#vis').select('svg')
    clean('isDraw4')

    // need popScale_noBCN, airbnbPerScale
    svg.selectAll('.popAxis_noBCN').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)
    svg.selectAll('.airbnbPerAxis').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)
    svg.selectAll('.annotation_perc').transition().attr('opacity', 1).delay(800)

    svg.selectAll('circle')
        .transition().duration(800).ease(d3.easeBack)
        .attr('cx', d => popScale_noBCN(d.population))
        .attr('cy', d => airbnbPerScale(d.perc_Airbnb))
        // .attr('r', 5)
        .attr('fill', d => {if (d.municipality == 'Barcelona' || isNaN(d.perc_Airbnb)){ return 'none'} else { return teal }})
        .attr('opacity', 0.7)

}

function draw5(){    
    let svg = d3.select("#vis").select("svg")
    clean('isDraw5')

    // need popAxis_noBCN, airbnbPerAxis
    svg.selectAll('.popAxis_noBCN').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)
    svg.selectAll('.airbnbPerAxis').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)

    svg.selectAll('circle')
        .transition().duration(800).ease(d3.easeBack)
        .attr('cx', d => popScale_noBCN(d.population))
        .attr('cy', d => airbnbPerScale(d.perc_Airbnb))
        // .attr('r', 5)
        .attr('fill', d => {if (d.brand == 'Costa Brava'){ return yellow } if (d.municipality == 'Barcelona' || isNaN(d.perc_Airbnb)){ return 'none' } else { return teal }})
        .attr('opacity', 0.7)
}

function draw6(){
    let svg = d3.select('#vis').select('svg')
    clean('isDraw6')

    svg.selectAll('circle')
        .transition().duration(800).delay(100)
        .attr('fill', d => d.perc_Airbnb ? fillScale(d.perc_Airbnb) : 'none')
        // .attr('r', 3)
        .attr('cx', d => map_0_xScale(d.mapX))
        .attr('cy', d => map_0_yScale(d.mapY))

        
    svg.selectAll('.perAirbnbLegend').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)
}
function draw7(){
    clean('isDraw7')
    console.log('this is draw7')


}

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
    draw5,
    draw6,
    draw7
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
        .style('opacity', function (d, i) {return i === index ? 1 : 0;});
    
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
