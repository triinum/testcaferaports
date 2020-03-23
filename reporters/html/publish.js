const { zip } = require('zip-a-folder')
let path = require('path')
let exec = require('child_process').exec

let zipPath = path.join('./raportizip/raport.zip')

class ZipAFolder
{
  static async main() {
    await zip(path.join('./reports/combined'), zipPath)
  }
}
ZipAFolder.main()


let host = process.env.HOST
let hostPath = `/home/wwwroot/${host}`
exec(`scp ${zipPath} root@${host}:~/docs.zip && ssh root@${host} 'unzip ~/docs.zip -d ${hostPath} && chown -R www:www ${hostPath}' && exit`, () => {
  console.log('Raporti zip loodud!')
})