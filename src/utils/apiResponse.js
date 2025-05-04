export class ApiResponse {
    constructor({success = false, message = null, errorCode = null, errorMsg = null, debugError = null, ...rest}) {
        this.success = success;

        if (success && message !== null) this.message = message;
        if (!success) {
            const error = {};
            if (errorCode !== null) error.code = errorCode;
            if (errorMsg !== null) error.message = errorMsg;
            if (Object.keys(error).length) this.error = error;
            if (debugError !== null) this.debugError = debugError;
        }

        for (const [key, value] of Object.entries(rest)) {
            if (value !== null) this[key] = value;
        }
    }
}
