function createCharts() {

  var tooltipTemplate = "#= (value / 1000)|0 # KB"; 

  var archiveDataSource = new kendo.data.DataSource({
    schema: {
      model: {
        fields: {
          FormattedDate: { type: "date" },
          HTML: { type: "number" },
          JS: { type: "number" },
          CSS: { type: "number" },
          GIF: { type: "number" },
          JPEG: { type: "number" },
          PNG: { type: "number" },
          Fonts: { type: "number" },
          Flash: { type: "number" },
          Other: { type: "number" }
        }
      }
    },
    sort: { field: "FormattedDate" },
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
      crosshair: {
        visible: true
      },
      field: "FormattedDate",
      labels: {
        rotation: -30
      },
      majorGridLines: { visible: false }
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
      { field: "Other", name: "Other" }
    ],
    seriesDefaults: {
      area: {
        line: { style: "smooth" }
      },
      stack: true,
      missingValues: "interpolate",
      type: "area"
    },
    theme: "bootstrap",
    tooltip: {
      shared: true,
      template: tooltipTemplate,
      visible: true
    },
    valueAxes: [{
      majorGridLines: { visible: false },
      majorTicks: { skip: 1 },
      labels: {
        format: "{0}",
        skip: 1,
        template: "#= (value / 1000000) # MB"
      },
      name: "Bytes"
    }]
  });
};

$(document).ready(function() {
  createCharts();
});

$(window).on("resize", function () {
    var windowWidth = $(window).width(),
        chart = $("#archiveAreaChart").data("kendoChart");

    if (windowWidth <= 320) {
      chart.setOptions({ categoryAxis: { labels: { step: 16 } } });
    } else if (windowWidth <= 480) {
      chart.setOptions({ categoryAxis: { labels: { step: 8 } } });
    } else if (windowWidth <= 960) {
      chart.setOptions({ categoryAxis: { labels: { step: 4 } } });
    } else if (windowWidth <= 2000) {
      chart.setOptions({ categoryAxis: { labels: { step: 2 } } });
    } else {
      chart.setOptions({ categoryAxis: { labels: { step: 1 } } });
    }

    chart.resize();
});