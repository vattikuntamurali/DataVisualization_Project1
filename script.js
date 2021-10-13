var map_width = 500;
var map_height = 500;

var pumps_location;
var workhouse_location;
var brewery_location;
var deaths;
var streets;
var deathdays;

d3.csv("pumps.csv", function (data) {
  pumps_location = data;
  d3.csv("workhouse.csv", function (data) {
    workhouse_location = data;
    d3.csv("brewery.csv", function (data) {
      brewery_location = data;
      d3.csv("deaths_age_sex.csv", function (data) {
        deaths = data;
        d3.json("streets.json", function (data) {
          streets = data;
          drawmap(deaths);
          drawpumps(pumps_location);
          drawdeaths(deaths);
          drawworkhouse(workhouse_location);
          drawbrewery(brewery_location);
        });
      });
    });
  });
});

var tip_age = d3
  .tip()
  .attr("class", "d3-tip")
  .offset([-10, 0])
  .html(function (d) {
    return (
      "<strong>Age:</strong> <span style='color:red'>" + d.age_real + "</span>"
    );
  });

function drawmap(deaths) {
  var g = d3
    .select("#cholera_map")
    .append("svg")
    .attr("id", "main")
    .attr("width", "650")
    .attr("height", "800")

    .call(
      d3.behavior.zoom().on("zoom", function () {
        g.attr(
          "transform",
          "translate(" +
            d3.event.translate +
            ")" +
            " scale(" +
            d3.event.scale +
            ")"
        );
      })
    )
    .append("g")

    .attr("transform", "translate(-100,400) ");

  var xScale = d3.scale.linear();
  var yScale = d3.scale.linear();

  xScale.domain([0, 14]).range([0, map_width]);

  yScale.domain([14, 0]).range([0, map_height]);

  var pathGenerator = d3.svg
    .line()
    .x(function (d) {
      return xScale(d.x);
    })
    .y(function (d) {
      return yScale(d.y);
    });

  g.selectAll(".line")
    .data(streets)
    .enter()
    .append("path")
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", "1.5px")
    .attr("class", "map")
    .attr("d", pathGenerator);
    

  g.append("text")
    .style("fill", "black")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(673,-20) rotate(90)")
    .text("Dean Street");

  g.append("text")
    .style("fill", "black")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(603,-20) rotate(67)")
    .text("Wardour Street");

  g.append("text")
    .style("fill", "black")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(245,45) rotate(50)")
    .text("king Street");

  g.append("text")
    .style("fill", "black")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(300,-55) rotate(-10)")
    .text("Oxford Street");

  g.append("text")
    .style("fill", "black")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(370,90) rotate(-28)")
    .text("Broad Street");

  g.append("text")
    .style("fill", "black")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(220,120) rotate(60)")
    .text("Regent Street");

    g.append("text")
    .style("fill", "black")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(450,250) rotate(15)")
    .text("Brewer Street");


  g.append("circle")
    .attr("r", 12)
    .style("fill", "blue")
    .attr("transform", "translate(545,-280) rotate(0)");

  g.append("text")
    .style("fill", "blue")
    .style("font-size", "18px")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(607,-280) rotate(0)")
    .text("Work House");

  g.append("circle")
    .attr("r", 12)
    .style("fill", "gold")
    .attr("transform", "translate(544,-250) rotate(0)");

  g.append("text")
    .style("fill", "gold")
    .style("font-size", "18px")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(595,-250) rotate(0)")
    .text("Brewery");

  g.append("circle")
    .attr("r", 9)
    .style("fill", "black")
    .attr("transform", "translate(544,-220) rotate(0)");

  g.append("text")
    .style("fill", "black")
    .style("font-size", "18px")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(586,-220) rotate(0)")
    .text("Pump");
  
}

function drawpumps(data) {
  var xScale = d3.scale.linear();
  var yScale = d3.scale.linear();
  xScale.domain([0, 14]).range([0, map_width]);

  yScale.domain([14, 0]).range([0, map_height]);

  var pumps = d3.select("#main").select("g").selectAll(".circle_p").data(data);

  pumps
    .enter()
    .append("circle")
    .attr("r", 8)
    .style("fill", "black")
    .attr("class", "circle_p");

  pumps
    .attr("cx", function (d) {
      return xScale(d.x);
    })
    .attr("cy", function (d) {
      return yScale(d.y);
    });
}

function drawdeaths(data) {
  var xScale = d3.scale.linear();
  var yScale = d3.scale.linear();
  xScale.domain([0, 14]).range([0, map_width]);

  yScale.domain([14, 0]).range([0, map_height]);

  var circles = d3
    .select("#main")
    .select("g")
    .selectAll(".circle_d")
    .data(data);

  circles
    .enter()
    .append("circle")
    .attr("r", 4)
    .style("fill", function (d) {
      if (d.gender == 1) return "purple";
      else return "orange";
    })
    .attr("class", "circle_d");

  circles
    .attr("cx", function (d) {
      return xScale(d.x);
    })
    .attr("cy", function (d) {
      return yScale(d.y);
    })

    .call(tip_age)
    .on("mouseover", tip_age.show)
    .on("mouseout", tip_age.hide);

  circles.exit().remove();
}

