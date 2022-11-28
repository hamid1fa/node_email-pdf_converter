const nodemailer = require("nodemailer");
const ejs = require('ejs');
// const pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const fs =require("fs");


var express = require('express');
var app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));



const client = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure:true,
    port:465,

    auth: {
        user: "noreply@bhiveworkspace.com",
        pass: "wpwsjacurahunsmp",
    }
});

(async () => {

const browser = await puppeteer.launch();
const page = await browser.newPage();
const html = fs.readFileSync(__dirname+'/views/index.ejs','utf-8');



await page.setContent(html, { waitUntil: 'domcontentloaded' });
await page.emulateMediaType('screen');

await page.pdf({
    path: 'result.pdf',
    printBackground: true,
    format: 'A4',
  });
  await browser.close();

});
// ejs.renderFile(__dirname+'/views/index.ejs',(err,data)=>{
//     if(err){
//         console.log(err)
//     }
//     else{

//     const pdf_doc = pdf.create(data).toFile("report.pdf",function(err,data){
//         if (err)
//     {
//         console.log("PDF conversion failed",err);
//     }
//     else{
//         console.log("PDF conversion success" );

//     }
//         });

        const credentials  = {
            from: "noreply@bhiveworkspace.com",
            to: "hamid@bhive.fund",
            subject: "Sending mail with EJS file.",
            text: "Test Email for nodemailer testing",
        attachments: [{
            filename: 'result.pdf',
            path: '/home/hamid/Pictures/node_email/result.pdf',
            contentType: 'application/pdf'
          }],
            

        };
        client.sendMail(credentials,(err,info)=>{
            if (err) {
             console.log(err);
             }
             else{
                 console.log("Mail sent",info.messageId,info.response)
             }
         });