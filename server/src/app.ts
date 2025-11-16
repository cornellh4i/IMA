import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import { memberSchemas, alumniSchemas } from './swagger/schemas';
import { memberPaths, alumniPaths } from './swagger/paths';
import memberRoutes from "./routes/member";
import alumniRoutes from "./routes/alumni";

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'IMA API Documentation',
    version: '1.0.0',
    description: 'API documentation for the IMA project',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Development server',
    },
  ],
  paths: {
    ...memberPaths,
    ...alumniPaths,
  },
  components: {
    schemas: {
      ...memberSchemas,
      ...alumniSchemas,
    },
  },
};

const app = express();

app.use(cors());
app.use(express.json());

// Swagger docs route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/members", memberRoutes);
app.use("/api/alumni", alumniRoutes);

// Add new route models here

export default app;
