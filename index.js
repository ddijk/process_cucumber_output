var fs = require('fs')

const yargs  = require('yargs')

const argv = yargs.option('debug', {
           alias: 'd',
           description: 'print debug logging',
           type: 'boolean'
         })
         .option('file', {
             alias: 'f',
             description: 'name of Cucumber Feature file whose "@Android" tags should be removed for passed tests (to disable them on next run)',
             type: 'string'
         })
         .help()
         .alias('help','h').argv

/**
  * Process Cucumber output file 'cucumber_report.json'
  */
let data = fs.readFileSync('reports/cucumber_report.json');
let json = JSON.parse(data);
let scenarios = json[0].elements;

if ( argv.debug ) console.log(`Aantal scenarios is ${scenarios.length}`)

passed_scenarios = scenarios.filter(scen => scen.steps.every(e => e.result.status == 'passed'));
passed_scenario_names = passed_scenarios.map(scen => scen.name)
if ( argv.debug ) console.log(`Er zijn ${passed_scenarios.length} scenarios geslaagd`)
if ( argv.debug ) console.log(passed_scenario_names)
if ( argv.debug ) console.log('regel nummers van geslaagde scenarios:')

line_numbers = passed_scenarios.map(e => e.line)
if ( argv.debug ) console.log(line_numbers);

const cucumberFeatureFile = argv.file || 'tempfile'

// output is 'sed' commands to delete '@Android' so this scenario is not run anymore
line_numbers.forEach(e => console.log(`sed -i '.bak' -e '${Number(e)-1}s/@Android//' ${cucumberFeatureFile}`))

