jQuery(document)
		.ready(
				function() {
					document.getElementById("interactivec3").style.display = "none";

					value = "kallisto";

					var kallistodata = "<option>target_id</option>"
							+ "<option>length</option>"
							+ "<option>eff_length</option>"
							+ "<option>est_counts</option>"
							+ "<option>TPM</option>"
							+ "<option>gccontent</option>";
					var sailfishdata = "<option>Name</option>"
							+ "<option>Length</option>"
							+ "<option>TPM</option>"
							+ "<option>NumReads</option>"
							+ "<option>gccontent</option>";
					var rsemdata = "<option>transcript_id</option>"
							+ "<option>gene_id</option>"
							+ "<option>length</option>"
							+ "<option>effective_length</option>"
							+ "<option>expected_count</option>"
							+ "<option>TPM</option>" + "<option>FPKM</option>"
							+ "<option>IsoPct</option>"
							+ "<option>gccontent</option>";

					var kallistoaggrdata = "<option>length</option>"
							+ "<option>eff_length</option>";
					var sailfishaggrdata = "<option>Length</option>"
							+ "<option>NumReads</option>";
					var rsemaggrdata = "<option>length</option>"
							+ "<option>effective_length</option>";

					var kallistomeasure = "<option>est_counts</option>"
							+ "<option>TPM</option>";
					var sailfishmeasure = "<option>NumReads</option>"
							+ "<option>TPM</option>";
					var rsemmeasure = "<option>expected_count</option>"
							+ "<option>TPM</option>";

					$('input[type="checkbox"][id="aggregate"]')
							.change(
									function() {
										if (this.checked) {
											document.getElementById("yaxis").disabled = true;
											$("#xaxis").empty();
											if (value == "kallisto")
												$('select[id="xaxis"]').append(
														kallistoaggrdata);
											else if (value == "rsem_quant")
												$('select[id="xaxis"]').append(
														rsemaggrdata);
											else if (value == "sailfish")
												$('select[id="xaxis"]').append(
														sailfishaggrdata);

										} else {
											document.getElementById("yaxis").disabled = false;
											$("#xaxis").empty();
											if (value == "kallisto")
												$('select[id="xaxis"]').append(
														kallistodata);
											else if (value == "rsem_quant")
												$('select[id="xaxis"]').append(
														rsemdata);
											else if (value == "sailfish")
												$('select[id="xaxis"]').append(
														sailfishdata);
										}
									});

					$("#pearson")
							.click(
									function() {
										document.getElementById("titleandfilter").style.display = "none";
										document.getElementById("datatable").style.display = "none";
										document.getElementById("measurefilter").style.display = "block";
										document.getElementById("datachart").style.display = "block";
										$("#measureheading").text("Pearson Correlation");
									});
					
					$("#spearman")
					.click(
							function() {
								document.getElementById("titleandfilter").style.display = "none";
								document.getElementById("datatable").style.display = "none";
								document.getElementById("measurefilter").style.display = "block";
								document.getElementById("datachart").style.display = "block";
								$("#measureheading").text("Spearman Correlation");
							});
					
					$("#spearman")
					.click(
							function() {
								document.getElementById("titleandfilter").style.display = "none";
								document.getElementById("datatable").style.display = "none";
								document.getElementById("measurefilter").style.display = "block";
								document.getElementById("datachart").style.display = "block";
								$("#measureheading").text("Mean Absolute Error");
							});
					
					$("#meanabsoluteerror")
					.click(
							function() {
								document
										.getElementById("titleandfilter").style.display = "none";
								document.getElementById("datachart").style.display = "none";
								document.getElementById("datatable").style.display = "none";
								document
										.getElementById("measurefilter").style.display = "block";
								document.getElementById("interactivefilter").style.display = "none";
								$("#measureheading").text("Mean Absolute Error");
							});
					
					$("#seqnum")
					.click(
							function() {
								document
										.getElementById("titleandfilter").style.display = "none";
								document.getElementById("datachart").style.display = "none";
								document.getElementById("datatable").style.display = "none";
								document
										.getElementById("measurefilter").style.display = "none";
								document.getElementById("interactivefilter").style.display = "block";
								$("#interactiveheading").text("SeqNum Interactive Plot");
							});
					

					$("#kallisto")
							.click(
									function() {
										document
												.getElementById("titleandfilter").style.display = "block";
										document.getElementById("datachart").style.display = "block";
										document.getElementById("datatable").style.display = "none";
										document
												.getElementById("measurefilter").style.display = "none";
										$("#mainheading").text("Kallisto");
										$("#datasizeinfo")
												.text(
														"Kallisto table has 86331 records in total.");
										value = "kallisto";
										$("#xaxis").empty();
										$("#yaxis").empty();
										$('select[id="xaxis"]').append(
												kallistodata);
										$('select[id="yaxis"]').append(
												kallistodata);
									});

					jQuery("#rsem")
							.click(
									function() {
										document
												.getElementById("titleandfilter").style.display = "block";
										document.getElementById("datachart").style.display = "block";
										document.getElementById("datatable").style.display = "none";
										document
												.getElementById("measurefilter").style.display = "none"
										$("#mainheading").text("Rsem");
										$("#datasizeinfo")
												.text(
														"Rsem table has 86090 records in total.");
										value = "rsem_quant";
										$("#xaxis").empty();
										$("#yaxis").empty();
										$('select[id="xaxis"]')
												.append(rsemdata);
										$('select[id="yaxis"]')
												.append(rsemdata);
									});

					jQuery("#sailfish")
							.click(
									function() {
										document
												.getElementById("titleandfilter").style.display = "block";
										document.getElementById("datachart").style.display = "block";
										document.getElementById("datatable").style.display = "none";
										document
												.getElementById("measurefilter").style.display = "none"
										$("#mainheading").text("Sailfish");
										$("#datasizeinfo")
												.text(
														"Sailfish table has 86331 records in total.");
										value = "sailfish";
										$("#xaxis").empty();
										$("#yaxis").empty();
										$('select[id="xaxis"]').append(
												sailfishdata);
										$('select[id="yaxis"]').append(
												sailfishdata);
									});

					$('#plot1').click(function() {
						linechart();
					});

					$('#tabletype').change(
							function() {
								$("#parameter").empty();
								measuretype = document
										.getElementById("tabletype").value;
								if (measuretype == "kallisto")
									$('select[id="parameter"]').append(
											kallistomeasure);
								else if (measuretype == "rsem_quant")
									$('select[id="parameter"]').append(
											rsemmeasure);
								else if (measuretype == "sailfish")
									$('select[id="parameter"]').append(
											sailfishmeasure);
							});
					
					$('#measuredropdown li a').click(
							function() {
								measurefunction = $(this).text();
							});
					$('#measure')
							.click(
									function() {
										var typeofdata = document
												.getElementById("tabletype").value;
										var typeparameter = document
												.getElementById("parameter").value;
										
										if(measurefunction == "Pearson Correlation")
											urlformeasure = 'http://52.34.77.204:3000/rnaseq/home/measures/pearson';
										else if(measurefunction == "Spearman Correlation")
											urlformeasure = 'http://52.34.77.204:3000/rnaseq/home/measures/spearman';
										else if(measurefunction == "Mean Absolute Error")
											urlformeasure = 'http://52.34.77.204:3000/rnaseq/home/measures/mae';
										
										if(typeparameter == "TPM")
											yaxismeasure = "LibFrac";
										else
											yaxismeasure = "SeqNum";
										
										if(typeofdata == "kallisto")
											primaryid = "target_id";
										else if(typeofdata == "rsem_quant")
											primaryid = "transcript_id";
										else if(typeofdata == "sailfish")
											primaryid = "Name";
										
										$
												.ajax({
													url : urlformeasure,
													data : {
														type : typeofdata,
														xaxis : typeparameter,
														yaxis : yaxismeasure,
														pid : primaryid
													},
													error : function() {
														alert("error");
													},
													success : function(data) {
														var stmt = measurefunction + " for " + typeparameter + " of " + typeofdata + " vs " + yaxismeasure + " of truth is " + "<b>"+data+"</b>";
														document.getElementById("measureinfodata").innerHTML = stmt;
													},
													type : 'GET'
												});

					
					$
					.ajax({
						url :  'http://52.34.77.204:3000/rnaseq/home/correlation/plot',
						data : {
							type : typeofdata,
							xaxis : typeparameter,
							yaxis : yaxismeasure,
							pid : primaryid
						},
						error : function() {
							alert("error");
						},
						success : function(data) {
							
							scatterchart(data, typeparameter, yaxismeasure,100,100,100,100);
						},
						type : 'GET'
					});

		});

					$('#plot')
							.click(
									function() {
										var x = document
												.getElementById("xaxis").value;
										if (document
												.getElementById("aggregate").checked == true)
											var y = "count";
										else
											var y = document
													.getElementById("yaxis").value;

										if (document
												.getElementById("transform").checked == true)
											var logtransform = "true";
										else
											var logtransform = "false";

										if (document
												.getElementById("charttype").value == "Scatter Chart") {
											$
													.ajax({
														url : 'http://52.34.77.204:3000/rnaseq/home/scatter',
														data : {
															xaxis : x,
															yaxis : y,
															type : value
														},
														error : function() {
															alert("error");
														},
														success : function(data) {
															var obj = JSON
																	.stringify(data);
															var res = obj
																	.split(",");
															xmin = res[0]
																	.split(":");
															ymin = res[1]
																	.split(":");
															xmax = res[2]
																	.split(":");
															ymax = res[3]
																	.split(":");
														},
														type : 'GET'
													});
										}

										$
												.ajax({
													url : 'http://52.34.77.204:3000/rnaseq/home',
													data : {
														xaxis : x,
														yaxis : y,
														type : value,
														offset : document
																.getElementById("startrange").value,
														range : document
																.getElementById("noofrecords").value,
														aggregate : document
																.getElementById("aggregate").checked,
														transform : logtransform
													},
													error : function() {
														alert("error");
													},
													success : function(data) {
														if (document
																.getElementById("charttype").value == "Line Chart")
															linechart(data,x,y);
														else if (document
																.getElementById("charttype").value == "Bar Chart")
															barchart(data, x, y);
														else if (document
																.getElementById("charttype").value == "Scatter Chart")
															scatterchart(data,
																	x, y,
																	xmin[1],
																	ymin[1],
																	xmax[1],
																	ymax[1]);
													},
													type : 'GET'
												});
									});

					$('#kallistodata')
							.click(
									function() {
										document
												.getElementById("titleandfilter").style.display = "none";
										document.getElementById("datachart").style.display = "none";
										document.getElementById("datatable").style.display = "block";
										document
												.getElementById("measurefilter").style.display = "none"
										$("#heading").text("Kallisto Data");
										$("#secondheading").text("Kallisto Statistics");
										$
												.ajax({
													url : 'http://52.34.77.204:3000/rnaseq/search',
													data : {
														type : "kallisto",
													},
													error : function() {
														alert("error");
													},
													success : function(data) {
														var finalarr = [];
														for (var key = 0; key < data.length; key++) {
															finalarr
																	.push($
																			.map(
																					data[key],
																					function(
																							el) {
																						return el
																					}));
														}
														$('#example')
																.DataTable(
																		{
																			data : finalarr,
																			columns : [
																					{
																						title : "target_id"
																					},
																					{
																						title : "length"
																					},
																					{
																						title : "eff_length"
																					},
																					{
																						title : "est_counts"
																					},
																					{
																						title : "TPM"
																					},
																					{
																						title : "gccontent"
																					}, ]
																		});
													},
													type : 'GET'
												});
										
										$
										.ajax({
											url : 'http://52.34.77.204:3000/rnaseq/home/stats',
											data : {
												type : "kallistostats",
											},
											error : function() {
												alert("error");
											},
											success : function(data) {
												var finalarr = [];
												for (var key = 0; key < data.length; key++) {
													finalarr
															.push($
																	.map(
																			data[key],
																			function(
																					el) {
																				return el
																			}));
												}
												$('#accumulated')
														.DataTable(
																{
																	data : finalarr,
																	columns : [
																			{
																				title : "parameter"
																			},
																			{
																				title : "length"
																			},
																			{
																				title : "eff_length"
																			},
																			{
																				title : "est_counts"
																			},
																			{
																				title : "TPM"
																			},
																			{
																				title : "gccontent"
																			}, ]
																});
											},
											type : 'GET'
										});
									});

					$('#rsemdata')
							.click(
									function() {
										document
												.getElementById("titleandfilter").style.display = "none";
										document.getElementById("datachart").style.display = "none";
										document.getElementById("datatable").style.display = "block";
										document
												.getElementById("measurefilter").style.display = "none"
										$("#heading").text("Rsem Data");
										$("#secondheading").text("Rsem Statistics");
										$
												.ajax({
													url : 'http://52.34.77.204:3000/rnaseq/search',
													data : {
														type : "rsem_quant",
													},
													error : function() {
														alert("error");
													},
													success : function(data) {
														var finalarr = [];
														for (var key = 0; key < data.length; key++) {
															finalarr
																	.push($
																			.map(
																					data[key],
																					function(
																							el) {
																						return el
																					}));
														}
														$('#example')
																.DataTable(
																		{
																			data : finalarr,
																			columns : [
																					{
																						title : "transcript_id"
																					},
																					{
																						title : "gene_id"
																					},
																					{
																						title : "length"
																					},
																					{
																						title : "effective_length"
																					},
																					{
																						title : "expected_count"
																					},
																					{
																						title : "TPM"
																					},
																					{
																						title : "FPKM"
																					},
																					{
																						title : "IsoPct"
																					},
																					{
																						title : "gccontent"
																					}, ]
																		});
													},
													type : 'GET'
												});
										
										$
										.ajax({
											url : 'http://52.34.77.204:3000/rnaseq/home/stats',
											data : {
												type : "rsemstats",
											},
											error : function() {
												alert("error");
											},
											success : function(data) {
												var finalarr = [];
												for (var key = 0; key < data.length; key++) {
													finalarr
															.push($
																	.map(
																			data[key],
																			function(
																					el) {
																				return el
																			}));
												}
												$('#accumulated')
														.DataTable(
																{
																	data : finalarr,
																	columns : [
																			{
																				title : "parameter"
																			},
																			{
																				title : "length"
																			},
																			{
																				title : "effective_length"
																			},
																			{
																				title : "expected_count"
																			},
																			{
																				title : "TPM"
																			},
																			{
																				title : "FPKM"
																			},
																			{
																				title : "IsoPct"
																			},
																			{
																				title : "gccontent"
																			}, ]
																});
											},
											type : 'GET'
										});
									});

					$('#sailfishdata')
							.click(
									function() {
										document
												.getElementById("titleandfilter").style.display = "none";
										document.getElementById("datachart").style.display = "none";
										document.getElementById("datatable").style.display = "block";
										document
												.getElementById("measurefilter").style.display = "none"
										$("#heading").text("Sailfish Data");
										$("#secondheading").text("Sailfish Statistics");
										$
												.ajax({
													url : 'http://52.34.77.204:3000/rnaseq/search',
													data : {
														type : "sailfish",
													},
													error : function() {
														alert("error");
													},
													success : function(data) {
														var finalarr = [];
														for (var key = 0; key < data.length; key++) {
															finalarr
																	.push($
																			.map(
																					data[key],
																					function(
																							el) {
																						return el
																					}));
														}
														$('#example')
																.DataTable(
																		{
																			data : finalarr,
																			columns : [
																					{
																						title : "Name"
																					},
																					{
																						title : "Length"
																					},
																					{
																						title : "TPM"
																					},
																					{
																						title : "NumReads"
																					},
																					{
																						title : "gccontent"
																					}, ]
																		});
													},
													type : 'GET'
												});
										
										$
										.ajax({
											url : 'http://52.34.77.204:3000/rnaseq/home/stats',
											data : {
												type : "sailfishstats",
											},
											error : function() {
												alert("error");
											},
											success : function(data) {
												var finalarr = [];
												for (var key = 0; key < data.length; key++) {
													finalarr
															.push($
																	.map(
																			data[key],
																			function(
																					el) {
																				return el
																			}));
												}
												$('#accumulated')
														.DataTable(
																{
																	data : finalarr,
																	columns : [
																			{
																				title : "parameter"
																			},
																			{
																				title : "Length"
																			},
																			{
																				title : "TPM"
																			},
																			{
																				title : "NumReads"
																			},
																			{
																				title : "gccontent"
																			}, ]
																});
											},
											type : 'GET'
										});
									});

					function scatterchart(data, x, y, xmin, ymin, xmax, ymax) {
						var chart = AmCharts.makeChart("chartdiv", {
							"type" : "xy",
							"theme" : "light",
							"autoMarginOffset" : 20,
							"dataProvider" : data,
							"valueAxes" : [ {
								"position" : "bottom",
								"axisAlpha" : 0,
								"dashLength" : 1,
								"title" : x
							}, {
								"axisAlpha" : 0,
								"dashLength" : 1,
								"position" : "left",
								"title" : y
							} ],
							"startDuration" : 1,
							"graphs" : [ {
								"balloonText" : "x:[[x]] y:[[y]]",
								"bullet" : "triangleUp",
								"lineAlpha" : 0,
								"xField" : x,
								"yField" : y,
								"lineColor" : "#FF6600",
								"fillAlphas" : 0
							} ],
							"trendLines" : [ {
								"finalValue" : parseFloat(ymax),
								"finalXValue" : parseFloat(xmax),
								"initialValue" : parseFloat(ymin),
								"initialXValue" : parseFloat(xmin),
								"lineColor" : "#FF6600"
							} ],
							"marginLeft" : 64,
							"marginBottom" : 60,
							"chartScrollbar" : {},
							"chartCursor" : {},
							"export" : {
								"enabled" : true,
								"position" : "bottom-right"
							}
						});
					}

					function barchart(data, x, y) {

						var chart = AmCharts
								.makeChart(
										"chartdiv",
										{
											"type" : "serial",
											"theme" : "light",
											"dataProvider" : data,
											"gridAboveGraphs" : true,
											"startDuration" : 1,
											"graphs" : [ {
												"balloonText" : "[[category]]: <b>[[value]]</b>",
												"fillAlphas" : 0.8,
												"lineAlpha" : 0.2,
												"type" : "column",
												"valueField" : y
											} ],
											"chartCursor" : {
												"categoryBalloonEnabled" : false,
												"cursorAlpha" : 0,
												"zoomable" : false
											},
											"categoryField" : x,
											"categoryAxis" : {
												"gridPosition" : "start",
												"gridAlpha" : 0,
												"tickPosition" : "start",
												"tickLength" : 20
											},
											"export" : {
												"enabled" : true
											}

										});

					}

					function linechart(data,x,y) {
						var line = AmCharts
								.makeChart(
										"chartdiv",
										{
											"type" : "serial",
											"theme" : "light",
											"marginRight" : 80,
											"autoMarginOffset" : 20,
											"dataDateFormat" : "YYYY-MM-DD",
											"valueAxes" : [ {
												"id" : "v1",
												"axisAlpha" : 0,
												"position" : "left"
											} ],
											"balloon" : {
												"borderThickness" : 1,
												"shadowAlpha" : 0
											},
											"graphs" : [ {
												"id" : "g1",
												"bullet" : "round",
												"bulletBorderAlpha" : 1,
												"bulletColor" : "#FFFFFF",
												"bulletSize" : 5,
												"hideBulletsCount" : 50,
												"lineThickness" : 2,
												"title" : "red line",
												"useLineColorForBulletBorder" : true,
												"valueField" : y,
											} ],
											"valueAxes" : [ {
												"title" : y
											} ],
											"chartScrollbar" : {
												"graph" : "g1",
												"oppositeAxis" : false,
												"offset" : 30,
												"scrollbarHeight" : 80,
												"backgroundAlpha" : 0,
												"selectedBackgroundAlpha" : 0.1,
												"selectedBackgroundColor" : "#888888",
												"graphFillAlpha" : 0,
												"graphLineAlpha" : 0.5,
												"selectedGraphFillAlpha" : 0,
												"selectedGraphLineAlpha" : 1,
												"autoGridCount" : true,
												"color" : "#AAAAAA"
											},
											"chartCursor" : {
												"pan" : true,
												"valueLineEnabled" : true,
												"valueLineBalloonEnabled" : true,
												"cursorAlpha" : 0,
												"valueLineAlpha" : 0.2,
											},
											"categoryField" : x,
											"categoryAxis" : {
												"parseDates" : false,
												"dashLength" : 1,
												"minorGridEnabled" : true,
												"title" : x,
												"labelRotation" : 0
											},
											"export" : {
												"enabled" : true
											},
											"dataProvider" : data
										});

						chart.addListener("rendered", zoomChart);

						zoomChart();
						function zoomChart() {
							chart.zoomToIndexes(chart.dataProvider.length - 40,
									chart.dataProvider.length - 1);
						}

					}
					;

				});