const { error } = require('console');
const fs = require('fs');
const ytdl = require('ytdl-core');
const pathh = require('path');
const { TiktokDL } = require("@tobyg74/tiktok-api-dl")
const axios = require('axios');
const scdl = require('soundcloud-downloader').default
const client_id = 'RQW1CRxQZH1e1H1m3SFi4MpgSrOSikS'


const soundclouddownloader = async (data) => {
    const { url, title, path } = data

    if (!path) {
        if (!fs.existsSync('./files')) {
            fs.mkdirSync('./files', { recursive: true });
        }
    }

    scdl.getInfo(url, client_id)
        .then(info => {

            let outputDir = pathh.join(__dirname, `..`, `${path || './files'}`)
            let outputPath = pathh.join(outputDir, `${title || info.title}.mp3`)

            const stream = scdl.download(url, client_id).then(stream => stream.pipe(fs.createWriteStream(outputPath)))

            return stream
        })

}


const tiktokdowmloader = async (data) => {
    const { url, title, path } = data

    TiktokDL(url).then((result) => {

        if (result.status === 'error') {
            return console.error(`Invalid url`)
        }

        if (!path) {
            if (!fs.existsSync('./files')) {
                fs.mkdirSync('./files', { recursive: true });
            }
        }

        let outputDir = pathh.join(__dirname, `..`, `${path || './files'}`)
        let outputPath = pathh.join(outputDir, `${title || 'downloaded'}.mp4`)

        axios({
            method: 'GET',
            url: result.result.video[1],
            responseType: 'stream'
        })
            .then(response => {
                const stream = response.data.pipe(fs.createWriteStream(outputPath));
                console.log('Download completo!');
                return stream
            })
            .catch(error => {
                console.error('Ocorreu um erro durante o download:', error);
            });

    })
}

const ytdownloader = async (data) => {

    const { url, format, path, quality, title } = data

    let validate = ytdl.validateURL(url)

    if (!validate) {
        return console.error(`Invalid url`)
    }

    if (!url) {
        return console.error('URL is required')
    }

    if (!format) {
        return error('Format is required')
    }

    if (!path) {
        if (!fs.existsSync('./files')) {
            fs.mkdirSync('./files', { recursive: true });
        }
    }


    let info = await ytdl.getInfo(url)
    let titleOriginal = info.videoDetails.title.replace(/"/g, "_")
    let outputDir = pathh.join(__dirname, `..`, `${path || './files'}`)
    let outputPath = pathh.join(outputDir, `${title || titleOriginal}.${format}`)

    let formated;

    if (format === 'mp4') {
        formated = 'videoandaudio'
    } else if (format === 'mp3') {
        formated = 'audioonly'
    }


    const stream = ytdl(url, { filter: formated }, { quality: `${quality || 134}` })

    stream.pipe(fs.createWriteStream(outputPath))

    stream.on('end', () => {
        console.log(`completed download has been saved to: ${outputPath}`)
    })

    return stream;
};

module.exports.scdl = soundclouddownloader
module.exports.ttkdl = tiktokdowmloader
module.exports.ytdl = ytdownloader