const fs = require('fs')

export class FileReader {
  getContent(filepath) {
    return fs.readFileSync(filepath)
  }
}

export class CSVReader {
  constructor(fileReader) {
    this.fileReader = fileReader
  }

  getContent(filepath) {
    const content = this.fileReader.getContent(filepath)
    return
  }
}
