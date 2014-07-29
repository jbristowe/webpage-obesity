function createCharts() {

  var tooltipTemplate = "#= (value / 1000)|0 # KB"; 

  var archiveDataSource = new kendo.data.DataSource({
    schema: {
      model: {
        fields: {
          Date: { type: "date" },
          HTML: { type: "number" },
          JS: { type: "number" },
          CSS: { type: "number" },
          GIF: { type: "number" },
          JPEG: { type: "number" },
          PNG: { type: "number" },
          Fonts: { type: "number" },
          Flash: { type: "number" },
          Other: { type: "number" },
          PageSpeed: { type: "number" }
        }
      }
    },
    sort: { field: "Date" },
    transport: {
      read: {
        url: "httparchive.json"
      }
    }
  });

  $("#archiveAreaChart").kendoChart({
    categoryAxis: {
      axisCrossingValues: [0, 1000],
      baseUnit: "months",
      field: "Date",
      labels: {
        rotation: -90,
        visible: true
      },
      majorGridLines: { visible: false }
    },
    chartArea: {
      height: 600
    },
    dataSource: archiveDataSource,
    series: [
      { field: "HTML", name: "HTML" },
      { field: "JS", name: "JavaScript" },
      { field: "CSS", name: "CSS" },
      { field: "GIF", name: "GIF" },
      { field: "JPEG", name: "JPEG" },
      { field: "PNG", name: "PNG" },
      { field: "Fonts", name: "Fonts" },
      { field: "Flash", name: "Flash" },
      { field: "Other", name: "Other" },
      {
        axis: "PageSpeed",
        field: "PageSpeed",
        markers: { visible: false },
        name: "PageSpeed",
        tooltip: {
          format: "{0}",
          template: "#= series.name #: #= value #",
          visible: true
        },
        type: "line",
        visibleInLegend: false
      }
    ],
    seriesDefaults: {
      area: {
        line: { style: "smooth" }
      },
      stack: true,
      type: "area"
    },
    theme: "bootstrap",
    tooltip: {
      format: "{0}",
      template: "#= series.name #: " + tooltipTemplate,
      visible: true
    },
    valueAxes: [
      {
        labels: {
          format: "{0}",
          template: "#= (value / 1000000) # MB"
        },
        name: "Bytes"
      },
      {
        name: "PageSpeed",
        labels: {
          visible: false
        }
      }]
  });
};

$(document).ready(function() {
  createCharts();
});