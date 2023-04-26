Papa.parse('Countries.csv', {
    download: true,
    complete: function (results) {
        var data = results.data;
        displayDataImport(data);
        displayDataExport(data);
    }
});

function displayDataImport(data) {
    //console.log(data); 
    var container = document.getElementById('dropdownImport');
    var select = '<select>';
    for (var i = 0; i < data.length; i++) {
        select += '<option value="' + data[i][0] + '" id="my-options">' + data[i][0] + '</option>';
    }
    select += '</select>';
    container.innerHTML = select;
}

function displayDataExport(data) {
    //console.log(data); 
    var container = document.getElementById('dropdownExport');
    var select = '<select>';
    for (var i = 0; i < data.length; i++) {
        select += '<option value="' + data[i][0] + '" id="my-options">' + data[i][0] + '</option>';
    }
    select += '</select>';
    container.innerHTML = select;
}


document.getElementById("go-to-about").addEventListener("click", function () {
    document.getElementById("subhead").scrollIntoView({ behavior: 'smooth' });
});