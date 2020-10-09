
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Tesseract
 const { createWorker } = require('tesseract.js');
//Tesseract Threads
const worker = createWorker({
    //cacheMethod: 'refresh',
    logger: m => console.log(m), // log Information
  });


// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  // Init Upload
  const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
  }).single('myImage');
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed  this extension ext 
    const filetypes = /jpeg|jpg/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mimetype
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  };

exports.proccess = (req, res) => {
upload(req, res, (err) => {

    if(err){
        res.status(400).send({
            message: "Error: JPEG or JPG Images Only!"
          });
    } else {

        if (!req.body) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
      } else {

        (async () => {
            await worker.load();
            await worker.loadLanguage('fra');
            await worker.initialize('fra');
            await worker.setParameters({
                tessedit_char_whitelist: 'abcdefghijklmnopqrstuôêèùçvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/°<.N°No é-à',
                user_defined_dpi: '300',    
                });
                const { data: { text } } = await worker.recognize(`./uploads/${req.file.filename}`);
                console.log(text);
              var donnee = text.split('\n');
              donnee = donnee.filter(item => item !== '');
              console.log("La Taille du tableau est: "+donnee.length);
              console.log(donnee);
              await worker.terminate();
              return res.status(200).send(donnee);
            })();
      }
    }
});
};