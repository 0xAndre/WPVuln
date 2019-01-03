const vulns = require('./vulns.json').vulns
const request = require('request')

/**
 * COLORS
 */
const RED = '\x1b[41m'
const RESET = '\x1b[0m'

/**
 * URL ARG
 */
const url = process.argv[2]

try {
    if(!url) throw 'Provide a url!'

    
    vulns.forEach((v) => {
        let dynUrl = `${url}/wp-content/${v.iname}/`
        request(dynUrl, function (error, response, body) {
            if (response.statusCode === 200) {
                console.log('Possivel vuln ' + v.name)
            }
        })
    })

} catch(ex){
    console.log(RED,`[ ERROR ] ${ex}`,RESET)
}
