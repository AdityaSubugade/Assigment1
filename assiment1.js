const http = require('http');
const fs = require('fs');
const PORT = 2000;

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.writeHead(200, { 'Content-Type': 'Text/Html' });
        res.write("<!DOCTYPE html><html>")
        res.write("<head><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC' crossorigin='anonymous'></head>")
        res.write("<body><div class='container mt-5 text-center'><h1 class='text-dark'>ASSIGNMENT 1</h1>");
        res.write("<a class='btn btn-outline-primary mt-5' href='/createFile'>Create File</a><a class='btn btn-outline-danger mt-5 ms-2' href='/readFile' role='button'>Read File</a>")
        res.write("<a class='btn btn-outline-secondary mt-5 ms-2' href='/deleteFile' role='button'>Delete File</a>");
        res.write("<a class='btn btn-outline-success mt-5 ms-2' href='/append' role='button'>Append Data</a>")
        res.write("</div></body></html>");
        res.end()
    }
    //creatFile 
    else if (req.url == "/createFile") {
        if (fs.existsSync("neosoft.txt")) {
            res.write("<script>alert('file exist'); location.assign('/');</script>");
            res.end()
        }
        else {
            fs.writeFile('neosoft.txt', "Welcome to neosoft !", (err) => {
                if (err) throw err
                else {
            //alert Massage
                    res.write("<script>alert('File is Created'); location.assign('/');</script>");
                    res.end()
                }
            })
        }
    }
    //ReadFile
    else if (req.url == "/readFile") {
        if (fs.existsSync("neosoft.txt")) {
            let data = fs.readFileSync('neosoft.txt');
            res.write("<!DOCTYPE html><html>")
            res.write("<head><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC' crossorigin='anonymous'></head>")
            res.write("<body><div class='container mt-5 text-center'><h1 class='text-primary'>FILE DATA IS</h1>");
            res.write(`<p>${data.toString()}</p><a class='btn btn-outline-success mt-2 ms-2' href='/' role='button'>Go to Back</a>`)
           
            res.write("</div></body></html>");
            res.end();
        }
        else {
            //alert Massage
            res.write("<script>alert('file not exist'); location.assign('/');</script>");
            res.end()

        }
    }
    //DeleteFile
    else if (req.url == "/deleteFile") {
        if (fs.existsSync("neosoft.txt")) {
            fs.unlink("neosoft.txt", (err) => {
                if (err) throw err
                else {
                    res.write("<script>alert('File is Deleted'); location.assign('/');</script>");
                    res.end()
                }
            })
        }
        else {
            //alert Massage
            res.write("<script>alert('file not exist'); location.assign('/');</script>");
            res.end()

        }
    }
    //AppendData
    else if (req.url == "/append") {
        if (fs.existsSync("neosoft.txt")) {
            fs.appendFile("neosoft.txt", "Data is Added !", (err) => {
                if (err) throw err
                else {
            //alert Massage

                    res.write("<script>alert('Data is Updated'); location.assign('/');</script>");
            res.end()
                }
            })
        }
        else {
            //alert Massage

            res.write("<script>alert('file not exist plse creat a file'); location.assign('/');</script>");
            res.end()

        }
    }
})
server.listen(PORT, (err) => {
    if (err) throw err
    else console.log(`server work on ${PORT}`)
})
