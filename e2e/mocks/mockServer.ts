import { setupServer } from "msw/node"

import handlers from "@/e2e/mocks/handlers"

const mockServer = setupServer(...handlers)
export default mockServer