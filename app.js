const vulns = require('./vulns.json').vulns
const request = require('request')

/**
 * COLORS
 */
const B_RED = '\x1b[41m'
const RESET = '\x1b[0m'
const B_YELLOW = '\x1b[43m'
const B_GREEN = '\x1b[42m'

/**
 * URL ARG
 */
const url = process.argv[2]

try {
    if(!url) throw 'Provide a url!'

    console.log(B_GREEN, `Scanning ${url}... \n`)

    vulns.forEach((v) => {
        let dynUrl = `${url}/wp-content/${v.iname}/`
        request(dynUrl, function (error, response, body) {
            if (response.statusCode === 200) {
                console.log(B_YELLOW,`[ ALERT ] Vulnerability discovered at ${dynUrl} | Plugin: ${v.name} | Vulnerability Type: ${v.vuln_type}`, RESET)
            }
        })
    })

} catch(ex){
    console.log(B_RED,`[ ERROR ] ${ex}`,RESET)
}