function drawworkhouse(data) {
  var xScale = d3.scale.linear();
  var yScale = d3.scale.linear();
  xScale.domain([0, 14]).range([0, map_width]);

  yScale.domain([14, 0]).range([0, map_height]);

  var circles = d3
    .select("#main")
    .select("g")
    .selectAll(".circle_w")
    .data(data);

  circles
    .enter()
    .append("circle")
    .attr("r", 14)
    .style("fill", "blue")
    .attr("class", "circle_w");

  circles
    .attr("cx", function (d) {
      return xScale(d.x);
    })
    .attr("cy", function (d) {
      return yScale(d.y);
    });

  circles.exit().remove();
}

function drawbrewery(data) {
  var xScale = d3.scale.linear();
  var yScale = d3.scale.linear();
  xScale.domain([0, 14]).range([0, map_height]);

  yScale.domain([14, 0]).range([0, map_height]);

  var circles = d3
    .select("#main")
    .select("g")
    .selectAll(".circle_b")
    .data(data);

  circles
    .enter()
    .append("circle")
    .attr("r", 14)
    .style("fill", "gold")
    .attr("class", "circle_b");

  circles
    .attr("cx", function (d) {
      return xScale(d.x);
    })
    .attr("cy", function (d) {
      return yScale(d.y);
    });

  circles.exit().remove();
}

function draw_cumulative(data) {
  tip.show(data);
  drawpumps(pumps_location);
  drawdeaths(deaths.slice(0, data.total));
}

d3.csv("deathdays.csv", function (data) {
  deathdays = data;
  drawTimeline(data);
});

d3.csv("gender_distribution.csv", function (gdist) {
  drawGenderDist(gdist);
});

d3.csv("age_range.csv", function (data) {
  drawAge(data);
});

var tip_deaths = d3
  .tip()
  .attr("class", "d3-tip")
  .offset([-10, 0])
  .html(function (d) {
    return (
      "<strong>Deaths:</strong> <span style='color:red'>" + d.deaths + "</span>"
    );
  });

function drawTimeline(data) {
  var g = d3
    .select("#timeline_graph")
    .append("svg")
    .attr("id", "timeline")

    .attr("width", "700")
    .attr("height", "700")

    .append("g")
    .attr("transform", "translate(50,350)");

  var xScale = d3.scale.ordinal();
  var yScale = d3.scale.linear();
  xScale
    .domain(
      data.map(function (d) {
        return d.date;
      })
    )
    .rangeRoundBands([0, 520], 0.1);

  yScale.domain([0, 15]).range([0, 50]);

  var rect = d3.select("#timeline").select("g").selectAll(".bar1").data(data);

  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

  d3.select("#timeline")
    .select("g")
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + 130 + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

  rect
    .enter()
    .append("rect")
    .attr("width", 10)
    .attr("height", function (d) {
      return yScale(d.deaths);
    });

  rect
    .attr("class", "bar1")
    .attr("x", function (d) {
      return xScale(d.date);
    })
    .attr("y", function (d) {
      return 130 - yScale(d.deaths);
    })

    .call(tip)

    .on("mouseover", draw_cumulative)
    .on("mouseout", tip.hide);

  g.append("text")
    .style("fill", "black")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(250,230) rotate(0)")
    .text("Timeline graph");
}

var tip = d3
  .tip()
  .attr("class", "d3-tip")
  .offset([-10, 0])
  .html(function (d) {
    return (
      "<br><strong> Day:</strong> <span style='color:red'>" +
      d.day +
      "</span></br>" +
      "<strong>Deaths:</strong> <span style='color:red'>" +
      d.deaths +
      "</span>" +
      "<br><strong>Cumulative Deaths:</strong> <span style='color:red'>" +
      d.total +
      "</span></br>"
    );
  });
