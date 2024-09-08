const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend Error!";
    const extraDetails = err.extraDetails || "Error from backend";
    
    const error = {
        status,
        message,
        extraDetails
    }
    
    next(err);
}

export default errorMiddleware;