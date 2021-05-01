// File Upload imports
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const mongoose = require('mongoose');
const crypto = require('crypto');
require("dotenv").config();

// Initialize & Export GridFS
let gridFS;
mongoose.connection.once('open', () => {
    // Initialize the GridFS stream
    gridFS = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'fileUploads'
    });
});

// Initialize & Export Multer Storage Engine
const storageEngine = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(8, (err, buffer) => {
                if(err) return reject(err);
                const filename = new Date().toISOString().replace(".","-") + "." + buffer.toString('hex') + "." + req.session.uid + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'fileUploads'
                };
                return resolve(fileInfo);
            });
        });
    }
});
const uploadFiles = multer({ storage: storageEngine });
module.exports.uploadFiles = uploadFiles;

/**
 * This controller method handles file uploads.
 * @param {*} req 
 * @param {*} res 
 */
module.exports.handleUpload = async (req, res) => {
    res.status(200).json({
        success: true,
        file: req.files || req.file
    });
};

/**
 * This controller method handles file queries.
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getFile = async (req, res) => {
    try {
        const file = await gridFS.find({ _id: new mongoose.Types.ObjectId(req.params.fileID) });
        if(!file) {
            res.status(400).json({
                success: false,
                errors: [{
                    msg: "File not found."
                }]
            });
            return;
        }
    
        res.status(200).json({
            success: true,
            file: (await file.toArray())[0]
        });

    } catch(ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{
                msg: ex
            }]
        });
    }
};

/**
 * This controller method streams the requested file as a adownload stream.
 * @param {*} req 
 * @param {*} res 
 */
module.exports.streamFile = async (req, res) => {
    try {
        // Set correct headers
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", "attachment");

        gridFS.openDownloadStream(new mongoose.Types.ObjectId(req.params.fileID)).pipe(res);

    } catch(ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{
                msg: ex
            }]
        });
    }
}