// function which draws pie chart based on gender
function drawGenderDist(data) {
  var aColor = [
    "rgb(235, 64, 52)",
    "rgb(192, 235, 52)",
    "rgb(32, 133, 34)",
    "rgb(155, 222, 177)",
    "rgb(77, 88, 148)",
    "rgb(194, 54, 154)",
    "rgb(230, 174, 185)",
    "rgb(36, 201, 50)",
    "rgb(186, 101, 20)",
    "rgb(33, 156, 181)",
  ];

  var total = data.map((e) => +e.deaths).reduce((a, b) => a + b, 0);
  console.log("drawGenderDist", data, total);

  var new_data = data.map((element) => {
    return {
      ...element,
      value: ((parseInt(element.deaths, 10) / total) * 100).toFixed(2),
    };
  });
  console.log(new_data);

  var d = 400;
  var h = 400;
  var r = h / 2;

  var vis = d3
    .select("#age_distribution")
    .append("svg:svg")
    .data([new_data])
    .attr("width", d)
    .attr("height", h)
    .append("svg:g")
    .attr("transform", "translate(" + r + "," + r + ")");

  var pie = d3.layout.pie().value(function (d) {
    return d.value;
  });

  // Declare an arc generator function
  var arc = d3.svg.arc().outerRadius(200);
  // function to view pie values
  var pie_tip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html(function (i) {
      return (
        // `AGE: ${new_data[i].age}-- PERCENTAGE :${new_data[i].value}%`
        `
      <br><strong> Percentage:</strong> <span style='color:red'>
      ${new_data[i].value}% 
      </span></br>
      <br><strong> Deaths:</strong> <span style='color:red'>
      ${new_data[i].deaths} 
      </span></br>
      `
      );
    });
  // Select paths, use arc generator to draw
  var arcs = vis
    .selectAll("g.slice")
    .data(pie)
    .enter()
    .append("svg:g")
    .attr("class", "slice");

  arcs
    .style("font-size", 12)
    .append("svg:path")
    .call(pie_tip)
    .on("mouseover", function (d, i) {
      pie_tip.show(i);
    })
    .on("mouseout", pie_tip.hide)
    .attr("fill", function (d, i) {
      return aColor[i % 10];
    })
    .attr("d", function (d) {
      return arc(d);
    });

  // Add the text
  arcs

    .append("svg:text")
    .attr("transform", function (d) {
      d.innerRadius = 100; /* Distance of label to the center*/
      d.outerRadius = r;
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text((d, i) => {
      return `   ${new_data[i].gender} 
       `;
    });
  arcs

    .append("svg:text")
    .attr("transform", function (d) {
      d.innerRadius = -100; /* Distance of label to the center*/
      d.outerRadius = r;
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text((d, i) => {
      return `   
       ${new_data[i].value}%`;
    });
}

function drawAge(data) {
  var aColor = [
    "rgb(235, 64, 52)",
    "rgb(192, 235, 52)",
    "rgb(32, 133, 34)",
    "rgb(155, 222, 177)",
    "rgb(77, 88, 148)",
    "rgb(194, 54, 154)",
    "rgb(230, 174, 185)",
    "rgb(36, 201, 50)",
    "rgb(186, 101, 20)",
    "rgb(33, 156, 181)",
  ];

  var total = data.reduce(function (acc, element, index, array) {
    return acc + parseInt(element.deaths);
  }, 0);

  var new_data = data.map(function (element, index, array) {
    return {
      ...element,
      value: ((parseInt(element.deaths) / total) * 100).toFixed(2),
      
    };
  });

  var d = 400;
  var h = 400;
  var r = h / 2;

  var vis = d3
    .select("#age_range")
    .append("svg:svg")
    .data([new_data])
    .attr("width", d)
    .attr("height", h)
    .append("svg:g")
    .attr("transform", "translate(" + r + "," + r + ")");

  var pie = d3.layout.pie().value(function (d) {
    return d.value;
  });

  // Declare an arc generator function
  var arc = d3.svg.arc().outerRadius(200);
  // function to view pie values
  var pie_tip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html(function (i) {
      return (
        // `AGE: ${new_data[i].age}-- PERCENTAGE :${new_data[i].value}%`
        `<br><strong> Age:</strong> <span style='color:red'> 
      ${new_data[i].age} 
      </span></br>
      <br><strong> Percentage:</strong> <span style='color:red'>
      ${new_data[i].value}% 
      </span></br>
      <br><strong> Deaths:</strong> <span style='color:red'>
      ${new_data[i].deaths} 
      </span></br>
      `
      );
    });
  // Select paths, use arc generator to draw
  var arcs = vis
    .selectAll("g.slice")
    .data(pie)
    .enter()
    .append("svg:g")
    .attr("class", "slice");

  arcs
    .style("font-size", 12)
    .append("svg:path")
    .call(pie_tip)
    .on("mouseover", function (d, i) {
      pie_tip.show(i);
    })
    .on("mouseout", pie_tip.hide)
    .attr("fill", function (d, i) {
      return aColor[i % 10];
    })
    .attr("d", function (d) {
      return arc(d);
    });

  // Add the text
  arcs

    .append("svg:text")
    .attr("transform", function (d) {
      d.innerRadius = 100; /* Distance of label to the center*/
      d.outerRadius = r;
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")

    .text((d, i) => {
      return `${new_data[i].value}%`;
    });
}



