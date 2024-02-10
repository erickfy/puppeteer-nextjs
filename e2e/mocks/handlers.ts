import { HttpResponse, http } from 'msw';

// import Factories from '@/e2e/mocks/factories';

// const {
//   issues,
//   orgs,
//   repos
// } = Factories()

const hostname = 'http://localhost:3000/api'

const handlers = [
  http.get(`${hostname}/user`, () => {
    return HttpResponse.json({
      id: '15d42a4d-1948-4de4-ba78-b8a893feaf45',
      firstName: 'John',
    })
  }),
  http.get(`${hostname}/hello`, () => {
    return HttpResponse.json({
      id: '15d42a4d-1948-4de4-ba78-b8a893feaf45',
      firstName: 'John',
      name: "Johan julio"
    })
  })
]

export default handlers