const vulns = require('./vulns.json').vulns
const request = require('request')

/**
 * COLORS
 */
const B_RED = '\x1b[41m'
const RESET = '\x1b[0m'
const B_YELLOW = '\x1b[43m'
const B_GREEN = '\x1b[42m'
const P_RED = '\x1b[31m'

/**
 * URL ARG
 */
const url = process.argv[2]

/**
 * CORE
 */
header()
try {
    if (!url) throw 'Provide a url!'
    let vuln_count = 0
    let total = 0
    console.log(B_GREEN, `Scanning ${url}... \n`)

    vulns.forEach((v) => {
        let dynUrl = `${url}/wp-content/${v.iname}/`
        request(dynUrl, function (error, response, body) {
            if (response.statusCode === 200) {
                console.log(B_YELLOW, `[ ALERT ] Vulnerability discovered at ${dynUrl} | Plugin: ${v.name} | Vulnerability Type: ${v.vuln_type}`, RESET)
                vuln_count++
            }

            if (++total === vulns.length) {
                if (vuln_count === 0) {
                    console.log(B_GREEN, `[ OK ] No Vulnerabilities found!`, RESET)
                } else {
                    console.log(B_RED, `[ !!! ] Discovered ${vuln_count} Vulnerabilities!`, RESET)
                }
            }
        })
    })

} catch (ex) {
    console.log(B_RED, `[ ERROR ] ${ex}`, RESET)
}


/**
 * VISUALS
 */

 function header(){
     console.log(P_RED,`
     ###############################################################################################

                    >=>        >=> >======>   >=>         >=>           >=>           
                    >=>        >=> >=>    >=>  >=>       >=>            >=>           
                    >=>   >>   >=> >=>    >=>   >=>     >=>   >=>  >=>  >=> >==>>==>  
                    >=>  >=>   >=> >======>      >=>   >=>    >=>  >=>  >=>  >=>  >=> 
                    >=> >> >=> >=> >=>            >=> >=>     >=>  >=>  >=>  >=>  >=> 
                    >> >>    >===> >=>             >===>      >=>  >=>  >=>  >=>  >=> 
                    >=>        >=> >=>              >=>         >==>=> >==> >==>  >=>
    
    ###############################################################################################
    `, RESET, '\n')
 }