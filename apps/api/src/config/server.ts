const DEFAULT_PORT = 9000;

export const resolveServerPort = (portValue: string | undefined): number => {
  const parsedPort = Number(portValue);

  if (!Number.isInteger(parsedPort) || parsedPort <= 0) {
    return DEFAULT_PORT;
  }

  return parsedPort;
};
