const fs = require('fs')
const yaml = require('js-yaml')


export class FileReader {
  getContent(filepath){
      const file = fs.readFileSync(filepath, 'utf8')
      console.log(file)
    return file
  }
}


export class YAMLReader {
  constructor(fileReader){
    this.fileReader = fileReader
  }

  getContent(filepath){
    const content = this.fileReader.getContent(filepath)
    const result = yaml.safeLoad(content)
    return result
  }
}