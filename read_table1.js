const axios = require('axios');
const fs = require('fs');

axios.get('https://serenesforest.net/path-of-radiance/characters/base-stats/')
    .then(response => {
        const data = response.data;
        fs.writeFile('\output_table1_0.txt', data, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Data saved to file output.txt');
            }
        });
    })
    .catch(error => {
        console.error('Error fetching the data:', error);
    });

// 读取文件
fs.readFile('\output_table1_0.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // 将文件内容按行分割
    const lines = data.split('\n');

    // 选取第497行到第1799行
    const selectedLines = lines.slice(489, 1310); // 数组索引从0开始

    // 将选定的行组合成一个新的字符串
    const extractedData = selectedLines.join('\n');

    // 写入到新文件
    fs.writeFile('\output_table1_1.txt', extractedData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Extracted data saved to output.txt');
        }
    });
});

// 读取文件
fs.readFile('\output_table1_1.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error('Error reading the file:', err);
    }

    // 使用正则表达式匹配每个 <tr>...</tr> 内的所有 <td>...</td>
    const regex = /<tr>(.*?)<\/tr>/gs;
    let result = '';
    let match;

    // 循环匹配所有符合的行
    while ((match = regex.exec(data)) !== null) {
        // 去除<td>和</td>，并把内容用空格连接
        let rowData = match[1].replace(/<td>/g, '').replace(/<\/td>/g, '|').trim();

        // 替换 '&#8211;' 为 'Null'
        rowData = rowData.replace(/&#8211;/g, 'Null').split(/\s+/).join('');
        // 将处理好的行添加到结果字符串
        if (!rowData.includes('"') && !rowData.includes('<')) {
            // 如果不包含，则将行添加到结果字符串
            result += rowData + '\n';
        }

    }

    // 将结果写入新文件
    fs.writeFile('\ formatted_output_table1.txt', result.trim(), (err) => {
        if (err) {
            return console.error('Error writing to file:', err);
        }
        console.log('Formatted data saved to formatted_output.txt');
    });
});
