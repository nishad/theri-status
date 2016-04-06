                    function drawTable(data) {
                         for (var i = 0; i < data.length; i++) {
                         drawRow(data[i]);
                         }
                    }

                    function drawRow(rowData) {
                         var row = $("<tr />")
                         $("#countries").append(row);
                         row.append($("<td>" + rowData.code + "<\/td>"));
                         row.append($("<td>" + rowData.country + "<\/td>"));
                         row.append($("<td>" + rowData.requests + "<\/td>"));
                    }


                    $.getJSON( "https://api.rimpo.in/cloud/v3/status/?special=false&key=public&minimal=true&json=true&zone=theri.rimpo.in", {_: new Date().getTime()}, function(alldata) {
                    
                         console.log('JSON loaded');
                         
                         var visits = alldata['visits'];
                         var uniquesVRaw = [];
                         
                         for (var i in visits)
                         {
                              uniquesVRaw.push({date: moment(visits[i].time).toDate(), visits: visits[i].visitors });
                         }

                         var data = uniquesVRaw;
                         var tableData = alldata['countries'];

                         MG.data_graphic({
                              data: data,
                              right: 40,
                              area: false,
                              bottom: 60,
                              full_width: true,
                              height: 400,
                              target: '#visits',
                              x_accessor: 'date',
                              y_accessor: 'visits',
                              // color: '#8C001A',
                              color: '#000000',
                         });

                         console.log (alldata['timestamp']);

                         $("#bandwidth").text(filesize(alldata['bandwidth']));
                         $("#pageviews").text($.number(alldata['pageviews']));
                         $("#visitors").text($.number(alldata['visitors']));
                         $("#requests").text($.number(alldata['requests']));
                         $("#updatedon").text('Updated ' + moment(alldata['timestamp']).fromNow());
                         $("#title").text('Status for zone ' + alldata['zone']);
                         $("#origin-server").text(alldata['originstatus']);
                         $("#cdn-status").text(alldata['cdnstatus']);
                         $("#availability").text(alldata['availability']);
                         $("#realtimestamp").text('Time stamp : '+alldata['timestamp']);


                         drawTable(tableData);

                    });