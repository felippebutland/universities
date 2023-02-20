import {
    BusinessError,
    ConflictError,
    DomainNotFoundError,
    PropertyRequiredError,
    PropertyInvalidValueError,
    PropertiesInvalidValueError,
    PermissionDeniedError,
    UnauthorizedError,
    InternalServerError
} from "../errors";
import { HttpStatusCode } from "../enums/http-status-code-enums";
import {Request, Response} from "express";
import RouteParser from "../parser/route-parser";

export function errorHandler(error: Error, request: Request, response: Response) {
    const meta = {
        labels: {
            route: RouteParser.parseUrl(request.url),
            url: request.url,
        },
    };

    if (error instanceof PropertyRequiredError) {
        console.warn(error.stack, meta);
        return response.status(HttpStatusCode.BadRequest).json({ error: error.message, ...error.objectResponse });
    }

    if (error instanceof DomainNotFoundError) {
        console.warn(error.stack, meta);
        return response.status(404).json({ error: error.message, ...error.objectResponse });
    }

    if (error instanceof BusinessError) {
        console.warn(error.stack, meta);
        return response
            .status(HttpStatusCode.UnprocessableEntity)
            .json({ error: error.message, ...error.objectResponse });
    }

    if (error instanceof PropertyInvalidValueError) {
        console.warn(error.stack, meta);
        return response.status(HttpStatusCode.BadRequest).json({ error: error.message, ...error.objectResponse });
    }
    if (error instanceof PropertiesInvalidValueError) {
        console.warn(error.stack, meta);
        return response.status(HttpStatusCode.BadRequest).json({ errors: error.errorMessages });
    }

    if (error instanceof PermissionDeniedError) {
        console.warn(error.stack, meta);
        return response.status(HttpStatusCode.Forbidden).json({ error: error.message, ...error.objectResponse });
    }

    if (error instanceof UnauthorizedError) {
        console.warn(error.stack, meta);
        return response.status(HttpStatusCode.Unauthorized).json({ error: error.message, ...error.objectResponse });
    }
    if (error instanceof InternalServerError) {
        console.error(error.stack, meta);
        return response.status(HttpStatusCode.InternalServer).json({ error: error.message });
    }

    if (error instanceof ConflictError) {
        console.warn(error.stack, meta);
        return response.status(HttpStatusCode.Conflict).json({ error: error.message });
    }

    console.error(error.stack, meta);
    return response.status(500).json({ error: "Ops! Ocorreu um erro interno." });
}
