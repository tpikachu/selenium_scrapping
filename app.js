const { Builder, By, Key, until } = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
const exporttocsv = require('./export_csv');
const scrape_cargoflights = require('./scrape_cargoflights');
const scrape_cargooffice = require('./scrape_cargooffice');

let o = new chrome.Options();
// o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
// o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });


(async function extract() {
	let driver = new Builder()
		.setChromeOptions(o)
		.forBrowser('chrome')
		.build();
	try {
		await scrape_cargoflights(driver);
		//await scrape_cargooffice(driver);
	} finally {
		await driver.quit();
	}
})();