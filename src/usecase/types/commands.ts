export interface Command {
  name: string;
  requirePermission: boolean;
}

export const enum CommandList {
  ping = 'ping',
  register = 'register',
}

export const commands: Record<CommandList, Command> = {
  ping: {
    name: 'ping',
    requirePermission: false,
  },
  register: {
    name: 'register',
    requirePermission: false,
  },
};
