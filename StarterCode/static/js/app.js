// Use this link to get the GeoJSON data.
let link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let result_object = null

// Getting our GeoJSON data
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data 
  // console.log(data)
  // get all samples (array of objects with id, otu_id array, sample_values array, etc)
  let samples = data['samples']
  // create an empty javascript object
  // structure will connect id to otu_ids and sample_values, eg:
  // {'940': {otu_ids:[array], sample_values:[array]},
  //  '943': {otu_ids:[array], sample_values:[array]}
  //}

  // foreach sample in samples:
  //    result_object[sample.id] = {'otu_ids':sample.otu_ids, 'sample_values':sample.sample_values}
  result_object = {}
  for (sample of samples){
    let id = sample.id
    let otu_ids = sample.otu_ids
    let otu_labels = sample.otu_labels
    let sample_values = sample.sample_values
    let labels = sample.metadata

    let entry = {'otu_ids':otu_ids, 'otu_labels': otu_labels, 'sample_values':sample_values}
    result_object[id] = entry
  }

  //let labels = Object.keys(sample.metadata)
  let names = Object.keys(result_object)
  //let names = samples.map(item => item.id)
  //otu_ids = samples.map(item => item.otu_ids)
  //sample_values = samples.map(item => item.sample_values)
  // let otu_labels = samples.map(item => item.otu_labels)
  //console.log(samples)
  //console.log(otu_ids)
  //console.log(sample_values)
  //console.log(otu_labels)
  //console.log(otu_ids)


  d3.select("#selDataset").append("option")
    .attr("value", "")
    .text("please pick a patient");

  d3.select("#selDataset").selectAll("option")
    .data(names)
    .enter().append("option")
    .attr("value", function(d) {return d;})
    .text(function(d) {return "patient id"+d;});

});
 
function optionChanged(value){
  console.log("selcted", value)
  let entry = result_object[value]
  console.log(entry)
  let otu_ids = entry.otu_ids
  let otu_labels = entry.otu_labels
  let sample_values = entry.sample_values

  otu_ids.splice(10)
  otu_labels.splice(10)
  sample_values.splice(10)
  
  let yLabels = otu_ids.map((id) => `OTU ${id}`);

  console.log("X=", otu_ids)
  console.log("Y=", sample_values)
  console.log("Hovertext=", otu_labels)

  //let topotu_ids = otu_ids[10]
  //let topsample_values = sample_values[10]

  let bar = {
    type: 'bar',
    orientation: 'h',
    x: sample_values,
    y: yLabels,
    text: otu_labels,
    hovertemplate: '%{text}'
  }
  

  let layout = {
    title: 'Belly Button Measurements for patient',
    xaxis: {title: ''},
    yaxis: {title: '', autorange: 'reversed'}
  };

  let data = [bar]

  Plotly.newPlot("bar", data, layout);


   let scatter = {
     x: otu_ids,
     y: sample_values,
     text: otu_labels,
     size: sample_values,
     color: otu_ids,
     type: 'scatter'
   }

  let data3 = [scatter];

  Plotly.newPlot("bubble", data3);

}


