const https = require('https');

async function getTitles(author){

    var host = 'https://jsonmock.hackerrank.com';
    var total_pages = 1;
    var titles = [];

    for (var page = 1; page <= total_pages; page++){
        var result = new Promise( (resolve, reject) => {
            https.get(host + '/api/articles?author='+author+'&page='+page, (data) => {
                var resp = "";
                data.on('data', (chunk) => {
                    resp += chunk;
                })
                data.on('end', () =>{
                    resolve(resp);
                })
                data.on('error', (err) => {
                    reject();
                })
            })
        });

        var response = await result;
        var response_obj = JSON.parse(response);
        response_obj.data.map( (t) => {
            titles.push(t.title);
        })

        if (page === 1){
            total_pages = response_obj.total_pages;
        }
    }

    return titles;
}


getTitles("epaga").then( (titles) => {
    console.log(titles);
} );


