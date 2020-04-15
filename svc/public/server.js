const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path')
const exampleYaml = path.join(__dirname, '../../data-imports/benefits-DE.yaml')

import { getProjectWithEmployees } from './api'
import { FileReader, YAMLReader } from './api/yamlReader'
// const { getProjectWithEmployees } = require('./api')

// CHAIN OF RESPONSIBILITY // pierwszy który obsłuży - zamyka temat
// middleware // każdy może coś dodać, ale tylko jeden może wysłać odpowiedź

// TODO: npmjs:yargs
const PORT = 3010

app.get('/', (req, res, next) => {
  res.send("facade")
  next() // podaj dalej
})

// app.get('/benefits', (req, res, next) => {
//   // 1. fetch data from localhost:3013 (benefit service)
//   axios.get('http://localhost:3013/benefits')
//     .then(response => res.send(response.data))
//   // res.send(benefits)
//   // 2. import data from files
// })

app.get('/benefits/:id', (req, res, next) => {
})

app.get('/projects/:id', async (req, res, next) => {
  const projectId = req.params.id
  console.log(`received request with projectId:${projectId}`)
  const project = await getProjectWithEmployees(projectId)
  res.status(200).send(project)
  console.log('tu bylem')

  next()
})

app.get('/benefits', async (req, res, next) => {
  let benefits = [];
  await axios.get('http://localhost:3013/benefits')
    .then(response => benefits = response.data)

  const fr = new FileReader()
  const yr = new YAMLReader(fr)
  const yaml = yr && yr.getContent(exampleYaml)

  const newBenefits = benefits.map(benefit => {
    yaml.forEach(item => {
      if(benefit.id === item.id) {
        benefit.beneficiary = item;
      }
    })
    return benefit;
  });

  res.status(200).send(newBenefits)
})

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`)
})
