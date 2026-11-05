const csvFile = document.getElementById("csvFile");
const convertBtn = document.getElementById("convertBtn");
const downloadBtn = document.getElementById("downloadBtn");
const jsonOutput = document.getElementById("jsonOutput");

let convertedJSON = "";

convertBtn.addEventListener("click", function () {

    const file = csvFile.files[0];

    if (!file) {
        alert("Please upload a CSV file first!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        const csvText = event.target.result.trim();

        const rows = csvText.split(/\r?\n/);

        const headers = rows[0].split(",").map(header => header.trim());

        const jsonArray = [];

        for (let i = 1; i < rows.length; i++) {

            const values = rows[i].split(",");

            const obj = {};

            headers.forEach((header, index) => {
                obj[header] = values[index]?.trim() || "";
            });

            jsonArray.push(obj);
        }

        convertedJSON = JSON.stringify(jsonArray, null, 4);

        jsonOutput.value = convertedJSON;

        downloadBtn.disabled = false;

        alert("CSV successfully converted to JSON!");
    };

    reader.readAsText(file);

});

downloadBtn.addEventListener("click", function () {

    const blob = new Blob([convertedJSON], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "converted.json";

    link.click();

    URL.revokeObjectURL(url);

});