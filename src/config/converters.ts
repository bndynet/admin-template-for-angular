import { MessageEntity, UserEntity } from 'src/app/app-types';

export function convertUser(userFromBackend: any): UserEntity {
  // TODO:
  return userFromBackend;
}

export function convertMessages(newMessages: any[], exsitingMessages: MessageEntity[]): MessageEntity[] {
  // TODO:
  const messages: MessageEntity[] = exsitingMessages || [];
  newMessages.forEach(item => {
    messages.splice(0, 0, item);
  });
  return messages.slice(0, 50);
}