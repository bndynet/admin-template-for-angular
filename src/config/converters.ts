import { MessageEntity, UserInfo } from 'src/app/app-types';

// TODO: You need to implement all below methods for supporting your business.

export function convertUser(userFromBackend: any): UserInfo {
  return userFromBackend;
}

export function convertMessages(
  newMessages: any[],
  exsitingMessages: MessageEntity[]
): MessageEntity[] {
  const messages: MessageEntity[] = exsitingMessages || [];
  newMessages.forEach((item) => {
    messages.splice(0, 0, item);
  });
  return messages.slice(0, 50);
}
