const axios = require('axios');
const fs = require('fs');
const prompt = require('prompt-sync')();
//url to get
axios.get('https://serenesforest.net/radiant-dawn/characters/availability/')
    .then(response => {
        let data = response.data;
        const lines = data.split('\n');

    // select which lines have the relevant data, for availibity data just do indvivual parts
        const selectedLines = lines.slice(529, 2806); 

        const extractedData = selectedLines.join('\n');
        
        const regex = /<tr>(.*?)<\/tr>/gs;
        let result = '';
        let match;

    
    while ((match = regex.exec(extractedData)) !== null) {

        let rowData = match[1].replace(/<td>/g, '').replace(/<\/td>/g, '|').trim();


        rowData = rowData.replace(/&#8211;/g, 'Null').split(/\s+/).join('');

       if (!rowData.includes('<th>')) {
            result += rowData + '\n';
        }

    }

    fs.writeFile('\ formatted_output_table1.txt', result.trim(), (err) => {
        if (err) {
            return console.error('Error writing to file:', err);
        }
        console.log('Formatted data saved to formatted_output.txt');
    });
    
    })
    .catch(error => {
        console.error('Error fetching the data:', error);
    });
    

   