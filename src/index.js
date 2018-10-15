const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const calcSize = function(dir, filelist, callback) {
    const files = fs.readdirSync(dir);

    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = calcSize(dir + file + '/', filelist);
        }
        else {
            filelist.push(file);
        }
    });

    callback && callback();

    return filelist;
};

exec('npm ls', (err, stdout, stderr) => {
    const packages = [];

    stdout.split('\n').map((line, key) => {
        const packageString = line.match(/@*[a-z0-9-]*@\d+\.\d+\.\d+/g);

        if (packageString) {
            const versionPositionInLine = packageString[0].search(/@\d+\.\d+\.\d+/g);
            const packageName = packageString[0].substring(0, versionPositionInLine);
            const packageVersion = packageString[0].substring(versionPositionInLine + 1);
            const pathPackage = path.resolve(__dirname, 'node_modules', packageName) + '\\';
            let sizePackage = 0;

            try {
                calcSize(pathPackage).forEach((fileName) => {
                    const stats = fs.statSync(path.join(pathPackage, fileName));

                    const size = stats ? stats.size : 0;
                    sizePackage += size;
                });
            } catch(e) {
                // console.log(e)
            }
            
            packages.push({
                id: key,
                name: packageName,
                version: packageVersion,
                size: sizePackage,
                dependencies: []
            });
        }
    });

    return packages;
});


