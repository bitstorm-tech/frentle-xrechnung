import Fastify from 'fastify'
import { jsPDF } from 'jspdf'
import { randomUUID } from 'node:crypto'

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      }
    }
  }
})

fastify.get('/', async function handler(_request, reply) {
  const content = createPdf()

  reply
    .header('Content-Type', 'application/pdf')
    .header('Content-Disposition', `attachment; filename="${randomUUID()}.pdf"`);

  return content
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

async function createPdf() {
  const pdf = new jsPDF()
  pdf.text('Hallo PDF 1337', 20, 20)

  const response = await fetch('zugfert-template.xml')
  console.lor(response)

  return pdf.output()
}
