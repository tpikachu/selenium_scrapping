const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
	path: 'out.csv',
	header: [
		{ id: "FLIGHT_NUMBER", title: "FLIGHT_NUMBER" },
		{ id: "ORIGHIN", title: "ORIGHIN" },
		{ id: "DEST", title: "DEST" },
		{ id: "DATE", title: "DATE" },
		{ id: "DEP_TIME", title: "DEP_TIME" },
		{ id: "ARR_TIME", title: "ARR_TIME" },
		{ id: "STOPS", title: "STOPS" },
		{ id: "EQUIPMENT", title: "ORIGHIN" },
		{ id: "DAYS_OF_OP", title: "DAYS_OF_OP" },
		{ id: "EFF_FROM", title: "EFF_FROM" },
		{ id: "EFF_TO", title: "EFF_TO" },
		{ id: "TRANSIT_TIME", title: "TRANSIT_TIME" },
		{ id: "DISTANCE", title: "DISTANCE" },
		{ id: "ON_TIME", title: "ON_TIME" }
	]
});

async function exporttocsv(data) {
	console.log(data);
	await csvWriter
		.writeRecords(data)
		.then(() => console.log('The CSV file was written successfully'));
}


module.exports = exporttocsv;