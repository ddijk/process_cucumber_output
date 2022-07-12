var fs = require('fs')

/**
  * Process Cucumber output file 'cucumber_report.json'
  */
let data = fs.readFileSync('cucumber_report.json');
let json = JSON.parse(data);
let scenarios = json[0].elements;
console.log(`Aantal scenarios is ${scenarios.length}`)

passed_scenarios = scenarios.filter(scen => scen.steps.every(e => e.result.status == 'passed'));
passed_scenario_names = passed_scenarios.map(scen => scen.name)
console.log(`Er zijn ${passed_scenarios.length} scenarios geslaagd`)
console.log(passed_scenario_names)
console.log('regel nummers van geslaagde scenarios:')

line_numbers = passed_scenarios.map(e => e.line)

console.log(line_numbers)

