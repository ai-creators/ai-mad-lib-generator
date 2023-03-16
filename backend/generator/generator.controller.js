//controller file for interacting with openapi generator

import { Request, Response } from 'express';
import { OpenAPIGenerator } from './generator.service';

export class GeneratorController {
    public async generate(req: Request, res: Response) {
        const generator = new OpenAPIGenerator();
        const result = await generator.generate(req.body);
        res.send(result);
    }
    }

