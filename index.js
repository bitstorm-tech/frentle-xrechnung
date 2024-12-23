import Fastify from 'fastify'
import { jsPDF } from 'jspdf'
import fs from 'node:fs'

const dirname = 'tmp'

const fastify = Fastify({
  logger: true
})

if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname)
}

fastify.get('/', async function handler(request, reply) {
  const pdfFilename = createPdf()
  const xmlFilename = createXml()
  mergeXmlWithPdf(pdfFilename, xmlFilename)

  return { hello: 'world' }
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

function createPdf() {
  const pdf = new jsPDF()
  pdf.text('Hallo PDF', 10, 10)

  const filename = `${Date.now()}.pdf`
  pdf.save(`tmp/${filename}`)

  return filename
}

function createXml() {
  return ''
}

function mergeXmlWithPdf(pdfFilename, xmlFilename) { }
