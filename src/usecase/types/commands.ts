export interface Command {
  name: string;
  requirePermission: boolean;
}

export const enum CommandList {
  ping = 'ping',
  rate = 'rate',
  register = 'register',
  link = 'link',
}

export const commands: Record<CommandList, Command> = {
  ping: {
    name: 'ping',
    requirePermission: false,
  },
  rate: {
    name: 'rate',
    requirePermission: false,
  },
  register: {
    name: 'register',
    requirePermission: true,
  },
  link: {
    name: 'link',
    requirePermission: true,
  },
};
