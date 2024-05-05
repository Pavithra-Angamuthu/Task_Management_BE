export default function response(message, data, status = true, code) {
    return {
      message: message,
      data: data,
      status: status,
      code: code,
    };
  }